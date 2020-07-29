// sharp/ flat notes aka black keys in an 8ve
const isSharp = (octavePlace) =>
  octavePlace === 1 || octavePlace === 3 || octavePlace === 6 || octavePlace === 8 || octavePlace === 10;

// https://pages.mtu.edu/~suits/NoteFreqCalcs.html
// the magic number is (roughly) the twelfth root of two, 2^{1/12}
const noteFrequency = (f_0, n) => f_0 * Math.pow(1.059463094359,n);

const addKeyboard = () => {

}