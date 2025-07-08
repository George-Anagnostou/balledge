class SportsChainGame {
    constructor() {
        this.chain = [];
        this.currentPlayer = null;
        this.lastLetter = null;
        this.playerCache = new Map(); // Cache API results
        this.strikes = 0;
        this.maxStrikes = 3;
        this.selectedSport = 'nba'; // Default sport
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
        this.strikesDisplay = document.getElementById('strikesDisplay');
        
        // Set up sport selection
        this.setupSportSelection();
        
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
    
    setupSportSelection() {
        const radioButtons = document.querySelectorAll('input[name="sport"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedSport = e.target.value;
                this.updateHint();
                console.log(`Sport changed to: ${this.selectedSport.toUpperCase()}`);
            });
        });
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
        
        this.showMessage(`Searching for ${this.selectedSport.toUpperCase()} player...`, 'info');
        this.submitBtn.disabled = true;
        
        try {
            // Check cache first
            const cacheKey = `${this.selectedSport}-${input.toLowerCase()}`;
            if (this.playerCache.has(cacheKey)) {
                const player = this.playerCache.get(cacheKey);
                this.processPlayer(player);
                return;
            }
            
            // Search the selected sport's API
            const player = await this.searchPlayer(input, this.selectedSport);
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
            
        } catch (error) {
            console.error('Error searching for player:', error);
            this.strike('Error searching for player. Please try again.');
        } finally {
            this.submitBtn.disabled = false;
        }
    }
    
    async searchPlayer(query, sport) {
        try {
            // Split the input into first and last name
            const [firstName, ...rest] = query.trim().split(/\s+/);
            const lastName = rest.join(' ');
            if (!firstName || !lastName) return null;
            
            // Call the appropriate API endpoint based on sport
            const url = `http://localhost:3001/api/players?sport=${encodeURIComponent(sport)}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                console.error(`${sport.toUpperCase()} API request failed:`, response.status);
                return null;
            }
            
            const data = await response.json();
            if (data.data && data.data.length > 0) {
                const player = data.data[0]; // Get first match
                return {
                    name: `${player.first_name} ${player.last_name}`,
                    team: player.team ? player.team.full_name : 'Unknown Team',
                    position: player.position || 'Unknown Position',
                    sport: this.getSportDisplayName(sport),
                    image: this.getPlayerImage(player.first_name, player.last_name, sport)
                };
            }
        } catch (error) {
            console.error(`${sport.toUpperCase()} API error:`, error);
        }
        return null;
    }
    
    getSportDisplayName(sport) {
        const sportNames = {
            'nba': 'Basketball (NBA)',
            'mlb': 'Baseball (MLB)',
            'nfl': 'Football (NFL)'
        };
        return sportNames[sport] || sport.toUpperCase();
    }
    
    getPlayerImage(firstName, lastName, sport) {
        // For now, we'll use placeholder images
        const colors = {
            nba: '667eea',
            mlb: '764ba2',
            nfl: 'f093fb'
        };
        return `https://via.placeholder.com/200x200/${colors[sport]}/ffffff?text=${firstName}+${lastName}`;
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
    
    displayPlayer(player) {
        this.playerName.textContent = player.name;
        this.playerTeam.textContent = player.team;
        this.playerPosition.textContent = `${player.position} - ${player.sport}`;
        if (player.image) {
            this.playerImage.src = player.image;
            this.placeholder.style.display = 'none';
        } else {
            this.playerImage.style.display = 'none';
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
        const sportName = this.getSportDisplayName(this.selectedSport);
        this.hint.textContent = `Searching ${sportName} players from balldontlie.io`;
        
        if (this.chain.length > 0) {
            const lastPlayer = this.chain[this.chain.length - 1];
            const lastLetter = this.getLastName(lastPlayer.name).charAt(0).toUpperCase();
            this.hint.textContent += `. Next player's first name must start with "${lastLetter}".`;
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