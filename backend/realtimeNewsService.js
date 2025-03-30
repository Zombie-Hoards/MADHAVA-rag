import EventEmitter from 'events';
import axios from 'axios';

class RealtimeNewsService extends EventEmitter {
    constructor() {
        super();
        this.newsCache = new Map();
        this.subscribedTopics = new Set();
        this.updateInterval = null;
        this.maxCacheSize = 100;
    }

    initialize() {
        // Don't start updates until we have subscribers
        console.log('Realtime news service initialized');
    }

    subscribe(topics) {
        if (Array.isArray(topics)) {
            topics.forEach(topic => this.subscribedTopics.add(topic));
        } else {
            this.subscribedTopics.add(topics);
        }
        
        // Start updates if not already started
        if (!this.updateInterval) {
            this.startUpdates();
        }
        
        return Array.from(this.subscribedTopics);
    }

    unsubscribe(topics) {
        if (Array.isArray(topics)) {
            topics.forEach(topic => this.subscribedTopics.delete(topic));
        } else {
            this.subscribedTopics.delete(topics);
        }
        
        // If no more topics, stop updates
        if (this.subscribedTopics.size === 0) {
            this.stopUpdates();
        }
        
        return Array.from(this.subscribedTopics);
    }

    startUpdates() {
        // Clear any existing interval first
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        // Fetch immediately for the first time
        this.updateNews();
        
        // Then set up periodic updates
        this.updateInterval = setInterval(() => {
            this.updateNews();
        }, 60000); // Every minute
    }

    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    async updateNews() {
        if (this.subscribedTopics.size === 0) {
            return; // No subscriptions, nothing to do
        }

        try {
            // Use a public news API that doesn't require authentication
            // For demo purposes, we'll use a sample of static news
            const demoNews = this.getDemoNews();
            
            demoNews.forEach(article => {
                if (!this.newsCache.has(article.id)) {
                    const formattedArticle = this.formatArticle(article);
                    this.emit('news', formattedArticle);
                    this.newsCache.set(article.id, formattedArticle);
                    
                    // Maintain cache size
                    if (this.newsCache.size > this.maxCacheSize) {
                        const oldestKey = Array.from(this.newsCache.keys())[0];
                        this.newsCache.delete(oldestKey);
                    }
                }
            });
        } catch (error) {
            console.error('Error updating news:', error.message);
        }
    }

    getDemoNews() {
        // Static demo news for development
        return [
            {
                id: `news-${Date.now()}-1`,
                title: 'Breaking: Major Technology Announcement',
                description: 'A leading tech company has unveiled their latest innovation.',
                source: { name: 'Tech News' },
                author: 'Tech Reporter',
                url: 'https://example.com/tech-news',
                publishedAt: new Date().toISOString()
            },
            {
                id: `news-${Date.now()}-2`,
                title: 'Economic Markets Report',
                description: 'Global markets show positive trends after recent economic data.',
                source: { name: 'Financial News' },
                author: 'Finance Expert',
                url: 'https://example.com/finance-news',
                publishedAt: new Date().toISOString()
            },
            {
                id: `news-${Date.now()}-3`,
                title: 'Weather Alert: Storm System Developing',
                description: 'Meteorologists tracking development of storm system in the Atlantic.',
                source: { name: 'Weather Channel' },
                author: 'Meteorologist',
                url: 'https://example.com/weather-news',
                publishedAt: new Date().toISOString()
            }
        ];
    }

    formatArticle(article) {
        return {
            id: article.id || article.url || `article-${Date.now()}`,
            type: 'realtime',
            source: {
                id: article.source?.id || null,
                name: article.source?.name || 'Realtime News'
            },
            author: article.author || 'Unknown',
            title: article.title,
            description: article.description,
            url: article.url || 'https://example.com',
            urlToImage: article.urlToImage || null,
            publishedAt: article.publishedAt,
            content: article.content || article.description
        };
    }

    close() {
        this.stopUpdates();
        this.newsCache.clear();
        this.subscribedTopics.clear();
    }
}

const realtimeNewsService = new RealtimeNewsService();
export default realtimeNewsService; 