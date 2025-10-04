// Pet state and behavior
class WalkingPet {
    constructor() {
        this.petElement = document.getElementById('pet');
        this.messageElement = document.getElementById('petMessage');
        this.currentDirection = { x: 1, y: 0 };
        this.isMoving = true;
        
        this.messages = [
            "Hello! I'm walking! 🐾",
            "I'm so happy to see you! 😊",
            "Pet me! 🥺",
            "I love you! ❤️",
            "I'm exploring! 🎾",
            "I'm getting tired... 😴",
            "You're the best! ⭐",
            "Meow! 🐱",
            "I'm a happy cat! 😸",
            "Follow me! 👣"
        ];
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.petElement.addEventListener('click', () => this.onPetClick());
        
        // Listen for direction updates from main process
        const { ipcRenderer } = require('electron');
        ipcRenderer.on('pet-direction', (event, direction) => {
            this.updateDirection(direction);
        });
        
        // Start walking animation
        this.startWalking();
        
        // Show welcome message
        this.showMessage("Hello! I'm your walking pet! 🐾");
    }
    
    updateDirection(direction) {
        this.currentDirection = direction;
        
        // Update pet appearance based on movement
        if (direction.x === 0 && direction.y === 0) {
            // Stopped
            this.petElement.classList.remove('walking');
            this.petElement.classList.add('stopped');
            this.isMoving = false;
        } else {
            // Moving
            this.petElement.classList.remove('stopped');
            this.petElement.classList.add('walking');
            this.isMoving = true;
            
            // Flip pet based on direction
            if (direction.x < 0) {
                this.petElement.classList.add('flipped');
            } else {
                this.petElement.classList.remove('flipped');
            }
        }
    }
    
    startWalking() {
        this.petElement.classList.add('walking');
        this.isMoving = true;
    }
    
    stopWalking() {
        this.petElement.classList.remove('walking');
        this.petElement.classList.add('stopped');
        this.isMoving = false;
    }
    
    onPetClick() {
        // Add bounce animation
        this.petElement.classList.add('clicked');
        setTimeout(() => {
            this.petElement.classList.remove('clicked');
        }, 600);
        
        // Show random message
        const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
        this.showMessage(randomMessage);
        
        // Sometimes change pet emoji briefly
        if (Math.random() < 0.3) {
            const originalText = this.petElement.textContent;
            const happyEmojis = ['😸', '😍', '🥰', '😊'];
            this.petElement.textContent = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];
            setTimeout(() => {
                this.petElement.textContent = originalText;
            }, 1000);
        }
    }
    
    showMessage(text) {
        this.messageElement.textContent = text;
        this.messageElement.classList.add('show');
        
        setTimeout(() => {
            this.messageElement.classList.remove('show');
        }, 2000);
    }
}

// Initialize the pet when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WalkingPet();
});
