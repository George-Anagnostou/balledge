class SportsChainGame {
    constructor() {
        this.chain = [];
        this.currentPlayer = null;
        this.lastLetter = null;
<<<<<<< HEAD
        
        // Mock data for now - we'll replace this with API calls later
        this.mockPlayers = {
            'lebron james': {
                name: 'LeBron James',
                team: 'Los Angeles Lakers',
                position: 'Small Forward',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=LeBron+James'
=======
        this.playerCache = new Map(); // Cache API results
        this.strikes = 0;
        this.maxStrikes = 3;
        this.fallbackPlayers = window.config ? window.config.fallbackPlayers : {
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
>>>>>>> feat/api
            },
            'tom brady': {
                name: 'Tom Brady',
                team: 'Tampa Bay Buccaneers',
                position: 'Quarterback',
<<<<<<< HEAD
                image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Tom+Brady'
            },
            'mike trout': {
                name: 'Mike Trout',
                team: 'Los Angeles Angels',
                position: 'Center Fielder',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Mike+Trout'
            },
            'stephen curry': {
                name: 'Stephen Curry',
                team: 'Golden State Warriors',
                position: 'Point Guard',
                image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Stephen+Curry'
            },
            'aaron rodgers': {
                name: 'Aaron Rodgers',
                team: 'New York Jets',
                position: 'Quarterback',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Aaron+Rodgers'
            },
            'sydney crosby': {
                name: 'Sidney Crosby',
                team: 'Pittsburgh Penguins',
                position: 'Center',
                image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Sidney+Crosby'
            },
            'yankees': {
                name: 'Aaron Judge',
                team: 'New York Yankees',
                position: 'Right Fielder',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Aaron+Judge'
            },
            'emma raducanu': {
                name: 'Emma Raducanu',
                team: 'Great Britain',
                position: 'Tennis Player',
                image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Emma+Raducanu'
            },
            'usain bolt': {
                name: 'Usain Bolt',
                team: 'Jamaica',
                position: 'Sprinter',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Usain+Bolt'
            },
            'tiger woods': {
                name: 'Tiger Woods',
                team: 'United States',
                position: 'Golfer',
                image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Tiger+Woods'
            },
            'serena williams': {
                name: 'Serena Williams',
                team: 'United States',
                position: 'Tennis Player',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Serena+Williams'
            },
            'soccer': {
                name: 'Lionel Messi',
                team: 'Inter Miami',
                position: 'Forward',
                image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Lionel+Messi'
            },
            'michael jordan': {
                name: 'Michael Jordan',
                team: 'Chicago Bulls (Retired)',
                position: 'Shooting Guard',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Michael+Jordan'
            },
            'neymar': {
                name: 'Neymar Jr.',
                team: 'Al Hilal',
                position: 'Forward',
                image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=Neymar+Jr.'
            },
            'roger federer': {
                name: 'Roger Federer',
                team: 'Switzerland',
                position: 'Tennis Player',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=Roger+Federer'
            }
        };
        
=======
                sport: 'Football',
                image: 'https://via.placeholder.com/200x200/f093fb/ffffff?text=Tom+Brady'
            }
        };
>>>>>>> feat/api
        this.initializeGame();
    }
    
    initializeGame() {
        this.playerInput = document.getElementById('playerInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.hint = document.getElementById('hint');
        this.message = document.getElementById('message');
        this.playerDisplay = document.getElementById('playerDisplay');
        this.playerImage = document.getElementById('playerImage');
        this.placeholder = document.getElementById('placeholder');
        this.playerName = document.getElementById('playerName');
        this.playerTeam = document.getElementById('playerTeam');
        this.playerPosition = document.getElementById('playerPosition');
        this.chainLength = document.getElementById('chainLength');
        this.lastLetterDisplay = document.getElementById('lastLetter');
        this.chainList = document.getElementById('chainList');
<<<<<<< HEAD
        
=======
        // Add strikes display
        this.strikesDisplay = document.getElementById('strikesDisplay');
        if (!this.strikesDisplay) {
            this.strikesDisplay = document.createElement('div');
            this.strikesDisplay.id = 'strikesDisplay';
            this.strikesDisplay.className = 'strikes';
            this.chainLength.parentNode.parentNode.appendChild(this.strikesDisplay);
        }
>>>>>>> feat/api
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.playerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit();
            }
        });
        
        this.updateDisplay();
<<<<<<< HEAD
    }
    
    handleSubmit() {
        const input = this.playerInput.value.trim().toLowerCase();
=======
        this.updateHint();
        this.updateStrikes();
    }
    
    async handleSubmit() {
        const input = this.playerInput.value.trim();
>>>>>>> feat/api
        
        if (!input) {
            this.showMessage('Please enter a player name!', 'error');
            return;
        }
        
        // Check if this is the first player
        if (this.chain.length === 0) {
<<<<<<< HEAD
            this.addPlayer(input);
=======
            await this.addPlayer(input);
>>>>>>> feat/api
            return;
        }
        
        // Check if the first letter matches the last letter of the previous player's last name
        const previousPlayer = this.chain[this.chain.length - 1];
        const previousLastName = this.getLastName(previousPlayer.name);
        const requiredLetter = previousLastName.charAt(0).toLowerCase();
        const inputFirstName = this.getFirstName(input);
        const inputFirstLetter = inputFirstName.charAt(0).toLowerCase();
        
        if (inputFirstLetter !== requiredLetter) {
<<<<<<< HEAD
            this.showMessage(`The player's first name must start with "${requiredLetter.toUpperCase()}"!`, 'error');
            return;
        }
        
        this.addPlayer(input);
    }
    
    addPlayer(input) {
        // Find player in our mock data
        const playerKey = Object.keys(this.mockPlayers).find(key => 
            key.includes(input) || input.includes(key)
        );
        
        if (!playerKey) {
            this.showMessage('Player not found! Try a different name.', 'error');
            return;
        }
        
        const player = this.mockPlayers[playerKey];
        
        // Check if player is already in the chain
        if (this.chain.some(p => p.name === player.name)) {
            this.showMessage('This player is already in the chain!', 'error');
            return;
        }
        
=======
            this.strike(`The player's first name must start with "${requiredLetter.toUpperCase()}"!`);
            return;
        }
        
        await this.addPlayer(input);
    }
    
    async addPlayer(input) {
        // Require both first and last name
        const [firstName, ...rest] = input.trim().split(/\s+/);
        const lastName = rest.join(' ');
        if (!firstName || !lastName) {
            this.strike('Please enter both a first and last name.');
            return;
        }
        this.showMessage('Searching for player...', 'info');
        this.submitBtn.disabled = true;
        try {
            // Check cache first
            const cacheKey = input.toLowerCase();
            if (this.playerCache.has(cacheKey)) {
                const player = this.playerCache.get(cacheKey);
                this.processPlayer(player);
                return;
            }
            // Try NBA API (balldontlie)
            let player = await this.searchBasketballPlayer(input);
            if (!player) {
                // Fallback to mock data for MLB/NFL
                player = this.searchFallbackPlayer(input);
            }
            if (!player) {
                this.strike('Player not found! Try a different name or check spelling.');
                return;
            }
            // Check if player is already in the chain
            if (this.chain.some(p => p.name.toLowerCase() === player.name.toLowerCase())) {
                this.strike('This player is already in the chain!');
                return;
            }
            // Cache the result
            this.playerCache.set(cacheKey, player);
            this.processPlayer(player);
            // Don't reset strikes on valid guess - they persist across the chain
        } catch (error) {
            console.error('Error searching for player:', error);
            this.strike('Error searching for player. Please try again.');
        } finally {
            this.submitBtn.disabled = false;
        }
    }
    
    processPlayer(player) {
>>>>>>> feat/api
        this.chain.push(player);
        this.currentPlayer = player;
        this.lastLetter = this.getLastName(player.name).charAt(0).toLowerCase();
        
        this.displayPlayer(player);
        this.updateDisplay();
        this.showMessage(`Great! ${player.name} added to the chain!`, 'success');
        
        // Clear input and update hint
        this.playerInput.value = '';
        this.updateHint();
    }
    
<<<<<<< HEAD
=======
    async searchBasketballPlayer(query) {
        try {
            // Split the input into first and last name
            const [firstName, ...rest] = query.trim().split(/\s+/);
            const lastName = rest.join(' ');
            if (!firstName || !lastName) return null;
            // Use the backend proxy with first_name and last_name
            const url = `http://localhost:3001/api/players?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Basketball API request failed');
            const data = await response.json();
            if (data.data && data.data.length > 0) {
                const player = data.data[0]; // Get first match
                return {
                    name: `${player.first_name} ${player.last_name}`,
                    team: player.team ? player.team.name : 'Unknown Team',
                    position: player.position || 'Unknown Position',
                    sport: 'Basketball (NBA)',
                    image: this.getPlayerImage(player.first_name, player.last_name, 'basketball')
                };
            }
        } catch (error) {
            console.error('Basketball API error:', error);
        }
        return null;
    }
    
    searchFallbackPlayer(query) {
        const queryLower = query.toLowerCase();
        const playerKey = Object.keys(this.fallbackPlayers).find(key => 
            key.includes(queryLower) || queryLower.includes(key)
        );
        return playerKey ? this.fallbackPlayers[playerKey] : null;
    }
    
    getPlayerImage(firstName, lastName, sport) {
        // For now, we'll use placeholder images
        const colors = {
            basketball: '667eea',
            baseball: '764ba2',
            football: 'f093fb'
        };
        return `https://via.placeholder.com/200x200/${colors[sport]}/ffffff?text=${firstName}+${lastName}`;
    }
    
>>>>>>> feat/api
    displayPlayer(player) {
        this.playerDisplay.style.display = 'block';
        this.playerName.textContent = player.name;
        this.playerTeam.textContent = player.team;
<<<<<<< HEAD
        this.playerPosition.textContent = player.position;
        
=======
        this.playerPosition.textContent = `${player.position} (${player.sport})`;
>>>>>>> feat/api
        if (player.image) {
            this.playerImage.src = player.image;
            this.playerImage.style.display = 'block';
            this.placeholder.style.display = 'none';
        } else {
            this.playerImage.style.display = 'none';
            this.placeholder.style.display = 'block';
        }
    }
    
    updateDisplay() {
        this.chainLength.textContent = this.chain.length;
        this.lastLetterDisplay.textContent = this.lastLetter ? this.lastLetter.toUpperCase() : '-';
<<<<<<< HEAD
        
=======
>>>>>>> feat/api
        // Update chain history
        this.chainList.innerHTML = '';
        this.chain.forEach((player, index) => {
            const chainItem = document.createElement('div');
            chainItem.className = 'chain-item';
<<<<<<< HEAD
            chainItem.textContent = `${index + 1}. ${player.name}`;
=======
            chainItem.textContent = `${index + 1}. ${player.name} (${player.sport})`;
>>>>>>> feat/api
            this.chainList.appendChild(chainItem);
        });
    }
    
    updateHint() {
<<<<<<< HEAD
        if (this.chain.length === 0) {
            this.hint.textContent = 'Start with any player name!';
        } else {
            const lastPlayer = this.chain[this.chain.length - 1];
            const lastLetter = this.getLastName(lastPlayer.name).charAt(0).toUpperCase();
            this.hint.textContent = `Next player's first name must start with "${lastLetter}"`;
=======
        this.hint.textContent = 'NBA players are live (real-time). MLB/NFL are mock data.';
        if (this.chain.length > 0) {
            const lastPlayer = this.chain[this.chain.length - 1];
            const lastLetter = this.getLastName(lastPlayer.name).charAt(0).toUpperCase();
            this.hint.textContent += ` Next player\'s first name must start with "${lastLetter}".`;
>>>>>>> feat/api
        }
    }
    
    getFirstName(fullName) {
        return fullName.split(' ')[0];
    }
    
    getLastName(fullName) {
        const parts = fullName.split(' ');
        return parts[parts.length - 1];
    }
    
    showMessage(text, type = 'info') {
        this.message.textContent = text;
        this.message.className = `message ${type}`;
        this.message.style.display = 'block';
<<<<<<< HEAD
        
=======
>>>>>>> feat/api
        setTimeout(() => {
            this.message.style.display = 'none';
        }, 3000);
    }
<<<<<<< HEAD
}

// Initialize the game when the page loads
=======
    
    strike(msg) {
        this.strikes++;
        this.updateStrikes();
        if (this.strikes >= this.maxStrikes) {
            this.showMessage('Game Over! You reached 3 strikes. The game will restart.', 'error');
            setTimeout(() => this.resetGame(), 2000);
        } else {
            this.showMessage(`${msg} Strike ${this.strikes} of 3.`, 'error');
        }
    }
    
    resetGame() {
        this.chain = [];
        this.currentPlayer = null;
        this.lastLetter = null;
        this.playerCache = new Map();
        this.strikes = 0;
        this.updateDisplay();
        this.updateHint();
        this.updateStrikes();
        this.playerDisplay.style.display = 'none';
        this.showMessage('Game reset! Start a new chain.', 'info');
    }
    
    updateStrikes() {
        if (this.strikesDisplay) {
            this.strikesDisplay.innerHTML = `Strikes: ${'❌'.repeat(this.strikes)}${'⭕'.repeat(this.maxStrikes - this.strikes)}`;
        }
    }
}

>>>>>>> feat/api
document.addEventListener('DOMContentLoaded', () => {
    new SportsChainGame();
}); 