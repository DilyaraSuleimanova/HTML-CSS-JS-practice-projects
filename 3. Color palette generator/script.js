const generateButton = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateButton.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function(e) {
    
    if(e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err) => console.log(err));

    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err) => console.log(err));
    }
});


function showCopySuccess(copyButton) {
    copyButton.classList.remove("fa-copy");
    copyButton.classList.add("fa-solid","fa-check");

    copyButton.style.color = "#38e132";

    setTimeout(() => {
        copyButton.classList.remove("fa-solid","fa-check");
        copyButton.classList.add("fa-copy");
        copyButton.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generrateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generrateRandomColor() {
    const letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;

    });
}

generatePalette();