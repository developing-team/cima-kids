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
} from "./firebaseConfig.js";

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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!username || !email || !password || !gender) {
    registrationMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailPattern.test(email)) {
    registrationMessage.textContent = "Invalid email format.";
    return;
  }

  if (!passwordPattern.test(password)) {
    registrationMessage.textContent =
      "Password must be at least 8 characters long and contain at least one numeric digit, one uppercase and one lowercase letter.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = { username, email, gender };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    localStorage.setItem("userData", JSON.stringify(userData));

    registrationMessage.textContent = "Registration successful!";
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    registrationMessage.textContent = `Error: ${error.message}`;
  }
});

const signInForm = document.getElementById("sign-in-form");
const signInMessage = document.getElementById("signInMessage");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-password").value;

  // Regex pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    signInMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailPattern.test(email)) {
    signInMessage.textContent = "Invalid email format.";
    return;
  }

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

    signInMessage.textContent = "Sign-in successful!";
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    signInMessage.textContent = `Error: ${error.message}`;
  }
});

const socialSignIn = async (provider, messageElement, successMessage) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const [username] = user.displayName ? user.displayName.split(" ") : [""];

    const userData = {
      username,
      email: user.email,
      uid: user.uid,
    };

    await setDoc(doc(firestore, "users", user.uid), userData);
    await set(ref(database, `users/${user.uid}`), userData);

    localStorage.setItem("userData", JSON.stringify(userData));

    messageElement.textContent = successMessage;
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    messageElement.textContent = `Error: ${error.message}`;
  }
};

const googleSignInBtn = document.getElementById("googleSignInBtn");
googleSignInBtn.addEventListener("click", () => {
  socialSignIn(
    new GoogleAuthProvider(),
    registrationMessage,
    "Google sign-in successful!"
  );
});

const googleSignUpBtn = document.getElementById("googleSignUpBtn");
googleSignUpBtn.addEventListener("click", () => {
  socialSignIn(
    new GoogleAuthProvider(),
    registrationMessage,
    "Google sign-up successful!"
  );
});

const facebookSignInBtn = document.getElementById("facebookSignInBtn");
facebookSignInBtn.addEventListener("click", () => {
  socialSignIn(
    new FacebookAuthProvider(),
    registrationMessage,
    "Facebook sign-in successful!"
  );
});

const facebookSignUpBtn = document.getElementById("facebookSignUpBtn");
facebookSignUpBtn.addEventListener("click", () => {
  socialSignIn(
    new FacebookAuthProvider(),
    registrationMessage,
    "Facebook sign-up successful!"
  );
});

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
