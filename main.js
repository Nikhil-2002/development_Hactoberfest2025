const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

// Keep a global reference of the window object
let mainWindow;
let petMovementInterval;

function createWindow() {
    // Get screen dimensions
    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 120,
        height: 120,
        frame: false,           // Remove window frame to make it look like a pet
        alwaysOnTop: true,      // Keep pet on top of other windows
        transparent: true,      // Make window transparent for custom styling
        resizable: false,       // Prevent resizing
        skipTaskbar: true,      // Don't show in taskbar
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load the HTML file
    mainWindow.loadFile('index.html');

    // Make the window draggable
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    
    // Start pet movement
    startPetMovement(screenWidth, screenHeight);

    // Open DevTools (remove this in production)
    // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On macOS, keep the app running even when all windows are closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Pet movement system
let petPosition = { x: 100, y: 100 };
let petDirection = { x: 1, y: 1 };
let petSpeed = 2;

function startPetMovement(screenWidth, screenHeight) {
    // Clear any existing movement interval
    if (petMovementInterval) {
        clearInterval(petMovementInterval);
    }
    
    // Start the movement loop
    petMovementInterval = setInterval(() => {
        movePet(screenWidth, screenHeight);
    }, 50); // Update position every 50ms for smooth movement
}

function movePet(screenWidth, screenHeight) {
    if (!mainWindow) return;
    
    // Update position
    petPosition.x += petDirection.x * petSpeed;
    petPosition.y += petDirection.y * petSpeed;
    
    // Bounce off screen edges
    if (petPosition.x <= 0 || petPosition.x >= screenWidth - 120) {
        petDirection.x *= -1;
        petPosition.x = Math.max(0, Math.min(screenWidth - 120, petPosition.x));
    }
    
    if (petPosition.y <= 0 || petPosition.y >= screenHeight - 120) {
        petDirection.y *= -1;
        petPosition.y = Math.max(0, Math.min(screenHeight - 120, petPosition.y));
    }
    
    // Set the new position
    mainWindow.setPosition(Math.round(petPosition.x), Math.round(petPosition.y));
    
    // Send direction info to renderer for animation
    mainWindow.webContents.send('pet-direction', {
        x: petDirection.x,
        y: petDirection.y
    });
    
    // Randomly change direction sometimes (like a real cat!)
    if (Math.random() < 0.005) { // 0.5% chance each frame
        changeDirection();
    }
}

function changeDirection() {
    const directions = [
        { x: 1, y: 0 },   // Right
        { x: -1, y: 0 },  // Left
        { x: 0, y: 1 },   // Down
        { x: 0, y: -1 },  // Up
        { x: 1, y: 1 },   // Diagonal
        { x: -1, y: -1 }, // Diagonal
        { x: 1, y: -1 },  // Diagonal
        { x: -1, y: 1 }   // Diagonal
    ];
    
    petDirection = directions[Math.floor(Math.random() * directions.length)];
    
    // Sometimes stop for a moment (like a cat pausing)
    if (Math.random() < 0.3) {
        petDirection = { x: 0, y: 0 };
        setTimeout(() => {
            changeDirection();
        }, Math.random() * 2000 + 500); // Stop for 0.5-2.5 seconds
    }
}
