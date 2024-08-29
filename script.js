const DEFAULT_GRID_COUNT = 16;
const INITIAL_COLOR = '#3a3a3a';
const WHITE = '#fff';

const grid = document.querySelector('.grid');
const setGridBtn = document.querySelector('.config__grid');
const eraseBtn = document.querySelector('.config__erase');

let isActive = false;
let activeColor = INITIAL_COLOR;

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
  if (this.classList.contains('selected')) {
    activeColor = INITIAL_COLOR;
  } else {
    activeColor = WHITE;
  }
  this.classList.toggle('selected');
});

function handleSketch(e) {
  if (e.type === 'mouseover' && !isActive) return;
  e.target.style.backgroundColor = activeColor;
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
