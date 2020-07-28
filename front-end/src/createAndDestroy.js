const Form = () => {
  const form = document.createElement('form');
  const state = KEYBOARD_STATE;
  const categories = CATEGORY_STATE;

  form.innerHTML += `<label>Category</label><br><select name="category">`;
  for(const key in categories){
    form.innerHTTML = `<option value="${categories[key]}>${categories[key]}</option>`
  }
  form.innerHTML += '</select><br>'

  for(const key in state){
    const name = state.toServerColumns(key);
    if(typeof name !== 'undefined'){
      form.innerHTML += `
        <label for="${name}">${name}</label><br>
        <input readonly type="text" id="${name}" class="form-input" name="${name}" value="${state[key]}"><br>
      `
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
  const values = [...document.getElementsByClassName('form-input')].map( x =>{
    const val = {}
    val[x.name] = x.value;
    return val;
   });
  console.log({values})
  event.preventDefault();
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