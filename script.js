const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = '#3a3a3a';
const COLOR_WHITE = '#ffffff';
const DEFAULT_MODE = 'DEFAULT';
const RAINBOW_MODE = 'RAINBOW';
const ERASE_MODE = 'ERASE';

const grid = document.querySelector('.grid');
const createGridBtn = document.querySelector('.config__grid');
const colorPicker = document.querySelector('.config__color-picker');
const penBtn = document.querySelector('.config__pen');
const rainbowBtn = document.querySelector('.config__rainbow');
const eraseBtn = document.querySelector('.config__erase');
const clearBtn = document.querySelector('.config__clear');

let isActive = false;
let mode = DEFAULT_MODE;
let activeColor = DEFAULT_COLOR;
let currentGridSize = DEFAULT_GRID_SIZE;
let tempColor;

window.addEventListener('mousedown', function () {
  isActive = true;
});

window.addEventListener('mouseup', function () {
  isActive = false;
});

window.addEventListener('load', function () {
  createGrid();
  colorPicker.setAttribute('value', DEFAULT_COLOR);
});

createGridBtn.addEventListener('click', function () {
  const gridCount = +prompt('Enter grid cells', DEFAULT_GRID_SIZE);
  if (!gridCount) return;
  currentGridSize = gridCount;
  if (!Number.isInteger(gridCount) || gridCount < 1) {
    alert('Must be a positive integer');
    return;
  }
  grid.innerHTML = '';
  createGrid(gridCount);
});

colorPicker.addEventListener('input', function () {
  activeColor = this.value;
});

penBtn.addEventListener('click', function () {
  eraseBtn.classList.remove('selected');
  rainbowBtn.classList.remove('selected--rainbow');
  this.classList.add('selected');
  mode = DEFAULT_MODE;
});

rainbowBtn.addEventListener('click', function () {
  eraseBtn.classList.remove('selected');
  penBtn.classList.remove('selected');
  if (this.classList.contains('selected--rainbow')) {
    mode = DEFAULT_MODE;
    penBtn.classList.add('selected');
  } else {
    mode = RAINBOW_MODE;
  }
  this.classList.toggle('selected--rainbow');
});

eraseBtn.addEventListener('click', function () {
  rainbowBtn.classList.remove('selected--rainbow');
  penBtn.classList.remove('selected');
  if (this.classList.contains('selected')) {
    mode = DEFAULT_MODE;
    penBtn.classList.add('selected');
  } else {
    mode = ERASE_MODE;
  }
  this.classList.toggle('selected');
});

clearBtn.addEventListener('click', () => {
  const answer = confirm('Are you sure to delete this sketch?');
  if (!answer) return;
  grid.innerHTML = '';
  createGrid(currentGridSize);
});

function handleSketch(event) {
  const { target, type } = event;
  if (type === 'mouseover' && !isActive) {
    tempColor = target.style.backgroundColor;
    switch (mode) {
      case DEFAULT_MODE:
      case ERASE_MODE:
        target.style.backgroundColor = opaquedHex(activeColor);
        break;
      case RAINBOW_MODE:
        target.style.backgroundColor = createRandomColor(0.5);
        break;
    }
    return;
  }

  if (type === 'mouseleave' && !isActive) {
    target.style.backgroundColor = tempColor;
    return;
  }

  if (type === 'mouseup') {
    if (mode === ERASE_MODE) {
      tempColor = COLOR_WHITE;
      return;
    }
    tempColor = activeColor;
    return;
  }

  switch (mode) {
    case DEFAULT_MODE:
      target.style.backgroundColor = activeColor;
      break;
    case ERASE_MODE:
      target.style.backgroundColor = COLOR_WHITE;
      break;
    case RAINBOW_MODE:
      target.style.backgroundColor = createRandomColor();
      break;
  }
}

function createGrid(gridSize = DEFAULT_GRID_SIZE) {
  const cell = document.createElement('div');
  cell.style.backgroundColor = COLOR_WHITE;
  cell.classList.add('cell');
  cell.style.height = `${grid.clientHeight / gridSize}px`;
  cell.style.width = `${grid.clientWidth / gridSize}px`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const child = cell.cloneNode();
    child.addEventListener('mouseover', handleSketch);
    child.addEventListener('mouseleave', handleSketch);
    child.addEventListener('mousedown', handleSketch);
    child.addEventListener('mouseup', handleSketch);
    grid.append(child);
  }
}

// Helpers
const randomBetween = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

const createRandomColor = alpha =>
  alpha
    ? `rgba(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(
        0,
        255
      )}, ${alpha})`
    : `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(
        0,
        255
      )})`;

const opaquedHex = (hex, alpha = 0.5) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let color = hex.substring(1).split('');
    if (color.length == 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    color = '0x' + color.join('');
    const rgb = [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(
      ','
    );
    return `rgba(${rgb},${alpha})`;
  }
  throw new Error('Bad Hex');
};
