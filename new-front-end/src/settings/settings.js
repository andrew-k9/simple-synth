const userFriendlyName = {
  gain: 'Gain',
  stop_time: 'Note Duration',
  a_frequency: 'A Frequency',
  category_id: 'Category',
  name: 'Setting Name',
  id: 'ID (un-editable)'
}

const SettingsOption = (prop) => {
  const component = document.createElement('div');
  let textField = document.createElement('textarea');
  if(prop === 'category_id'){
    textField = Selector(CATEGORY_STATE.array, prop);
  }else{
    textField.rows = 1;
    textField.cols = 20;
    textField.className = `${prop} form-control`;
    if(prop === 'id'){
      textField.readOnly = true;
    }
    textField.addEventListener('keydown', updateState(prop));
    textField.value = KEYBOARD_STATE[prop];
  }
  component.id = prop;
  component.innerHTML = `<p class="label">${userFriendlyName[prop]}</p>`;
  component.className = 'settings-item';
  component.appendChild(textField);
  return component;
}

const updateState = (prop) => (event) => {
  if(event.code === 'Enter'){
    event.preventDefault();
    const state = KEYBOARD_STATE;
    const obj = {};
    obj[prop] = event.target.value;
    state.update(obj);
  }
}

const addSettings = () => {
  const state = KEYBOARD_STATE;
  const props = state.getProps();
  const settings = component({
    type: 'div',
    id: 'settings-container',
    classes: ['settings'],
  });
  props.forEach( prop => prop !== 'octaves' ? settings.appendChild(SettingsOption(prop)) : console.log(prop));
  render(settings, 'settings');
}