const DEFAULT_GRID_COUNT = 16;
const INITIAL_COLOR = '#3a3a3a';
const WHITE = '#fff';

const grid = document.querySelector('.grid');
const setGridBtn = document.querySelector('.config__grid');
const eraseBtn = document.querySelector('.config__erase');
const rainbowBtn = document.querySelector('.config__rainbow');

let isActive = false;
let mode = 'default';

window.addEventListener('mousedown', function () {
  isActive = true;
});
window.addEventListener('mouseup', function () {
  isActive = false;
});
window.addEventListener('load', () => createGrid());

setGridBtn.addEventListener('click', function () {
  const gridCount = +prompt('How many grid', DEFAULT_GRID_COUNT);
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
    mode = 'default';
  } else {
    mode = 'erase';
  }
  this.classList.toggle('selected');
});

rainbowBtn.addEventListener('click', function () {
  eraseBtn.classList.remove('selected');
  if (this.classList.contains('selected--rainbow')) {
    mode = 'default';
  } else {
    mode = 'rainbow';
  }
  this.classList.toggle('selected--rainbow');
});

function handleSketch(e) {
  if (e.type === 'mouseover' && !isActive) return;
  switch (mode) {
    case 'default':
      e.target.style.backgroundColor = INITIAL_COLOR;
      break;
    case 'erase':
      e.target.style.backgroundColor = WHITE;
      break;
    case 'rainbow':
      e.target.style.backgroundColor = createRandomColor();
  }
}

function createGrid(gridCount = DEFAULT_GRID_COUNT) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.height = `${grid.clientHeight / gridCount}px`;
  cell.style.width = `${grid.clientWidth / gridCount}px`;
  for (let i = 0; i < gridCount * gridCount; i++) {
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
