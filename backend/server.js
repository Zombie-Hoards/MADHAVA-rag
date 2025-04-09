import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import runChat from './gemini.js';
import { createServer } from 'http';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Health check endpoint with detailed status
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Gemini API endpoint
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt, domain } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`Processing request for domain: ${domain || 'general'}`);

    // Add domain context to the prompt if provided
    const enhancedPrompt = domain 
      ? `[Context: You are an AI assistant specialized in ${domain}]\n\n${prompt}`
      : prompt;

    const startTime = Date.now();
    const response = await runChat(enhancedPrompt, domain);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`Request processed in ${responseTime}ms`);

    res.json({
      response,
      metrics: {
        responseTime: `${responseTime}ms`,
        tokenCount: Math.round(response.length / 4)
      }
    });
  } catch (error) {
    console.error('Error processing Gemini request:', error);
    res.status(500).json({ error: 'Failed to process request', message: error.message });
  }
});

// Function to check if a port is available
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = createServer()
      .listen(port, () => {
        server.close();
        resolve(true);
      })
      .on('error', () => {
        resolve(false);
      });
  });
};

// Function to find an available port
const findAvailablePort = async (startPort, maxAttempts = 10) => {
  for (let port = startPort; port < startPort + maxAttempts; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
    console.log(`Port ${port} is in use, trying next port...`);
  }
  throw new Error(`Could not find an available port after ${maxAttempts} attempts`);
};

// Function to start the server
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(port);
    
    const server = app.listen(availablePort, () => {
      console.log('\n=== Server Status ===');
      console.log(`✅ Server is running`);
      console.log(`🌐 Port: ${availablePort}`);
      console.log(`📡 API: http://localhost:${availablePort}/api/gemini`);
      console.log(`🔗 Health: http://localhost:${availablePort}/health`);
      console.log('==================\n');
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
      if (error.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
          server.close();
          startServer();
        }, 1000);
      }
    });

    // Handle graceful shutdown
    const shutdown = () => {
      console.log('\nReceived shutdown signal');
      server.close(() => {
        console.log('Server closed gracefully');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
console.log('Starting server...');
startServer(); 