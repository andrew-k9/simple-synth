const Form = () => {
  const form = document.createElement('form');
  const state = KEYBOARD_STATE;
  const categories = CATEGORY_STATE;

  let htmlstr = '';

  htmlstr += `
        <label for="name">Name</label><br>
        <input type="text" id="name" class="form-input" name="name" value="Name"><br>
  `;

  htmlstr += `<select name="category">`;
  categories.array.forEach( a => htmlstr += `<option value="${a}">${a}</option>` );
  htmlstr += `</select><br>`;
  form.innerHTML = htmlstr;

  for(const key in state){
    const name = state.toServerColumns(key);
    if(typeof name !== 'undefined'){
      form.innerHTML += `
        <label for="${name}">${name}</label><br>
        <input readonly type="text" id="${name}" class="form-input" name="${name}" value="${state[key]}"><br>
      `;
    }
  }

  form.innerHTML += '<input type="submit" value="Submit">';
  form.addEventListener('submit', submitForm);
  return form;
}

const modalHTML = () => {
  const popup = document.createElement('div');
  popup.id = 'create-modal';
  popup.className = 'main-stack';
  popup.innerHTML = `
    <footer>
      <button id="new-button">Create Setting</button>
    </footer>
    <div id="new-modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
      </div>
    </div>
  `;
  mainDiv().appendChild(popup);
}

const submitForm = (event) => {
  event.preventDefault();
  const values = [...document.getElementsByClassName('form-input')].map( x =>{
    const val = {}
    val[x.name] = x.value;
    return val;
   });
   const category_name = event.target['0'].value;
  values.push({category: category_name});
  const {gainValue, stopTime, A} = KEYBOARD_STATE;

  req({
    routeName: '/settings',
    type: 'POST',
    callback: appendNewSetting,
    body: JSON.stringify({
      setting: {
        gain: gainValue,
        stop_time: stopTime,
        a_frequency: A,
        category_name
      }
    })
  })
    .catch( err => console.log({err}))
}

const modal = () => {
  modalHTML();
  const modal = document.getElementById("new-modal");
  const btn = document.getElementById("new-button");
  const span = document.getElementsByClassName("close")[0];

  btn.addEventListener('click', () => modal.style.display = "flex");
  span.addEventListener('click', () => modal.style.display = "none");
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  document.getElementsByClassName('modal-content')[0].appendChild(Form());
}