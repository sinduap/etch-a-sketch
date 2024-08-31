const DEFAULT_GRID = 16;
const DEFAULT_COLOR = '#3a3a3a';
const COLOR_WHITE = '#fff';
const DEFAULT_MODE = 'DEFAULT';
const RAINBOW_MODE = 'RAINBOW';
const ERASE_MODE = 'ERASE';

const grid = document.querySelector('.grid');
const createGridBtn = document.querySelector('.config__grid');
const eraseBtn = document.querySelector('.config__erase');
const rainbowBtn = document.querySelector('.config__rainbow');

let isActive = false;
let mode = DEFAULT_MODE;

window.addEventListener('mousedown', function () {
  isActive = true;
});
window.addEventListener('mouseup', function () {
  isActive = false;
});
window.addEventListener('load', () => createGrid());

createGridBtn.addEventListener('click', function () {
  const gridCount = +prompt('How many grid', DEFAULT_GRID);
  if (!gridCount) return;
  if (!Number.isInteger(gridCount) || gridCount < 1) {
    alert('Must be an integer');
    return;
  }
  grid.innerHTML = '';
  createGrid(gridCount);
});

eraseBtn.addEventListener('click', function () {
  rainbowBtn.classList.remove('selected--rainbow');
  if (this.classList.contains('selected')) {
    mode = DEFAULT_MODE;
  } else {
    mode = ERASE_MODE;
  }
  this.classList.toggle('selected');
});

rainbowBtn.addEventListener('click', function () {
  eraseBtn.classList.remove('selected');
  if (this.classList.contains('selected--rainbow')) {
    mode = DEFAULT_MODE;
  } else {
    mode = RAINBOW_MODE;
  }
  this.classList.toggle('selected--rainbow');
});

function handleSketch(e) {
  if (e.type === 'mouseover' && !isActive) return;
  switch (mode) {
    case DEFAULT_MODE:
      e.target.style.backgroundColor = DEFAULT_COLOR;
      break;
    case ERASE_MODE:
      e.target.style.backgroundColor = COLOR_WHITE;
      break;
    case RAINBOW_MODE:
      e.target.style.backgroundColor = createRandomColor();
      break;
  }
}

function createGrid(gridSize = DEFAULT_GRID) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.height = `${grid.clientHeight / gridSize}px`;
  cell.style.width = `${grid.clientWidth / gridSize}px`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const child = cell.cloneNode();
    child.addEventListener('mouseover', handleSketch);
    child.addEventListener('mousedown', handleSketch);
    grid.append(child);
  }
}

// Helpers
const randomBetween = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

const createRandomColor = () =>
  `rgb(${randomBetween(0, 255)},${randomBetween(0, 255)},${randomBetween(
    0,
    255
  )})`;
