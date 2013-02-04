MenuButton = function () {
  this.id = 'menu-button';
  this.wrapper = document.getElementById('wrapper');
  this.button = document.getElementById(this.id);
  this.button.addEventListener('click', function (event) {
    event.preventDefault();
    wrapper.classList.toggle('show-nav');
  });
}

window.onload = function () {
  var menuButton = new MenuButton();
};