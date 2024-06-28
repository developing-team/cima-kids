const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // Password must be at least 8 characters long and include at least one number, one uppercase and one lowercase letter
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

const validateName = (name) => {
  // Name should only contain alphabets and be at least 2 characters long
  const re = /^[a-zA-Z]{2,}$/;
  return re.test(name);
};

const validateAge = (age) => {
  // Age should be a positive number between 1 and 120
  const re = /^(?:1[01][0-9]|120|1[2-9]|[2-9][0-9]?)$/;
  return re.test(age);
};

const validateGender = (gender) => {
  // Gender should be either 'male' or 'female'
  return gender === "male" || gender === "female";
};

const showErrorMessage = (element, message) => {
  const errorMessage = element.parentElement.querySelector(".error-message");
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
};

const hideErrorMessage = (element) => {
  const errorMessage = element.parentElement.querySelector(".error-message");
  errorMessage.style.display = "none";
};

const showMessage = (message, type) => {
  const messageBox = document.createElement("div");
  messageBox.className = `message ${type}`;
  messageBox.innerText = message;
  document.body.appendChild(messageBox);
  setTimeout(() => {
    messageBox.remove();
  }, 3000);
};

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = signUpForm.querySelector('input[placeholder="First Name"]');
  const lastName = signUpForm.querySelector('input[placeholder="Last Name"]');
  const email = signUpForm.querySelector('input[type="email"]');
  const password = signUpForm.querySelector('input[type="password"]');
  const age = signUpForm.querySelector('input[type="number"]');
  const gender = signUpForm.querySelector("select");

  let isValid = true;

  if (!validateName(firstName.value)) {
    showErrorMessage(
      firstName,
      "First name should only contain alphabets and be at least 2 characters long."
    );
    isValid = false;
  } else {
    hideErrorMessage(firstName);
  }

  if (!validateName(lastName.value)) {
    showErrorMessage(
      lastName,
      "Last name should only contain alphabets and be at least 2 characters long."
    );
    isValid = false;
  } else {
    hideErrorMessage(lastName);
  }

  if (!validateEmail(email.value)) {
    showErrorMessage(email, "Please enter a valid email address.");
    isValid = false;
  } else {
    hideErrorMessage(email);
  }

  if (!validatePassword(password.value)) {
    showErrorMessage(
      password,
      "Password must be at least 8 characters long and include at least one number, one uppercase and one lowercase letter."
    );
    isValid = false;
  } else {
    hideErrorMessage(password);
  }

  if (!validateAge(age.value)) {
    showErrorMessage(age, "Age should be a positive number between 1 and 120.");
    isValid = false;
  } else {
    hideErrorMessage(age);
  }

  if (!validateGender(gender.value)) {
    showErrorMessage(gender, "Please select a valid gender.");
    isValid = false;
  } else {
    hideErrorMessage(gender);
  }

  if (isValid) {
    showMessage("Registration successful", "success");
    signUpForm.reset();
  }
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = signInForm.querySelector('input[type="text"]');
  const password = signInForm.querySelector('input[type="password"]');

  let isValid = true;

  if (!validateEmail(username.value) && !validateName(username.value)) {
    showErrorMessage(
      username,
      "Invalid username. It should be a valid email or a name with at least 2 characters."
    );
    isValid = false;
  } else {
    hideErrorMessage(username);
  }

  if (!validatePassword(password.value)) {
    showErrorMessage(
      password,
      "Password must be at least 8 characters long and include at least one number, one uppercase and one lowercase letter."
    );
    isValid = false;
  } else {
    hideErrorMessage(password);
  }

  if (isValid) {
    showMessage("Login successful", "success");
    signInForm.reset();
  }
});
