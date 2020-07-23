/**
 * Component that represents the Key section of the UI.
 *
 * @param {object} creation object for ID and classes
 * @returns {HTMLElement} component to be rendered;
 */
const SettingsArea = ({id, classes}) => {
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
const SettingsPanel = (prop) => {
  const component = document.createElement('div');
  const textField = document.createElement('textarea');

  textField.rows = 1;
  textField.cols = 20;
  textField.addEventListener('keydown', updateState(prop));
  component.id = prop;
  component.className = 'settings-panel';
  component.appendChild(textField);
  return component;
}

const updateState = (prop) => (event) => {
  console.log({prop, event})
}

/**
 * Function that appends the settings menu to the DOM
 */
const addSynthSettings = () => {
  const state = KEYBOARD_STATE;
  const props = state.getValues();
  const settings = SettingsArea({
    id: 'settings',
    classes: ['primaryVariant']
  });

  props.forEach( prop => settings.appendChild(SettingsPanel(prop)) );
  render(settings, 'main');
}