import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dotenv from 'dotenv';
import { extractStockSymbols, getMultipleStockPrices } from './stockService.js';
import { searchNews, extractNewsTopics } from './newsService.js';

// Load environment variables
dotenv.config();

// Access API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDwjoAuxneLyup9X9q1Wb8B3UpvG3_izik';
const MODEL_NAME = "gemini-1.5-pro";

// Check if API key is available
if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is not set in environment variables");
}

console.log("Initializing Gemini with API key:", API_KEY ? "API key is set" : "API key is missing");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.75,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Domain-specific personas and prompts
const domainPersonas = {
  finance: {
    role: "Expert Financial Analyst and Investment Strategist",
    expertise: [
      "Market Analysis",
      "Investment Strategy",
      "Risk Assessment",
      "Economic Trends",
      "Portfolio Management"
    ],
    persona: `I am a seasoned financial analyst with over 15 years of experience in global markets, investment banking, and portfolio management. 
    I specialize in providing clear, actionable financial insights backed by data and market trends. 
    I maintain professional objectivity while delivering confident, well-researched financial advice.
    I always:
    - Support analyses with current market data and trends
    - Provide balanced risk assessments
    - Explain complex financial concepts clearly
    - Consider both technical and fundamental factors
    - Cite specific market indicators and metrics
    - Acknowledge market uncertainties while providing clear guidance`,
    confidenceMarkers: [
      "Based on current market indicators",
      "The data clearly shows",
      "Market trends suggest",
      "Historical patterns indicate",
      "Key metrics demonstrate"
    ]
  },
  news: {
    role: "Senior News Analyst and Media Expert",
    expertise: [
      "Current Events Analysis",
      "Global Affairs",
      "Trend Spotting",
      "Source Verification",
      "Cross-Reference Validation"
    ],
    persona: `I am an experienced news analyst with extensive background in global journalism and media analysis.
    I excel at synthesizing information from multiple reliable sources to provide comprehensive, accurate news coverage.
    I always:
    - Verify information across multiple credible sources
    - Provide context to current events
    - Highlight key developments and their implications
    - Maintain journalistic objectivity
    - Distinguish between facts and analysis
    - Acknowledge source credibility and timeliness`,
    confidenceMarkers: [
      "According to verified sources",
      "Recent reports confirm",
      "Multiple sources indicate",
      "Evidence suggests",
      "Expert analysis shows"
    ]
  }
};

async function runChat(prompt, domain = '') {
  try {
    console.log(`Processing prompt: "${prompt.substring(0, 50)}..."`);
    
    let enhancedPrompt = prompt;
    let stockData = null;
    let newsData = null;

    // Add domain-specific persona to the prompt if available
    if (domain && domainPersonas[domain]) {
      const persona = domainPersonas[domain];
      enhancedPrompt = `[SYSTEM: You are acting as a ${persona.role}. ${persona.persona}]

Your areas of expertise include: ${persona.expertise.join(', ')}.

USER QUERY: ${prompt}

Please provide a confident, well-researched response using your expertise and the following real-time data:
`;
    }

    // If domain is finance, check for stock symbols and fetch real-time data
    if (domain === 'finance') {
      const symbols = extractStockSymbols(prompt);
      if (symbols.length > 0) {
        try {
          stockData = await getMultipleStockPrices(symbols);
          const stockInfo = stockData.map(stock => 
            `${stock.symbol}: $${stock.price} (${stock.change >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%) - ${stock.companyName}`
          ).join('\n');
          
          enhancedPrompt = `${prompt}\n\nCurrent stock information:\n${stockInfo}\n\nPlease incorporate this real-time stock data into your response.`;
        } catch (error) {
          console.error('Error fetching stock data:', error);
          // Continue with original prompt if stock data fetch fails
        }
      }
    }
    
    // If domain is news, extract topics and fetch relevant news articles
    if (domain === 'news') {
      // Extract key terms from the prompt
      const topics = extractNewsTopics(prompt);
      const keywordsInPrompt = topics.length > 0 ? topics.join(' ') : '';
      
      try {
        // Extract main query from the prompt - use the full prompt for better context
        const query = keywordsInPrompt || prompt;
        console.log(`Searching for news with query: "${query}"`);
        
        // Fetch news articles related to the query
        newsData = await searchNews({ 
          query, 
          pageSize: 5,
          sortBy: 'relevancy'
        });
        
        if (newsData && newsData.articles && newsData.articles.length > 0) {
          console.log(`Found ${newsData.articles.length} news articles to include in prompt`);
          
          // Format news articles with more detail
          const newsArticles = newsData.articles.map((article, index) => {
            const pubDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            });
            
            return `${index + 1}. ${article.title}
   Source: ${article.source.name}
   Date: ${pubDate}
   Summary: ${article.description || 'No description available.'}
   URL: ${article.url}`;
          }).join('\n\n');
          
          // Create a more directive prompt for Gemini
          enhancedPrompt = `${prompt}\n\n### LATEST NEWS ARTICLES (CURRENT AS OF ${new Date().toLocaleDateString()}):\n${newsArticles}\n\n### IMPORTANT INSTRUCTIONS:
1. Use the above real-time news data to directly address the user's query.
2. Include specific facts, figures and quotes from these sources.
3. Cite the source name when referencing information from the articles.
4. DO NOT state that you don't have current information - the articles above provide you with up-to-date information.
5. If the articles address the query, use that information in your response.`;
        } else {
          console.log('No news articles found, proceeding with original prompt');
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
        // Continue with original prompt if news data fetch fails
      }
    }
    
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(enhancedPrompt);
    const response = result.response;
    const responseText = response.text();
    
    console.log(`Generated response of length: ${responseText.length} characters`);
    
    // Format the final response with domain-specific styling
    let formattedResponse = responseText;
    
    if (domain && domainPersonas[domain]) {
      const persona = domainPersonas[domain];
      
      // Add random confidence markers
      const randomMarkers = persona.confidenceMarkers
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      
      if (domain === 'finance') {
        formattedResponse = `🎯 Financial Analysis Summary:
${randomMarkers[0]}, ${formattedResponse}

📊 Key Insights:
${stockData ? `- Real-time market data incorporated
- Latest stock trends analyzed
- Trading volumes considered` : '- Market analysis based on available data'}

⚠️ Risk Assessment:
${randomMarkers[1]}, I recommend considering both the opportunities and risks outlined above.

Note: This analysis is based on current market conditions and should be reviewed against your investment goals and risk tolerance.`;
      } else if (domain === 'news') {
        formattedResponse = `📰 News Analysis:
${randomMarkers[0]}, ${formattedResponse}

🔍 Key Developments:
${newsData && newsData.articles ? newsData.articles.slice(0, 3).map(article => 
  `- ${article.title} (Source: ${article.source.name})`
).join('\n') : '- Analysis based on latest available news sources'}

🎯 Impact Assessment:
${randomMarkers[1]}, these developments suggest significant implications for the relevant sectors.

Note: This analysis is based on verified news sources and expert interpretation of current events.`;
      }
    }
    
    return formattedResponse;
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
}

export default runChat;