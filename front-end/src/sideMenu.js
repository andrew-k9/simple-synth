const openNav = () => document.getElementById("mySidenav").style.width = "250px";
const closeNav = () => document.getElementById("mySidenav").style.width = "0";

const UserSetting = ({id, name}) => {
  const component = document.createElement('p');
  component.className = 'setting-list-item';
  component.innerHTML = name;
  component.addEventListener('click', updateStateFromServerById(id));
  return component;
}

const Category = ({id, name, settings}) => {
  const component = document.createElement('a');
  component.id = `category-${id}`;
  component.innerHTML = name;
  settings.forEach( s => component.appendChild(UserSetting(s)) );
  return component;
}

const appendNewSetting = ({category_id, setting_id, name}) => {
  const cat = document.getElementById(`category-${category_id}`);
  cat.appendChild(UserSetting({
    id: setting_id,
    name
  }));
}

const updateStateFromServerById = (id) => (event) => {
  req({
    routeName: `settings/${id}`,
    type: 'GET',
    callback: (res) => {
      KEYBOARD_STATE.update(KEYBOARD_STATE.serverMap(res));
      if(mainDiv()){
        mainDiv().removeChild(keyboardDiv());
      }
      addKeyboard();
    }
  });
}

const addSideMenu = () => {
  req({
    routeName: 'categories',
    type: 'GET',
    callback: (resArray) => resArray.forEach( a => {
      CATEGORY_STATE.mutate(a.name);
      render(Category(a), 'mySidenav');
    })
  })
    .then( res =>modal() )
    .catch( err => console.log(err));
}