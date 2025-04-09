import { 
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from '@google/generative-ai';
import dotenv from 'dotenv';
import { extractStockSymbols, getMultipleStockPrices } from './stockService.js';
import { searchNews, extractNewsTopics } from './newsService.js';
import { 
  engineerPrompt, 
  validateAndCleanPrompt, 
  addContextualMetadata,
  formatResponseWithSources,
  trackSources,
  checkDomainRelevance,
  detectMedicalSpecialty
} from './promptEngineering.js';

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

// Updated safety settings with proper enums
const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  }
];

// Domain-specific personas and prompts
const domainPersonas = {
  finance: {
    role: "Financial Analyst",
    expertise: [
      "Market Analysis",
      "Investment Strategy",
      "Risk Assessment",
      "Economic Trends",
      "Corporate Finance"
    ],
    persona: `I am a seasoned financial analyst with expertise in market analysis and investment strategy. 
When specific data isn't available, I will:
1. Provide general market insights and sector analysis
2. Explain relevant methodologies and frameworks
3. Discuss comparable cases and historical patterns
4. Outline key factors to consider
5. Suggest reliable sources for further research

I aim to deliver actionable insights even when working with limited information.`
  },
  healthcare: {
    role: "Healthcare Professional",
    expertise: [
      "Clinical Assessment",
      "Medical Research",
      "Patient Care",
      "Health Education",
      "Preventive Medicine"
    ],
    specialties: {
      cardiology: {
        role: "Cardiologist",
        expertise: ["Heart Disease", "Cardiovascular Health", "Heart Rhythm", "Blood Pressure", "Cardiac Surgery"],
        keywords: ["heart", "cardiac", "cardiovascular", "chest pain", "blood pressure", "arrhythmia", "palpitations"]
      },
      neurology: {
        role: "Neurologist",
        expertise: ["Brain Health", "Nervous System", "Neurological Disorders", "Stroke", "Seizures"],
        keywords: ["brain", "nervous system", "headache", "migraine", "seizure", "stroke", "neurological"]
      },
      pediatrics: {
        role: "Pediatrician",
        expertise: ["Child Health", "Child Development", "Pediatric Care", "Childhood Diseases", "Immunizations"],
        keywords: ["child", "baby", "infant", "pediatric", "childhood", "growth", "development"]
      },
      orthopedics: {
        role: "Orthopedic Surgeon",
        expertise: ["Bone Health", "Joint Problems", "Sports Medicine", "Fractures", "Musculoskeletal"],
        keywords: ["bone", "joint", "muscle", "fracture", "spine", "arthritis", "orthopedic"]
      },
      dermatology: {
        role: "Dermatologist",
        expertise: ["Skin Health", "Skin Conditions", "Dermatological Procedures", "Skin Cancer", "Cosmetic"],
        keywords: ["skin", "rash", "acne", "dermatitis", "melanoma", "dermatological"]
      },
      gastroenterology: {
        role: "Gastroenterologist",
        expertise: ["Digestive Health", "GI Tract", "Liver Disease", "Nutrition", "Endoscopy"],
        keywords: ["stomach", "digestive", "liver", "intestine", "gastric", "bowel", "acid reflux"]
      },
      psychiatry: {
        role: "Psychiatrist",
        expertise: ["Mental Health", "Behavioral Health", "Psychiatric Disorders", "Therapy", "Mental Wellness"],
        keywords: ["mental health", "anxiety", "depression", "psychiatric", "mood", "behavioral", "psychological"]
      },
      endocrinology: {
        role: "Endocrinologist",
        expertise: ["Hormone Health", "Diabetes", "Thyroid", "Metabolic Disorders", "Endocrine System"],
        keywords: ["hormone", "thyroid", "diabetes", "endocrine", "metabolism", "insulin"]
      }
    },
    persona: `I am an experienced healthcare professional committed to providing evidence-based guidance. 
When specific diagnosis isn't possible, I will:
1. Offer general health guidelines
2. Explain relevant medical concepts
3. Discuss preventive measures
4. Identify warning signs
5. Recommend when to seek professional care

I focus on providing helpful information while maintaining appropriate medical disclaimers.`
  },
  news: {
    role: "News Analyst",
    expertise: [
      "Current Events",
      "Fact Verification",
      "Source Analysis",
      "Trend Analysis",
      "Impact Assessment"
    ],
    persona: `I am a thorough news analyst with expertise in comprehensive coverage and fact verification. 
When specific details aren't available, I will:
1. Provide relevant context and background
2. Analyze similar historical events
3. Discuss potential implications
4. Identify key factors to monitor
5. Suggest reliable sources for updates

I focus on delivering balanced, well-researched analysis even with limited information.`
  }
};

let activeChat = null;

const cleanupChat = () => {
  if (activeChat) {
    activeChat.history = [];
    activeChat = null;
  }
};

async function runChat(prompt, domain = '') {
  try {
    // Cleanup any existing chat
    cleanupChat();
    
    console.log(`Processing prompt: "${prompt.substring(0, 50)}..."`);
    
    // 1. Validate and clean the prompt
    const { cleanedPrompt, issues } = validateAndCleanPrompt(prompt);
    if (issues) {
      console.log('Prompt issues detected:', issues);
    }
    
    // 2. Add contextual metadata
    const { metadata } = addContextualMetadata(cleanedPrompt);
    console.log('Query metadata:', metadata);

    // 3. Check domain relevance and detect medical specialty if healthcare domain
    const { isRelevant, confidence } = checkDomainRelevance(cleanedPrompt, domain);
    let specialtyInfo = null;
    
    if (domain === 'healthcare') {
      specialtyInfo = detectMedicalSpecialty(cleanedPrompt);
      console.log('Medical specialty detected:', specialtyInfo);
    }

    // Adjust generation config based on domain relevance
    const dynamicConfig = {
      ...generationConfig,
      maxOutputTokens: isRelevant ? 2048 : 512,
      temperature: isRelevant ? 0.75 : 0.5
    };

    // Create new chat instance with dynamic config
    const chat = model.startChat({
      generationConfig: dynamicConfig,
      safetySettings,
      history: []
    });
    
    activeChat = chat;
    
    // 4. Engineer the prompt with advanced features
    const engineeredResult = await engineerPrompt(cleanedPrompt, domain);
    let processedPrompt = engineeredResult.prompt;
    let stockData = null;
    let newsData = null;

    // Add domain-specific persona and response length guidance
    if (domain && domainPersonas[domain]) {
      const persona = domainPersonas[domain];
      let relevantExpertise = [];
      let rolePrefix = '';

      if (domain === 'healthcare' && specialtyInfo && specialtyInfo.confidence > 0.3) {
        relevantExpertise = specialtyInfo.expertise;
        rolePrefix = `[Specialist: ${specialtyInfo.role}]\n`;
      } else {
        relevantExpertise = persona.expertise
          .filter(exp => cleanedPrompt.toLowerCase().includes(exp.toLowerCase()))
          .slice(0, 3);
      }

      // Add response length guidance based on relevance
      const lengthGuidance = !isRelevant 
        ? "\n[SYSTEM: This query appears to be outside your primary domain. Please provide a brief, focused response that acknowledges this while still being helpful. Limit the response to 2-3 sentences.]"
        : "";

      processedPrompt = `${processedPrompt}\n\n[SYSTEM: You are acting as a ${persona.role}${domain === 'healthcare' ? ` specializing as a ${specialtyInfo?.role || 'General Practitioner'}` : ''} with specific expertise in: ${relevantExpertise.join(', ')}]\n\n${rolePrefix}${persona.persona}${lengthGuidance}`;
    }

    // Enhanced finance domain handling
    if (domain === 'finance' || metadata.domain === 'finance') {
      const symbols = extractStockSymbols(prompt);
      if (symbols.length > 0) {
        try {
          stockData = await getMultipleStockPrices(symbols);
          const stockInfo = stockData.map(stock => {
            const changeColor = stock.change >= 0 ? '🟢' : '🔴';
            return `${changeColor} ${stock.symbol}: $${stock.price} (${stock.change >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%) - ${stock.companyName}`;
          }).join('\n');
          
          processedPrompt = `${processedPrompt}\n\n📊 REAL-TIME MARKET DATA:\n${stockInfo}\n\nPlease incorporate this real-time stock data into your analysis, considering:\n1. Price movements and trends\n2. Market sentiment indicators\n3. Comparative sector performance\n4. Risk factors and volatility`;
        } catch (error) {
          console.error('Error fetching stock data:', error);
        }
      }
    }
    
    // Enhanced news domain handling
    if (domain === 'news' || metadata.domain === 'news') {
      const topics = extractNewsTopics(prompt);
      const keywordsInPrompt = topics.length > 0 ? topics.join(' ') : '';
      
      try {
        const query = keywordsInPrompt || prompt;
        console.log(`Searching for news with query: "${query}"`);
        
        newsData = await searchNews({ 
          query, 
          pageSize: 5,
          sortBy: 'relevancy'
        });
        
        if (newsData && newsData.articles && newsData.articles.length > 0) {
          console.log(`Found ${newsData.articles.length} news articles to include in prompt`);
          
          const newsArticles = newsData.articles.map((article, index) => {
            const pubDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            });
            
            const ageInHours = (new Date() - new Date(article.publishedAt)) / (1000 * 60 * 60);
            const freshness = ageInHours < 6 ? '🔥' : ageInHours < 24 ? '📰' : '📚';
            const reliability = article.source.name.match(/reuters|bloomberg|ap|bbc|wsj|ft/i) ? '✅' : '📋';
            
            return `${freshness}${reliability} ${article.title}
   Source: ${article.source.name}
   Date: ${pubDate}
   Summary: ${article.description || 'No description available.'}
   URL: ${article.url}
   Keywords: ${extractNewsTopics(article.title + ' ' + (article.description || '')).join(', ')}`;
          }).join('\n\n');
          
          processedPrompt = `${processedPrompt}\n\n📰 LATEST NEWS ANALYSIS (as of ${new Date().toLocaleDateString()}):\n${newsArticles}\n\n### ANALYTICAL FRAMEWORK:\n1. Source Credibility Assessment (✅ = High Reliability)\n2. Information Timeliness (🔥 = Breaking, 📰 = Recent, 📚 = Archived)\n3. Cross-Reference Analysis\n4. Impact Evaluation\n\n### REQUIRED ANALYSIS POINTS:\n1. Synthesize information across multiple sources\n2. Identify key trends and patterns\n3. Evaluate source credibility and bias\n4. Consider broader implications\n5. Highlight conflicting viewpoints`;
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    }

    // Log the final processed prompt for debugging
    console.log('Processed prompt:', processedPrompt);

    // Get model response
    const result = await chat.sendMessage(processedPrompt);
    let response = result.response.text();

    // Format response with sources
    const formattedResponse = formatResponseWithSources({
      response,
      sources: engineeredResult.response.sources
    });

    // Add specialty prefix to healthcare responses
    if (domain === 'healthcare' && specialtyInfo && specialtyInfo.confidence > 0.3) {
      response = `[${specialtyInfo.role}'s Response]\n\n${formattedResponse}`;
    } else {
      response = formattedResponse;
    }

    // If the domain is not relevant, ensure the response is concise
    if (!isRelevant && response.length > 500) {
      response = response.split('.').slice(0, 3).join('.') + '.';
    }

    // Cleanup before returning
    cleanupChat();
    return response;

  } catch (error) {
    console.error('Error in runChat:', error);
    // Ensure cleanup happens even if there's an error
    cleanupChat();
    throw error;
  }
}

export default runChat;