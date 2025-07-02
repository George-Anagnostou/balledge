class SportsChainGame {
    constructor() {
        this.chain = [];
        this.currentPlayer = null;
        this.lastLetter = null;
        
        // Mock data for now - we'll replace this with API calls later
        this.mockPlayers = {
            'lebron james': {
                name: 'LeBron James',
                team: 'Los Angeles Lakers',
                position: 'Small Forward',
                image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=LeBron+James'
            },
            'tom brady': {
                name: 'Tom Brady',
                team: 'Tampa Bay Buccaneers',
                position: 'Quarterback',
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
        
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.playerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit();
            }
        });
        
        this.updateDisplay();
    }
    
    handleSubmit() {
        const input = this.playerInput.value.trim().toLowerCase();
        
        if (!input) {
            this.showMessage('Please enter a player name!', 'error');
            return;
        }
        
        // Check if this is the first player
        if (this.chain.length === 0) {
            this.addPlayer(input);
            return;
        }
        
        // Check if the first letter matches the last letter of the previous player's last name
        const previousPlayer = this.chain[this.chain.length - 1];
        const previousLastName = this.getLastName(previousPlayer.name);
        const requiredLetter = previousLastName.charAt(0).toLowerCase();
        const inputFirstName = this.getFirstName(input);
        const inputFirstLetter = inputFirstName.charAt(0).toLowerCase();
        
        if (inputFirstLetter !== requiredLetter) {
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
        this.playerDisplay.style.display = 'block';
        this.playerName.textContent = player.name;
        this.playerTeam.textContent = player.team;
        this.playerPosition.textContent = player.position;
        
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
            chainItem.textContent = `${index + 1}. ${player.name}`;
            this.chainList.appendChild(chainItem);
        });
    }
    
    updateHint() {
        if (this.chain.length === 0) {
            this.hint.textContent = 'Start with any player name!';
        } else {
            const lastPlayer = this.chain[this.chain.length - 1];
            const lastLetter = this.getLastName(lastPlayer.name).charAt(0).toUpperCase();
            this.hint.textContent = `Next player's first name must start with "${lastLetter}"`;
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
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SportsChainGame();
}); 