// shorthand for `document.getElementById(name)`
const getId = (name) => document.getElementById(name);

/**
 * Function that appends an html element identified by the given targetId
 *
 * @param {HTMLElement} component The component created off of some data
 * @param {string} targetId The id of the element in which the component will be rendered
 */
const render = (component, targetId) => {
  const target = getId(targetId);
  target.appendChild(component);
}

/**
 * Function that creates a general component
 *
 * @param {HTMLElement} component The component created off of some data
 * @param {string} targetId The id of the element in which the component will be rendered
 */
const component = ({type, id, classes}) => {
  const component = document.createElement(type);
  component.id = id;
  component.classList.add(...classes);
  return component;
}

document.addEventListener('DOMContentLoaded', () => {
  KEYBOARD_STATE.init();
  CATEGORY_STATE.init();

  addCategories()
    .then( res =>{
      addSettings();
      addKeyboard();
      buttons();
    })
    .catch(err => alert(err));
});