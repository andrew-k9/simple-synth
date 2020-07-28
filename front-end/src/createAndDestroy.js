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
        <form action="/action_page.php">
          <label for="fname">First name:</label><br>
          <input type="text" id="fname" name="fname" value="John"><br>
          <label for="lname">Last name:</label><br>
          <input type="text" id="lname" name="lname" value="Doe"><br><br>
          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  `;
  mainDiv().appendChild(popup);
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
}