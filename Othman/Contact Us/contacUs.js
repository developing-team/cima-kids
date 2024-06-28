const email = document.getElementById("email");
function checkEmail(event) {
  event.preventDefault();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.match(email.value)) {
    alert("Please enter a valid email address.");
  }
}

form.addEventListener("click", checkEmail());
