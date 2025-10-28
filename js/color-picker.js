// Hair Color Picker JavaScript
// Interactive color and style visualization tool

// Color and style data (meets array of objects requirement)
const styleData = [
    {
        id: 1,
        folder: "Boho_french_curl",
        name: "Boho French Curl",
        description: "A beautiful boho-inspired style perfect for protective styling with loose, flowing curls that add volume and movement.",
        colors: ["Black", "Blonde", "Red", "Blue"],
        duration: "4-6 hours",
        price: "$150-200"
    },
    {
        id: 2,
        folder: "Jumbo_Black_Knotless_Braids",
        name: "Jumbo Knotless Braids",
        description: "Large, chunky knotless box braids that make a bold statement while providing excellent hair protection. Perfect for clients who want a dramatic, voluminous look.",
        colors: ["Black", "Blonde", "Red", "Blue"],
        duration: "5-7 hours",
        price: "$180-250"
    }
];

// Color display names (meets associative array requirement)
const colorNames = {
    "Black": "Natural Black",
    "Blonde": "Golden Blonde", 
    "Red": "Auburn Red",
    "Blue": "Midnight Blue"
};

// Color descriptions for enhanced user experience
const colorDescriptions = {
    "Black": "Classic and versatile, perfect for a natural look",
    "Blonde": "Bright and bold, adds warmth and dimension",
    "Red": "Rich and vibrant, makes a stunning statement",
    "Blue": "Creative and unique, perfect for artistic expression"
};

// Global variables
let currentStyle = "Boho_french_curl";
let currentColor = "Black";
let styleImage = null;
let currentColorDisplay = null;
let styleNameDisplay = null;
let isLoading = false;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeColorPicker();
});

// Initialize color picker functionality
function initializeColorPicker() {
    // Get DOM elements
    styleImage = document.getElementById('styleImage');
    currentColorDisplay = document.getElementById('currentColor');
    styleNameDisplay = document.getElementById('styleName');
    
    // Setup event listeners
    setupColorButtons();
    setupStyleButtons();
    
    // Set initial state
    updateDisplay();
    
    console.log('Color picker initialized successfully');
}

// Setup color button event listeners (meets function requirement)
function setupColorButtons() {
    const colorButtons = document.querySelectorAll('.color-option');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isLoading) return;
            
            const color = this.dataset.color;
            const displayName = this.dataset.display;
            
            if (color && color !== currentColor) {
                selectColor(color, displayName, this);
            }
        });
    });
}

// Setup style button event listeners
function setupStyleButtons() {
    const styleButtons = document.querySelectorAll('.style-option');
    
    styleButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isLoading) return;
            
            const style = this.dataset.style;
            const name = this.dataset.name;
            
            if (style && style !== currentStyle) {
                selectStyle(style, name, this);
            }
        });
    });
}

// Function to select a color (meets function requirement)
function selectColor(color, displayName, buttonElement) {
    if (isLoading) return;
    
    // Set loading state
    setLoadingState(true);
    
    // Update current color
    currentColor = color;
    
    // Update button states
    updateColorButtons(buttonElement);
    
    // Update the image and display
    updateImageSource(currentStyle, color)
        .then(() => {
            updateColorDisplay(displayName);
            setLoadingState(false);
        })
        .catch(error => {
            console.error('Error loading image:', error);
            showErrorMessage('Failed to load color option');
            setLoadingState(false);
        });
}

// Function to select a style 
function selectStyle(style, name, buttonElement) {
    if (isLoading) return;
    
    // Set loading state
    setLoadingState(true);
    
    // Update current style
    currentStyle = style;
    
    // Update button states
    updateStyleButtons(buttonElement);
    
    // Update the image and display
    updateImageSource(style, currentColor)
        .then(() => {
            updateStyleDisplay(name);
            setLoadingState(false);
        })
        .catch(error => {
            console.error('Error loading style:', error);
            showErrorMessage('Failed to load style option');
            setLoadingState(false);
        });
}

// Function to update image source with loading handling
function updateImageSource(style, color) {
    return new Promise((resolve, reject) => {
        const newImagePath = `assets/${style}/${color}.png`;
        
        // Create a new image to test loading
        const testImage = new Image();
        
        testImage.onload = function() {
            // Image loaded successfully, update the display
            styleImage.style.opacity = '0.5';
            
            setTimeout(() => {
                styleImage.src = newImagePath;
                styleImage.style.opacity = '1';
                resolve();
            }, 150);
        };
        
        testImage.onerror = function() {
            reject(new Error(`Image not found: ${newImagePath}`));
        };
        
        testImage.src = newImagePath;
    });
}

// Function to update color display text
function updateColorDisplay(displayName) {
    if (currentColorDisplay) {
        currentColorDisplay.textContent = displayName;
        
        // Add animation
        currentColorDisplay.style.transform = 'scale(1.05)';
        setTimeout(() => {
            currentColorDisplay.style.transform = 'scale(1)';
        }, 200);
    }
}

// Function to update style display text
function updateStyleDisplay(name) {
    if (styleNameDisplay) {
        styleNameDisplay.textContent = name;
    }
}

// Function to update color button states (uses DOM objects)
function updateColorButtons(activeButton) {
    const colorButtons = document.querySelectorAll('.color-option');
    
    colorButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
}

// Function to update style button states
function updateStyleButtons(activeButton) {
    const styleButtons = document.querySelectorAll('.style-option');
    
    styleButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
}

// Function to set loading state
function setLoadingState(loading) {
    isLoading = loading;
    
    const picker = document.querySelector('.picker-container');
    const buttons = document.querySelectorAll('.color-option, .style-option');
    
    if (loading) {
        picker.classList.add('loading');
        buttons.forEach(btn => btn.style.pointerEvents = 'none');
    } else {
        picker.classList.remove('loading');
        buttons.forEach(btn => btn.style.pointerEvents = 'auto');
    }
}

// Function to update the display with current selections
function updateDisplay() {
    const displayName = colorNames[currentColor] || currentColor;
    updateColorDisplay(displayName);
    
    // Find current style data
    const styleInfo = styleData.find(style => style.folder === currentStyle);
    if (styleInfo) {
        updateStyleDisplay(styleInfo.name);
    }
}

// Function to show error messages
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        background: #ff6b6b;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem;
        text-align: center;
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2000;
        font-family: 'Lato', sans-serif;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove error message after 4 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 4000);
}

// Color picker statistics object (meets home grown object requirement)
const ColorPickerStats = {
    getTotalColors: function() {
        return Object.keys(colorNames).length;
    },
    
    getTotalStyles: function() {
        return styleData.length;
    },
    
    getCurrentSelection: function() {
        return {
            style: currentStyle,
            color: currentColor,
            displayName: colorNames[currentColor]
        };
    },
    
    getStyleInfo: function(styleName) {
        return styleData.find(style => style.folder === styleName || style.name === styleName);
    },
    
    getColorDescription: function(color) {
        return colorDescriptions[color] || "Beautiful color option";
    },
    
    getAvailableColors: function(styleName) {
        const style = this.getStyleInfo(styleName);
        return style ? style.colors : [];
    }
};

// Function to get random color suggestion
function getRandomColorSuggestion() {
    const colors = Object.keys(colorNames);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return {
        color: randomColor,
        displayName: colorNames[randomColor],
        description: colorDescriptions[randomColor]
    };
}

// Function to animate color transition (enhanced user experience)
function animateColorTransition() {
    if (styleImage) {
        styleImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            styleImage.style.transform = 'scale(1)';
        }, 300);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (isLoading) return;
    
    const colors = Object.keys(colorNames);
    const currentIndex = colors.indexOf(currentColor);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % colors.length;
        const nextColor = colors[nextIndex];
        const button = document.querySelector(`[data-color="${nextColor}"]`);
        if (button) {
            button.click();
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : colors.length - 1;
        const prevColor = colors[prevIndex];
        const button = document.querySelector(`[data-color="${prevColor}"]`);
        if (button) {
            button.click();
        }
    }
});

// Export functions for potential use in other files
window.ColorPickerManager = {
    selectColor,
    selectStyle,
    getCurrentSelection: () => ColorPickerStats.getCurrentSelection(),
    getRandomSuggestion: getRandomColorSuggestion,
    ColorPickerStats
};