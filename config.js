const config = {
    // API Endpoints
    apis: {
        basketball: {
            name: 'Balldontlie.io',
            baseUrl: 'https://api.balldontlie.io/v1',
            searchEndpoint: '/players',
            description: 'Free NBA player data API',
            requiresKey: false
        },
        baseball: {
            name: 'Balldontlie.io',
            baseUrl: 'https://api.balldontlie.io/mlb/v1',
            searchEndpoint: '/players',
            description: 'Free MLB player data API',
            requiresKey: false
        },
        football: {
            name: 'Balldontlie.io',
            baseUrl: 'https://api.balldontlie.io/nlf/v1',
            searchEndpoint: '/players',
            description: 'Free NFL player data API',
            requiresKey: false
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
} 