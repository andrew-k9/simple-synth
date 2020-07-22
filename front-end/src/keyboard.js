/**
 * Component that represents the Keyboard section of the UI.
 *
 * @param {object} creation object for ID and classes
 * @returns {HTMLElement} component to be rendered;
 */
const Keyboard = ({id, classes}) => {
  const component = document.createElement('div');
  component.id = id;
  component.classList.add(...classes);
  return component;
}

/**
 * Function that appends a keyboard to the DOM
 */
const addKeyboard = () => {
  const keyboard = Keyboard({
    id: 'keyboard',
    classes: ['primary'],
  });
  keyboard.addEventListener('click', noise);
  render(keyboard, 'main');
}

/**
 * Event Listener that makes a noise using the KEYBOARD_STATE object
 * @params {HTMLEvent} the event that invoked the function
 */
const noise = (event) => {
  let context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);
  gain.gain.value = KEYBOARD_STATE.gainValue;
  oscillator.start(0);
  setTimeout( () => oscillator.stop(), KEYBOARD_STATE.stopTime);
  context = null;
}