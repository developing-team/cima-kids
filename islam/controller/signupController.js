import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  ref,
  set,
  firestore,
  database,
} from "../firebaseConfig.js";

const signUpForm = document.getElementById("sign-up-form");
const registrationMessage = document.getElementById("registrationMessage");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signUpForm);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const gender = formData.get("gender");

  // Regex patterns for email and password validation
  let emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

  let lowerCaseRegex = /(?=.[a-z])/;

  let upperCaseRegex = /(?=.[A-Z])/;

  let digitRegex = /(?=.\d)/;

  let symbolRegex = /(?=.[!@#$%^&*()_+}{":;'?/><,.\[]-])/;

  let stringLengthRegex = /^.{8,}$/;

  console.log(email);

  if (!emailRegex.test(email)) {
    function showCustomAlert() {
      Swal.fire({
        title: "invalid email ",
        text: "Please enter the correct email format name@domain.com",
        icon: "warning", // You can change this to 'success', 'error', 'warning', etc.
        confirmButtonText: "OK",
        confirmButtonColor: "#e9768f", // Customize button color
        background: "#fff", // Customize background color
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      });
    }
    showCustomAlert();
  } else if (!lowerCaseRegex.test(password)) {
    function showCustomAlert() {
      Swal.fire({
        title: "invalid password ",
        text: "Please make sure that your password contains at least 1 lowercase charachter",
        icon: "warning", // You can change this to 'success', 'error', 'warning', etc.
        confirmButtonText: "OK",
        confirmButtonColor: "#e9768f", // Customize button color
        background: "#fff", // Customize background color
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      });
    }
    showCustomAlert();
  } else if (!upperCaseRegex.test(password)) {
    function showCustomAlert() {
      Swal.fire({
        title: "invalid password ",
        text: "Please make sure that your password has at least 1 uppercase charechter",
        icon: "warning", // You can change this to 'success', 'error', 'warning', etc.
        confirmButtonText: "OK",
        confirmButtonColor: "#e9768f", // Customize button color
        background: "#fff", // Customize background color
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      });
    }
    showCustomAlert();
  } else if (!digitRegex.test(password)) {
    function showCustomAlert() {
      Swal.fire({
        title: "invalid password ",
        text: "Please make sure that your password contains at least 1 digit",
        icon: "warning", // You can change this to 'success', 'error', 'warning', etc.
        confirmButtonText: "OK",
        confirmButtonColor: "#e9768f", // Customize button color
        background: "#fff", // Customize background color
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      });
    }
    showCustomAlert();
  } else if (!symbolRegex.test(password)) {
    function showCustomAlert() {
      Swal.fire({
        title: "invalid password ",
        text: "Make sure that your password has at least 1 symbol",
        icon: "warning", // You can change this to 'success', 'error', 'warning', etc.
        confirmButtonText: "OK",
        confirmButtonColor: "#e9768f", // Customize button color
        background: "#fff", // Customize background color
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      });
    }
    showCustomAlert();
  } else if (!stringLengthRegex.test(password)) {
    function showCustomAlert() {
      Swal.fire({
        title: "invalid password ",
        text: "make sure that your password is at least 8 digits long",
        icon: "warning", // You can change this to 'success', 'error', 'warning', etc.
        confirmButtonText: "OK",
        confirmButtonColor: "#e9768f", // Customize button color
        background: "#fff", // Customize background color
        customClass: {
          popup: "custom-popup",
          title: "custom-title",
          confirmButton: "custom-confirm-button",
        },
      });
    }
    showCustomAlert();
  } else {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = { username, email, password, gender };

      await setDoc(doc(firestore, "users", user.uid), userData);
      await set(ref(database, `users/${user.uid}`), userData);

      localStorage.setItem("userData", JSON.stringify(userData));

      registrationMessage.textContent = "Registration successful!";
      setTimeout(() => {
        window.location.href = "../abdelraouf/auth.html";
      }, 1000);
    } catch (error) {
      registrationMessage.textContent = `  ${error.message}`;
    }
  }
});
// const email = document.getElementById("sign-in-email").value;
// const password = document.getElementById("sign-in-password").value;
const signInForm = document.getElementById("sign-in-form");
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signInForm);

  const email = formData.get("email");
  const password = formData.get("password");

  // Regex patterns for email and password validation
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let lowerCaseRegex = /(?=.*[a-z])/;
  let upperCaseRegex = /(?=.*[A-Z])/;
  let digitRegex = /(?=.*\d)/;
  let symbolRegex = /(?=.*[!@#$%^&*()_+}{":;'?/><,.\[\]-])/;
  let stringLengthRegex = /^.{8,}$/;

  function showCustomAlert(title, text) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning", // You can change this to 'success', 'error', 'warning', etc.
      confirmButtonText: "OK",
      confirmButtonColor: "#e9768f", // Customize button color
      background: "#fff", // Customize background color
      customClass: {
        popup: "custom-popup",
        title: "custom-title",
        confirmButton: "custom-confirm-button",
      },
    });
  }

  if (!emailRegex.test(email)) {
    showCustomAlert(
      "Invalid Email",
      "Please enter the correct email format name@domain.com"
    );
  } else if (!lowerCaseRegex.test(password)) {
    showCustomAlert(
      "Invalid Password",
      "Please make sure that your password contains at least 1 lowercase character"
    );
  } else if (!upperCaseRegex.test(password)) {
    showCustomAlert(
      "Invalid Password",
      "Please make sure that your password has at least 1 uppercase character"
    );
  } else if (!digitRegex.test(password)) {
    showCustomAlert(
      "Invalid Password",
      "Please make sure that your password contains at least 1 digit"
    );
  } else if (!symbolRegex.test(password)) {
    showCustomAlert(
      "Invalid Password",
      "Make sure that your password has at least 1 symbol"
    );
  } else if (!stringLengthRegex.test(password)) {
    showCustomAlert(
      "Invalid Password",
      "Make sure that your password is at least 8 characters long"
    );
  } else {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        email: user.email,
        uid: user.uid,
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      const signInMessage = document.getElementById("signInMessage");
      signInMessage.textContent = "Sign-in successful!";
      signInMessage.style.color = "green";
      setTimeout(() => {
        window.location.href = "../abdelraouf/auth.html";
      }, 1000);
    } catch (error) {
      const signInMessage = document.getElementById("signInMessage");
      signInMessage.textContent = `${error.message}`;
    }
  }
});
