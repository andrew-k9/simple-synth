const keyboardDiv = () => document.getElementById('keyboard');
const mainDiv = () => document.getElementById('main');
/**
 * Function that appends an html element identified by the given targetId
 *
 * @param {HTMLElement} component The component created off of some data
 * @param {string} targetId The id of the element in which the component will be rendered
 */
const render = (component, targetId) => {
  const target = document.getElementById(targetId);
  target.appendChild(component);
}

// TODO: make the functions that generate components into a generic function
// sets up the DOM on load with default values
document.addEventListener('DOMContentLoaded', () => {
  KEYBOARD_STATE.init();
  addSynthSettings();
  addKeyboard();
  addSideMenu();
  modal();
});