// sharp/ flat notes aka black keys in an octave
const isSharp = (octavePlace) =>
  octavePlace === 1 || octavePlace === 3 || octavePlace === 6 || octavePlace === 8 || octavePlace === 10;

// https://pages.mtu.edu/~suits/NoteFreqCalcs.html
const noteFrequency = (f_0, n) => f_0 * Math.pow(1.059463094359,n);

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
 * Component that represents the Key section of the UI.
 *
 * @param {object} creation object for ID and classes
 * @returns {HTMLElement} component to be rendered;
 */
const Key = ({id, classes, frequency}) => {
  const component = document.createElement('div');
  component.id = id;
  component.classList.add(...classes);
  component.addEventListener('click', playNote(frequency));
  return component;
}

/**
 * Function that appends a keyboard to the DOM
 */
const addKeyboard = () => {
  const {A, octaves} = KEYBOARD_STATE;
  const keyboard = Keyboard({
    id: 'keyboard',
    classes: ['primary'],
  });

  // adds keyboard keys for the number of octaves
  for(let i = 0; i < 12 * octaves - 1; ++i){
    const frequency = noteFrequency(A, i + 4); // starts at C!
    const noteColor = (isSharp(i % 12) ? 'black' : 'white') + 'Keys';
    const key = Key({
      id: `key-${i}`,
      classes: [noteColor, 'pianoKey'],
      frequency
    });
    keyboard.appendChild(key);
  }
  render(keyboard, 'main');
}

/**
 * Event Listener that makes a noise using the KEYBOARD_STATE object
 * @params {HTMLEvent} the event that invoked the function
 * @returns {function} anon function that actually creates the audio context;
 */
const playNote = (frequency) => function(event) {
  let context = new AudioContext();
  let oscillator = context.createOscillator();
  let gain = context.createGain();

  console.log({frequency})

  oscillator.connect(gain);
  oscillator.frequency.value = frequency;
  gain.connect(context.destination);
  gain.gain.value = KEYBOARD_STATE.gainValue;
  oscillator.start(0);
  setTimeout( () => oscillator.stop(), KEYBOARD_STATE.stopTime);
  context = null;
  oscillator = null;
  gain = null;
}