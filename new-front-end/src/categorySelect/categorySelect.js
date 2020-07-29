
const Selector = (settings) => {
  const selector = document.createElement('select');
  settings.forEach( setting => {
    const option = document.createElement('option');
    option.id = setting.name;
    option.innerHTML = setting.name;
    selector.appendChild(option);
  });
  return selector;
}

const CategorySelect = (categories) => {
  const categoryContainer = document.createElement('div');
  categoryContainer.id = 'category-container';
  categories.forEach( category => {
    const div = document.createElement('div');
    div.id = category.name;
    div.innerHTML = category.name;
    if(category.settings.length > 0){
      div.appendChild(Selector(category.settings));
    }
    categoryContainer.appendChild(div);
  });
  return categoryContainer;
}

const initSelector = (categories) => {
  const element = getId('category-select');
  element.innerHTML = `<h1>Categories</h1>`;
  element.appendChild(CategorySelect(categories));
}

const addCategories = () => {
  request({ routeName: 'categories', type: 'GET'})
    .then( res => initSelector(res))
    .catch(err => alert(err));
}