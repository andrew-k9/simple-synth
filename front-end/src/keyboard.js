// sharp/ flat notes aka black keys in an 8ve
const isSharp = (octavePlace) =>
  octavePlace === 1 || octavePlace === 3 || octavePlace === 6 || octavePlace === 8 || octavePlace === 10;

// https://pages.mtu.edu/~suits/NoteFreqCalcs.html
// the magic number is (roughly) the twelfth root of two, 2^{1/12}
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
  const context = new AudioContext(); // putting this in playNote created a memory issue!
  component.id = id;
  component.classList.add(...classes);
  component.addEventListener('click', playNote(context, frequency));
  return component;
}

/**
 * Function that appends a keyboard to the DOM
 */
const addKeyboard = () => {
  const {A, octaves} = KEYBOARD_STATE;
  const keyboard = Keyboard({
    id: 'keyboard',
    classes: ['primary', 'main-stack'],
  });

  // adds keyboard keys for the number of octaves
  for(let i = 0; i < 12 * octaves + 1; ++i){
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
 * BUG: when increasing the number of 8ves from n->(n+m) the extra m 8ve
 * keys do _not_ work! Possibly something with the `currentTime` being the same
 * as the `baseLatency` but who can never be to sure?
 *
 * @params {AudioContext} context - the audio context of the key
 * @params {number} frequency - the audio context of the key
 * @returns {function} anon function that interprets an audio context promise;
 */
const playNote = (context, frequency) => function(event) {
  context.resume()
    .then(() => {

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const {gainValue, stopTime} = KEYBOARD_STATE;

      oscillator.connect(gain);
      oscillator.frequency.value = frequency;
      gain.connect(context.destination);
      gain.gain.value = gainValue;
      oscillator.start(0);
      setTimeout( () => oscillator.stop(), stopTime);
    })
    .catch( err => console.log({err, context, frequency, event}));
}