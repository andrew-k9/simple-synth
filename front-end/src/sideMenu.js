// [
//   {
//   "name": "Lead",
//   "settings": []
//   },
//   {
//   "name": "Background",
//   "settings": []
//   },
//   {
//   "name": "Electronic",
//   "settings": []
//   },
//   {
//   "name": "80's",
//   "settings": []
//   },
//   {
//   "name": "Other",
//   "settings": [
//      {
//        "id": 1,
//        "name": "Default"
//      }
//    ]
//   }
// ]

const openNav = () => document.getElementById("mySidenav").style.width = "250px";
const closeNav = () => document.getElementById("mySidenav").style.width = "0";

const Category = ({id, name}) => {
  const component = document.createElement('a');
  component.id = id;
  component.innerHTML = name;
  return component;
}

const populateMenu = () => {
  req({
    routeName: 'categories',
    type: 'GET',
    callback: (resArray) => resArray.forEach( a => render(Category(a), 'mySidenav'))
  });
}
const addSideMenu = () => {
  // for(let i = 0; i < 10; ++i){
  //   const tmp = document.createElement('a');
  //   const side = document.getElementById('mySidenav');
  //   tmp.innerHTML = `iteration ${i + 1}`;
  //   side.appendChild(tmp);
  // }
  populateMenu();
}