const paletteContainer = document.getElementById("palette");
const generateBtn = document.getElementById("generate-btn");

// Function to generate random hex color
function generateColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor.padStart(6, "0").toUpperCase();
}

// Function to create color boxes
function createPalette() {
    paletteContainer.innerHTML = ""; // Clear previous colors
    for (let i = 0; i < 5; i++) {
        const color = generateColor();

        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color;

        const hexValue = document.createElement("span");
        hexValue.classList.add("hex-value");
        hexValue.innerText = color;

        const copyIcon = document.createElement("i");
        copyIcon.classList.add("far", "fa-copy", "copy-btn");
        copyIcon.title = "Copy color";
        copyIcon.addEventListener("click", () => {
            navigator.clipboard.writeText(color);
            copyIcon.classList.replace("far", "fas");
            setTimeout(() => copyIcon.classList.replace("fas", "far"), 1000);
        });

        colorBox.appendChild(hexValue);
        colorBox.appendChild(copyIcon);
        paletteContainer.appendChild(colorBox);
    }
}

// Initial palette on page load
createPalette();

// Generate new palette on button click
generateBtn.addEventListener("click", createPalette);
