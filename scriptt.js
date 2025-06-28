const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

let startTime = 0;
let elapsed = 0;
let timer = null;
let running = false;

function formatTime(ms) {
  const cs = Math.floor((ms % 1000) / 10);
  const s = Math.floor((ms / 1000) % 60);
  const m = Math.floor((ms / 60000) % 60);
  const h = Math.floor(ms / 3600000);
  return (
    h.toString().padStart(2, '0') + ':' +
    m.toString().padStart(2, '0') + ':' +
    s.toString().padStart(2, '0') + '.' +
    cs.toString().padStart(2, '0')
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsed);
}

function setButtonStates() {
  startBtn.disabled = running;
  pauseBtn.disabled = !running;
  resetBtn.disabled = elapsed === 0 && !running;
}

function start() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsed;
  clearInterval(timer);
  timer = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay();
  }, 10);
  setButtonStates();
}

function pause() {
  if (!running) return;
  running = false;
  clearInterval(timer);
  setButtonStates();
}

function reset() {
  running = false;
  clearInterval(timer);
  elapsed = 0;
  updateDisplay();
  setButtonStates();
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

// Keyboard shortcuts: Space = start/pause, R = reset
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.code === 'Space') {
    e.preventDefault();
    running ? pause() : start();
  }
  if (e.key.toLowerCase() === 'r') {
    e.preventDefault();
    reset();
  }
});

// Focus effect for display
display.addEventListener('click', () => display.focus());

updateDisplay();
setButtonStates();
