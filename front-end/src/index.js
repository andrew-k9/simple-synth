const noise = (event) => {
  let context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);
  gain.gain.value = 0.05;
  oscillator.start(0);
  setTimeout( () => oscillator.stop(), 256);
  context = null;
}

const addKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.id = 'keyboard';
  keyboard.className = 'primary';

  keyboard.addEventListener('click', noise);
  document.body.appendChild(keyboard);
}

document.addEventListener('DOMContentLoaded', () => {
  addKeyboard();
});