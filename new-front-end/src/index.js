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

const component = ({type, id, classes}) => {
  const component = document.createElement(type);
  component.id = id;
  component.classList.add(...classes);
  return component;
}

const createOrUpdate = (e) => console.log(e);
const deleteFromServer = (e) => console.log(e);

const buttons = () => {
  const container = getId('bottom-bar');
  const save = document.createElement('button');
  const state = KEYBOARD_STATE;

  container.innerHTML = '';
  save.id = 'save';
  save.innerHTML = 'save';
  save.addEventListener('click', createOrUpdate);

  if(state.id === '' && state.category_id === ''){
    container.appendChild(save);
  } else {
    const remove = document.createElement('button');
    const news = document.createElement('button');

    news.id = 'new';
    news.innerHTML = 'new';
    news.addEventListener('click', state.clear.bind(state));
    remove.id = 'delete';
    remove.innerHTML = 'delete';
    remove.addEventListener('click', deleteFromServer);

    container.appendChild(save);
    container.appendChild(remove);
    container.appendChild(news);
  }
}

// TODO: make the functions that generate components into a generic function
// sets up the DOM on load with default values
document.addEventListener('DOMContentLoaded', () => {
  KEYBOARD_STATE.init();
  CATEGORY_STATE.init();

  addCategories()
    .then( res =>{
      addSettings();
      buttons();
    })
    .catch(err => alert(err));
});