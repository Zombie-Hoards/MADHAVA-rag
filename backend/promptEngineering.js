import { extractStockSymbols } from './stockService.js';
import { extractNewsTopics } from './newsService.js';

// Advanced prompt templates with multi-perspective analysis
const promptTemplates = {
  general: {
    prefix: "Given the following request, provide a detailed, accurate, and well-structured response:",
    suffix: "\n\nPlease ensure the response is:\n1. Accurate and fact-based\n2. Well-structured and organized\n3. Relevant to the query\n4. Actionable when applicable",
    perspectives: ["Objective Analysis", "Practical Implementation", "Future Implications"]
  },
  technical: {
    prefix: "As a technical expert, analyze and respond to the following query with precise technical details:",
    suffix: "\n\nEnsure to include:\n1. Technical specifications\n2. Best practices\n3. Potential limitations\n4. Implementation considerations",
    perspectives: ["Technical Feasibility", "Performance Impact", "Security Considerations", "Scalability Aspects"]
  },
  analysis: {
    prefix: "Conduct a comprehensive analysis of the following query:",
    suffix: "\n\nProvide:\n1. Key insights\n2. Supporting data\n3. Relevant context\n4. Actionable recommendations",
    perspectives: ["Data Analysis", "Market Impact", "Risk Assessment", "Strategic Implications"]
  },
  creative: {
    prefix: "Approach this request with innovative and creative thinking:",
    suffix: "\n\nConsider:\n1. Novel approaches\n2. Unique perspectives\n3. Creative solutions\n4. Innovation opportunities",
    perspectives: ["Innovation Potential", "User Experience", "Design Thinking", "Future Trends"]
  },
  strategic: {
    prefix: "Analyze this query from a strategic perspective:",
    suffix: "\n\nAddress:\n1. Long-term implications\n2. Strategic advantages\n3. Competitive analysis\n4. Growth opportunities",
    perspectives: ["Market Position", "Competitive Advantage", "Growth Strategy", "Risk Mitigation"]
  }
};

// Enhanced chain of thought patterns with reasoning frameworks
const chainOfThoughtPatterns = [
  {
    pattern: "Let's approach this step by step:",
    framework: "Sequential Analysis"
  },
  {
    pattern: "Let's break this down systematically:",
    framework: "Structured Decomposition"
  },
  {
    pattern: "Let's analyze this through multiple perspectives:",
    framework: "Multi-Dimensional Analysis"
  },
  {
    pattern: "Let's evaluate this using the MECE framework:",
    framework: "Mutually Exclusive, Collectively Exhaustive"
  },
  {
    pattern: "Let's apply the First Principles thinking:",
    framework: "Fundamental Analysis"
  }
];

// Expanded context markers with sentiment and complexity indicators
const contextMarkers = {
  temporal: ["current", "latest", "recent", "upcoming", "historical"],
  comparative: ["versus", "compared to", "better than", "difference between"],
  analytical: ["analyze", "evaluate", "assess", "examine"],
  actionable: ["how to", "steps to", "guide", "tutorial"],
  sentiment: ["positive", "negative", "neutral", "optimistic", "cautious"],
  complexity: ["simple", "complex", "advanced", "basic", "intermediate"],
  urgency: ["immediate", "urgent", "critical", "long-term", "strategic"],
  certainty: ["definite", "probable", "possible", "uncertain", "speculative"]
};

// Advanced prompt optimization techniques
const optimizationTechniques = {
  addSpecificity: (prompt) => {
    return prompt.replace(/\b(this|that|it|they)\b/gi, match => {
      return `[Need specific reference for "${match}"]`;
    });
  },

  addStructure: (prompt) => {
    if (!prompt.includes("Format:")) {
      return prompt + "\n\nFormat the response with appropriate headings, bullet points, and sections where applicable.";
    }
    return prompt;
  },

  addContextualCues: (prompt) => {
    const cues = [];
    for (const [type, markers] of Object.entries(contextMarkers)) {
      if (markers.some(marker => prompt.toLowerCase().includes(marker))) {
        cues.push(type);
      }
    }
    return cues.length > 0 ? `[Context: ${cues.join(", ")}]\n${prompt}` : prompt;
  },

  addSentimentAnalysis: (prompt) => {
    const sentiments = {
      positive: /\b(good|great|excellent|amazing|wonderful|positive)\b/gi,
      negative: /\b(bad|poor|terrible|awful|negative)\b/gi,
      neutral: /\b(neutral|balanced|objective|fair)\b/gi
    };

    let detectedSentiments = [];
    for (const [sentiment, pattern] of Object.entries(sentiments)) {
      if (pattern.test(prompt)) {
        detectedSentiments.push(sentiment);
      }
    }

    return detectedSentiments.length > 0 
      ? `[Sentiment: ${detectedSentiments.join(", ")}]\n${prompt}`
      : prompt;
  },

  addComplexityIndicator: (prompt) => {
    const complexity = prompt.length > 200 ? "complex" :
                      prompt.length > 100 ? "moderate" : "simple";
    return `[Complexity: ${complexity}]\n${prompt}`;
  },

  addTechnicalDepth: (prompt) => {
    const technicalTerms = /\b(api|code|function|database|algorithm|system|framework)\b/gi;
    const hasTechnicalContent = technicalTerms.test(prompt);
    return hasTechnicalContent 
      ? `[Technical Context Required]\n${prompt}\n\nPlease provide technical details and code examples where applicable.`
      : prompt;
  }
};

// Enhanced query intent detection with sub-categories
function detectQueryIntent(prompt) {
  const intents = {
    technical: {
      pattern: /how|implement|code|debug|error|function|method|api|framework/i,
      subCategories: {
        implementation: /implement|code|develop/i,
        debugging: /debug|error|fix|issue/i,
        architecture: /design|structure|pattern|system/i
      }
    },
    analysis: {
      pattern: /analyze|compare|evaluate|assess|review|explain|why|what|difference/i,
      subCategories: {
        comparison: /compare|versus|vs|difference/i,
        evaluation: /evaluate|assess|review/i,
        explanation: /explain|why|how|what/i
      }
    },
    instruction: {
      pattern: /guide|tutorial|steps|process|procedure/i,
      subCategories: {
        tutorial: /tutorial|guide|learn/i,
        procedure: /steps|process|procedure|how to/i,
        bestPractices: /best|practice|recommend/i
      }
    },
    factual: {
      pattern: /who|when|where|which|define|list/i,
      subCategories: {
        definition: /define|what is|meaning/i,
        factCheck: /verify|confirm|true|false/i,
        information: /who|when|where|which/i
      }
    }
  };

  for (const [intent, data] of Object.entries(intents)) {
    if (data.pattern.test(prompt)) {
      const subCategories = Object.entries(data.subCategories)
        .filter(([_, pattern]) => pattern.test(prompt))
        .map(([name, _]) => name);
      
      return {
        mainIntent: intent,
        subCategories: subCategories.length > 0 ? subCategories : ['general']
      };
    }
  }
  
  return {
    mainIntent: "general",
    subCategories: ['general']
  };
}

// Dynamic temperature adjustment based on query characteristics
function calculateTemperature(prompt, intent) {
  let baseTemp = 0.7;
  
  // Adjust based on intent
  const intentModifiers = {
    technical: -0.2,    // More precise for technical queries
    creative: +0.2,     // More creative for brainstorming
    analysis: -0.1,     // Slightly more focused for analysis
    factual: -0.3      // Most precise for factual queries
  };
  
  // Adjust based on complexity
  const complexityMod = prompt.length > 200 ? -0.1 : 0;
  
  // Adjust based on presence of technical terms
  const technicalMod = /\b(code|api|function|technical)\b/i.test(prompt) ? -0.1 : 0;
  
  // Calculate final temperature
  let temperature = baseTemp;
  temperature += intentModifiers[intent.mainIntent] || 0;
  temperature += complexityMod;
  temperature += technicalMod;
  
  // Ensure temperature stays within bounds
  return Math.max(0.1, Math.min(0.9, temperature));
}

// Enhanced chain of thought prompting with reasoning frameworks
function addChainOfThought(prompt, intent) {
  const pattern = chainOfThoughtPatterns[Math.floor(Math.random() * chainOfThoughtPatterns.length)];
  const framework = pattern.framework;
  
  return `[Reasoning Framework: ${framework}]\n${pattern.pattern}\n\n${prompt}`;
}

// Advanced domain-specific context enhancement
function addDomainContext(prompt, domain, intent) {
  const domainContexts = {
    finance: {
      prefix: "[Context: Financial Analysis]",
      considerations: [
        "Market conditions",
        "Economic indicators",
        "Risk factors",
        "Investment horizons",
        "Portfolio impact"
      ]
    },
    news: {
      prefix: "[Context: News Analysis]",
      considerations: [
        "Source credibility",
        "Global implications",
        "Timeline of events",
        "Stakeholder impact",
        "Future developments"
      ]
    },
    technical: {
      prefix: "[Context: Technical Analysis]",
      considerations: [
        "System architecture",
        "Performance implications",
        "Security considerations",
        "Scalability factors",
        "Maintenance aspects"
      ]
    },
    general: {
      prefix: "[Context: General Analysis]",
      considerations: [
        "Key objectives",
        "Current situation",
        "Potential impacts",
        "Implementation aspects",
        "Future considerations"
      ]
    }
  };

  try {
    // Get the appropriate context or fallback to general
    const context = domainContexts[domain] || domainContexts.general;
    
    // Ensure we have valid considerations
    if (!context || !Array.isArray(context.considerations)) {
      console.warn(`Invalid context for domain: ${domain}, falling back to general`);
      return `[Context: General Analysis]\n${prompt}`;
    }

    // Filter relevant considerations
    const relevantConsiderations = context.considerations
      .filter(c => prompt.toLowerCase().includes(c.toLowerCase()));

    // If no relevant considerations found, include the first 3 general ones
    const considerationsToUse = relevantConsiderations.length > 0 
      ? relevantConsiderations 
      : context.considerations.slice(0, 3);

    return `${context.prefix}\nKey Considerations: ${considerationsToUse.join(", ")}\n\n${prompt}`;
  } catch (error) {
    console.error('Error in addDomainContext:', error);
    // Fallback to a safe default
    return `[Context: General Analysis]\n${prompt}`;
  }
}

// Enhanced prompt engineering with better context and guidance
async function engineerPrompt(originalPrompt, domain = '') {
  try {
    // Base prompt enhancement
    let enhancedPrompt = originalPrompt;
    
    // Add domain-specific context and expectations
    const domainContext = {
      finance: `As a financial expert, provide comprehensive analysis using:
1. Market trends and historical data
2. Industry comparisons and benchmarks
3. Economic indicators and their impact
4. Risk assessment and mitigation strategies
5. Alternative scenarios and their implications

If specific data isn't available, provide:
1. General market insights for the sector
2. Comparable company analysis
3. Key factors to consider
4. Methodologies for analysis
5. Reliable sources for further research`,

      healthcare: `As a healthcare professional, provide comprehensive guidance considering:
1. Current medical best practices
2. Evidence-based recommendations
3. Patient safety considerations
4. Preventive measures
5. Latest research findings

If specific diagnosis isn't possible, provide:
1. General health guidelines
2. Warning signs to watch for
3. Preventive measures
4. When to seek professional help
5. Reliable medical resources`,

      news: `As a news analyst, provide comprehensive coverage including:
1. Multiple perspectives and viewpoints
2. Historical context and background
3. Potential implications and impacts
4. Related developments
5. Fact-checking and verification

If specific details aren't available, provide:
1. General context of the situation
2. Similar historical events
3. Key factors to monitor
4. Potential developments
5. Reliable news sources`
    };

    // Add domain-specific guidance
    if (domain && domainContext[domain]) {
      enhancedPrompt = `${enhancedPrompt}\n\n${domainContext[domain]}`;
    }

    // Add response structure guidance
    enhancedPrompt += `\n\nPlease structure your response to include:
1. Initial assessment/overview
2. Detailed analysis/explanation
3. Supporting evidence/examples
4. Practical implications/recommendations
5. Additional considerations/caveats
6. Next steps/further resources

Even if specific data or details aren't available, provide valuable insights and guidance based on general knowledge and expertise in the field.`;

    // Process metadata
    const metadata = {
      domain,
      timestamp: new Date().toISOString(),
      complexity: originalPrompt.length > 100 ? 'complex' : 'simple',
      temperature: 0.7
    };

    // Process the response with sources
    const response = await processPrompt(enhancedPrompt);
    const responseWithSources = trackSources(response, domain);

    return {
      prompt: enhancedPrompt,
      metadata,
      response: responseWithSources
    };
  } catch (error) {
    console.error('Error in prompt engineering:', error);
    throw error;
  }
}

// Enhanced prompt validation and cleaning
function validateAndCleanPrompt(prompt) {
  // Remove excessive whitespace
  let cleanedPrompt = prompt.trim().replace(/\s+/g, ' ');
  
  // Remove potentially harmful characters
  cleanedPrompt = cleanedPrompt.replace(/[`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/g, ' ');
  
  // Validate length
  if (cleanedPrompt.length < 3) {
    throw new Error("Prompt too short. Please provide more context.");
  }
  if (cleanedPrompt.length > 2000) {
    throw new Error("Prompt too long. Please reduce the length.");
  }
  
  // Check for common issues
  const issues = [];
  if (cleanedPrompt.split(' ').length < 3) {
    issues.push("Query may be too brief for accurate analysis");
  }
  if (!/[.?!]$/.test(cleanedPrompt)) {
    issues.push("Query may be incomplete");
  }
  if (/^(hi|hello|hey)$/i.test(cleanedPrompt)) {
    issues.push("Query appears to be a greeting rather than a substantive question");
  }

  return {
    cleanedPrompt,
    issues: issues.length > 0 ? issues : null
  };
}

// Enhanced contextual metadata
function addContextualMetadata(prompt) {
  const intent = detectQueryIntent(prompt);
  const complexity = prompt.length > 200 ? "complex" :
                    prompt.length > 100 ? "moderate" : "simple";
  
  // Detect language characteristics
  const languageFeatures = {
    hasQuestion: prompt.includes('?'),
    hasTechnicalTerms: /\b(api|code|function|database|algorithm)\b/i.test(prompt),
    hasNumbers: /\d+/.test(prompt),
    hasUrls: /https?:\/\/[^\s]+/.test(prompt),
    sentiment: prompt.match(/\b(positive|negative|neutral)\b/i)?.[0] || "neutral"
  };

  return {
    prompt,
    metadata: {
      timestamp: new Date().toISOString(),
      intent,
      complexity,
      languageFeatures,
      domain: prompt.toLowerCase().includes("stock") ? "finance" : 
              prompt.toLowerCase().includes("news") ? "news" : 
              languageFeatures.hasTechnicalTerms ? "technical" : "general",
      suggestedTemperature: calculateTemperature(prompt, intent)
    }
  };
}

// Format response with sources
const formatResponseWithSources = (responseData) => {
  const { response, sources } = responseData;
  
  let formattedResponse = response;
  
  // Add sources section at the end
  formattedResponse += '\n\nSources:\n';
  sources.forEach(source => {
    formattedResponse += `- [${source.name}](${source.url})\n`;
  });
  
  return formattedResponse;
};

// Add source citation tracking
const trackSources = (response, domain) => {
  const sources = {
    healthcare: [
      { url: "https://www.ncbi.nlm.nih.gov/", name: "PubMed Central" },
      { url: "https://www.mayoclinic.org/", name: "Mayo Clinic" },
      { url: "https://medlineplus.gov/", name: "MedlinePlus" },
      { url: "https://www.who.int/", name: "World Health Organization" }
    ],
    finance: [
      { url: "https://www.bloomberg.com/", name: "Bloomberg" },
      { url: "https://www.reuters.com/", name: "Reuters" },
      { url: "https://www.ft.com/", name: "Financial Times" },
      { url: "https://www.wsj.com/", name: "Wall Street Journal" }
    ],
    news: [
      { url: "https://apnews.com/", name: "Associated Press" },
      { url: "https://www.reuters.com/", name: "Reuters" },
      { url: "https://www.bbc.com/news", name: "BBC News" },
      { url: "https://www.aljazeera.com/", name: "Al Jazeera" }
    ]
  };

  // Get relevant sources for the domain
  const domainSources = sources[domain] || sources['news'];
  
  // Select 2-3 most relevant sources based on content
  const selectedSources = domainSources
    .slice(0, Math.floor(Math.random() * 2) + 2);

  return {
    response,
    sources: selectedSources
  };
};

// Add domain relevance checking function
function checkDomainRelevance(prompt, domain) {
  if (!domain) return { isRelevant: true, confidence: 1 };
  
  const domainKeywords = {
    finance: ['stock', 'market', 'investment', 'price', 'trading', 'financial', 'economy', 'shares', 'fund', 'portfolio', 'dividend', 'earnings'],
    healthcare: ['health', 'medical', 'patient', 'treatment', 'symptoms', 'disease', 'diagnosis', 'medicine', 'clinical', 'doctor', 'hospital', 'care', 'therapy', 'wellness', 'prevention'],
    news: ['news', 'current events', 'report', 'latest', 'update', 'breaking', 'coverage', 'story', 'headline', 'media', 'press']
  };

  const keywords = domainKeywords[domain] || [];
  const promptLower = prompt.toLowerCase();
  const matchedKeywords = keywords.filter(keyword => promptLower.includes(keyword));
  const confidence = matchedKeywords.length / Math.min(5, keywords.length);

  return {
    isRelevant: confidence > 0.2,
    confidence
  };
}

// Add medical specialty detection
function detectMedicalSpecialty(prompt) {
  const specialties = {
    cardiology: {
      keywords: ['heart', 'cardiac', 'cardiovascular', 'chest pain', 'blood pressure', 'arrhythmia'],
      role: 'Cardiologist',
      expertise: ['Heart Disease', 'Cardiovascular Health']
    },
    neurology: {
      keywords: ['brain', 'nervous system', 'headache', 'migraine', 'seizure', 'neurological'],
      role: 'Neurologist',
      expertise: ['Brain Health', 'Neurological Disorders']
    },
    pediatrics: {
      keywords: ['child', 'baby', 'infant', 'pediatric', 'childhood', 'growth'],
      role: 'Pediatrician',
      expertise: ['Child Health', 'Child Development']
    },
    dermatology: {
      keywords: ['skin', 'rash', 'acne', 'dermatitis', 'dermatological'],
      role: 'Dermatologist',
      expertise: ['Skin Health', 'Skin Conditions']
    }
  };

  const promptLower = prompt.toLowerCase();
  let bestMatch = {
    specialty: null,
    matchCount: 0,
    confidence: 0
  };

  for (const [specialty, data] of Object.entries(specialties)) {
    const matchedKeywords = data.keywords.filter(keyword => promptLower.includes(keyword));
    const confidence = matchedKeywords.length / data.keywords.length;
    
    if (confidence > bestMatch.confidence) {
      bestMatch = {
        specialty,
        matchCount: matchedKeywords.length,
        confidence,
        role: data.role,
        expertise: data.expertise
      };
    }
  }

  return bestMatch;
}

// Process prompt (helper function used by engineerPrompt)
async function processPrompt(prompt) {
  // This is a placeholder function since we're not actually processing the prompt here
  // In a real implementation, this would interact with the AI model
  return prompt;
}

// Export all functions in a single export statement
export {
  engineerPrompt,
  validateAndCleanPrompt,
  addContextualMetadata,
  detectQueryIntent,
  addDomainContext,
  checkDomainRelevance,
  detectMedicalSpecialty,
  formatResponseWithSources,
  trackSources
}; 