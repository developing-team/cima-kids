const email = document.getElementById("email");
function checkEmail(event) {
  event.preventDefault();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.match(email.value)) {
    alert("Please enter a valid email address.");
  }
}

form.addEventListener("click", checkEmail());

//nav
document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".mobile-menu").classList.toggle("show");
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});
