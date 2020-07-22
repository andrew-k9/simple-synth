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

const addKey = () => {
  const key = document.createElement('div');
  key.id = 'keyboard';
  key.addEventListener('click', noise);
  document.body.appendChild(key);
}

document.addEventListener('DOMContentLoaded', () => {
  addKey();
});