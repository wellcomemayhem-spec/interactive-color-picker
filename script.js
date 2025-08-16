const colorWheel = document.getElementById('color-wheel');
const saturationSlider = document.getElementById('saturation');
const brightnessSlider = document.getElementById('brightness');
const addToPaletteButton = document.getElementById('add-to-palette');
const paletteDiv = document.getElementById('palette');

let selectedColor = '#000000';

colorWheel.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const radius = colorWheel.offsetWidth / 2;
    const centerX = radius;
    const centerY = radius;
    const angle = Math.atan2(y - centerY, x - centerX);
    const color = getColorFromAngle(angle);
    selectedColor = color;
    colorWheel.style.backgroundColor = selectedColor;
});

function getColorFromAngle(angle) {
    const hue = ((angle * (180 / Math.PI)) + 360) % 360;
    return `hsl(${hue}, ${saturationSlider.value}%, ${brightnessSlider.value}%)`;
}

saturationSlider.addEventListener('input', () => {
    // Update the color wheel background when saturation changes
    colorWheel.style.backgroundColor = getColorFromAngle(Math.atan2(1, 1));
    // Also update selectedColor to reflect the change
    selectedColor = colorWheel.style.backgroundColor;
});

brightnessSlider.addEventListener('input', () => {
    // Update the color wheel background when brightness changes
    colorWheel.style.backgroundColor = getColorFromAngle(Math.atan2(1, 1));
    // Also update selectedColor to reflect the change
    selectedColor = colorWheel.style.backgroundColor;
});

addToPaletteButton.addEventListener('click', () => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('palette-color');
    colorDiv.style.backgroundColor = selectedColor;
    paletteDiv.appendChild(colorDiv);
    savePalette();
});

function savePalette() {
    const palette = [];
    const colors = paletteDiv.children;
    for (let color of colors) {
        palette.push(color.style.backgroundColor);
    }
    localStorage.setItem('palette', JSON.stringify(palette));
}