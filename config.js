// API Configuration for Sports Player Chain Game
// Add fallback/mock data for non-NBA sports

const config = {
    // API Endpoints
    apis: {
        basketball: {
            name: 'Balldontlie.io',
            baseUrl: 'https://www.balldontlie.io/api/v1',
            searchEndpoint: '/players',
            description: 'Free NBA player data API',
            requiresKey: false
        },
        baseball: {
            name: 'MLB Stats API',
            baseUrl: 'https://statsapi.mlb.com/api/v1',
            searchEndpoint: '/people',
            description: 'Official MLB API - free to use',
            requiresKey: false
        },
        football: {
            name: 'SportsData.io NFL',
            baseUrl: 'https://api.sportsdata.io/v3/nfl',
            searchEndpoint: '/scores/json/Players',
            description: 'NFL player data - requires API key',
            requiresKey: true
        }
    },
    
    // Fallback data for when APIs are unavailable
    fallbackPlayers: {
        'lebron james': {
            name: 'LeBron James',
            team: 'Los Angeles Lakers',
            position: 'Small Forward',
            sport: 'Basketball',
            image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=LeBron+James'
        },
        'stephen curry': {
            name: 'Stephen Curry',
            team: 'Golden State Warriors',
            position: 'Point Guard',
            sport: 'Basketball',
            image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Stephen+Curry'
        },
        'mike trout': {
            name: 'Mike Trout',
            team: 'Los Angeles Angels',
            position: 'Center Fielder',
            sport: 'Baseball',
            image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Mike+Trout'
        },
        'aaron judge': {
            name: 'Aaron Judge',
            team: 'New York Yankees',
            position: 'Right Fielder',
            sport: 'Baseball',
            image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Aaron+Judge'
        },
        'tom brady': {
            name: 'Tom Brady',
            team: 'Tampa Bay Buccaneers',
            position: 'Quarterback',
            sport: 'Football',
            image: 'https://via.placeholder.com/200x200/f093fb/ffffff?text=Tom+Brady'
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
} 