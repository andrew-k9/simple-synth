/**
 * Function that creates a selector dropdown for settings
 *
 * @param {[Object]} settings - array of setting objects
 * @param {string} name - name of the category
 * @returns {HTMLElement} HTML selector
 */
const Selector = (settings, name) => {
  const selector = document.createElement('select');
  selector.className = `form-control`;
  settings.forEach( setting => {
    const option = document.createElement('option');
    option.className = setting.name;
    option.id = `setting-${setting.id}`;
    option.innerHTML = setting.name;
    selector.appendChild(option);
  });
  return selector;
}

/**
 * Function that lists all the categories
 *
 * @param {[String]} categories - list of category names
 */
const CategorySelect = (categories) => {
  const categoryContainer = document.createElement('div');
  categoryContainer.id = 'category-container';
  categories.forEach( category => {
    const {settings, name} = category;
    CATEGORY_STATE.add(category);
    // no settings is just a p tag, settings are a form
    if(settings.length > 0){
      const form = document.createElement('form');
      form.innerHTML = name;
      form.className = 'card category-card';
      form.appendChild(Selector(settings, name));
      form.innerHTML += `<input type="submit" class="btn btn-secondary" value="Use Setting">`;
      form.addEventListener('submit', submitForm);
      categoryContainer.appendChild(form);
    }else{
      const p = document.createElement('p');
      p.className = 'card';
      p.innerHTML = category.name;
      categoryContainer.appendChild(p);
    }
  });
  return categoryContainer;
}

/**
 * Function that gets the setting info from the server
 *
 * @param {Object} event - event from event listener
 */
const submitForm = (event) => {
  event.preventDefault();
  const id = [...event.target[0].children].filter( x => x.selected)[0].id.split('-')[1];
  request({routeName: `settings/${id}`,type: 'GET'})
    .then( res => {
      KEYBOARD_STATE.update(res);
    })
    .catch( err => console.log(err));

  event.preventDefault();
}

const initSelector = (categories) => {
  const element = getId('category-select');
  element.innerHTML = `<h1 class="display-5 text-light">Categories</h1>`;
  element.appendChild(CategorySelect(categories));
}

const addCategories = () => {
  return new Promise((resolve, reject) => {
    request({ routeName: 'categories', type: 'GET'})
    .then( res => {
      initSelector(res);
      resolve(true);
    })
    .catch(err => reject(err));
  });
}