const SettingsOption = (prop) => {
  const component = document.createElement('div');
  let textField = document.createElement('textarea');
  if(prop === 'category_id'){
    textField = Selector(CATEGORY_STATE.array, prop);
  }else{
    textField.rows = 1;
    textField.cols = 20;
    textField.className = prop;
    if(prop === 'id'){
      textField.readOnly = true;
    }
    textField.addEventListener('keydown', updateState(prop));
    textField.value = KEYBOARD_STATE[prop];
  }
  component.id = prop;
  component.innerHTML = `<p class="label">${prop}</p>`;
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
  component.innerHTML = '<h1>Settings</h1>'
  props.forEach( prop => settings.appendChild(SettingsOption(prop)) );
  render(settings, 'settings');
}