class SportsChainGame {
    constructor() {
        this.chain = [];
        this.currentPlayer = null;
        this.lastLetter = null;
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
            },
            'tom brady': {
                name: 'Tom Brady',
                team: 'Tampa Bay Buccaneers',
                position: 'Quarterback',
                sport: 'Football',
                image: 'https://via.placeholder.com/200x200/f093fb/ffffff?text=Tom+Brady'
            }
        };
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
        // Add strikes display
        this.strikesDisplay = document.getElementById('strikesDisplay');
        if (!this.strikesDisplay) {
            this.strikesDisplay = document.createElement('div');
            this.strikesDisplay.id = 'strikesDisplay';
            this.strikesDisplay.className = 'strikes';
            this.chainLength.parentNode.parentNode.appendChild(this.strikesDisplay);
        }
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.playerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit();
            }
        });
        
        this.updateDisplay();
        this.updateHint();
        this.updateStrikes();
    }
    
    async handleSubmit() {
        const input = this.playerInput.value.trim();
        
        if (!input) {
            this.showMessage('Please enter a player name!', 'error');
            return;
        }
        
        // Check if this is the first player
        if (this.chain.length === 0) {
            await this.addPlayer(input);
            return;
        }
        
        // Check if the first letter matches the last letter of the previous player's last name
        const previousPlayer = this.chain[this.chain.length - 1];
        const previousLastName = this.getLastName(previousPlayer.name);
        const requiredLetter = previousLastName.charAt(0).toLowerCase();
        const inputFirstName = this.getFirstName(input);
        const inputFirstLetter = inputFirstName.charAt(0).toLowerCase();
        
        if (inputFirstLetter !== requiredLetter) {
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
            // Reset strikes on valid guess
            this.strikes = 0;
            this.updateStrikes();
        } catch (error) {
            console.error('Error searching for player:', error);
            this.strike('Error searching for player. Please try again.');
        } finally {
            this.submitBtn.disabled = false;
        }
    }
    
    processPlayer(player) {
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
    
    displayPlayer(player) {
        this.playerDisplay.style.display = 'block';
        this.playerName.textContent = player.name;
        this.playerTeam.textContent = player.team;
        this.playerPosition.textContent = `${player.position} (${player.sport})`;
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
        // Update chain history
        this.chainList.innerHTML = '';
        this.chain.forEach((player, index) => {
            const chainItem = document.createElement('div');
            chainItem.className = 'chain-item';
            chainItem.textContent = `${index + 1}. ${player.name} (${player.sport})`;
            this.chainList.appendChild(chainItem);
        });
    }
    
    updateHint() {
        this.hint.textContent = 'NBA players are live (real-time). MLB/NFL are mock data.';
        if (this.chain.length > 0) {
            const lastPlayer = this.chain[this.chain.length - 1];
            const lastLetter = this.getLastName(lastPlayer.name).charAt(0).toUpperCase();
            this.hint.textContent += ` Next player\'s first name must start with "${lastLetter}".`;
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
        setTimeout(() => {
            this.message.style.display = 'none';
        }, 3000);
    }
    
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

document.addEventListener('DOMContentLoaded', () => {
    new SportsChainGame();
}); 