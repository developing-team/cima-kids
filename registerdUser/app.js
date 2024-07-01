import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiL9I5hokjct0j1WiLg5ZB0erVv094aiw",
  authDomain: "cima-kids.firebaseapp.com",
  databaseURL:
    "https://cima-kids-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cima-kids",
  storageBucket: "cima-kids.appspot.com",
  messagingSenderId: "324919675126",
  appId: "1:324919675126:web:af1fb7392f829b2f2104d7",
  measurementId: "G-WZHXGFQLY0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const moviesRef = ref(db, "movies"); // Assuming "movies" is your collection in Firebase

let moviesPerPage = 6;
let currentPage = 1;
let allMovies = [];

// Function to fetch and render movies
async function fetchMovies() {
  const snapshot = await get(moviesRef);
  allMovies = snapshot.val();
  console.log(allMovies);
  renderMovies();
  renderMovies1();
  renderPagination();
}

function renderMovies() {
  const rootElement = document.getElementById("root");
  const start = (currentPage - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const currentMovies = Object.values(allMovies).slice(start, end);

  rootElement.innerHTML = "";

  currentMovies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("card");

    const imageElement = document.createElement("img");
    imageElement.src = movie.image_url;
    imageElement.alt = movie.title;
    movieElement.appendChild(imageElement);

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-cont-header");

    const titleElement = document.createElement("h2");
    titleElement.textContent = movie.title;
    cardHeader.appendChild(titleElement);
    cardContent.appendChild(cardHeader);

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("describe");
    descriptionElement.textContent = movie.description;
    cardContent.appendChild(descriptionElement);

    movieElement.appendChild(cardContent);

    rootElement.appendChild(movieElement);
  });
}

function renderMovies1() {
  const rootElement = document.getElementById("root1");
  const start = (currentPage - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const currentMovies = Object.values(allMovies).slice(start, end);

  rootElement.innerHTML = "";

  currentMovies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("card");

    const imageElement = document.createElement("img");
    imageElement.src = movie.image_url;
    imageElement.alt = movie.title;
    movieElement.appendChild(imageElement);

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-cont-header");

    const titleElement = document.createElement("h2");
    titleElement.textContent = `rate : ${movie.rate}`;
    cardHeader.appendChild(titleElement);
    cardContent.appendChild(cardHeader);

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("describe");
    descriptionElement.textContent = movie.genre;
    cardContent.appendChild(descriptionElement);

    movieElement.appendChild(cardContent);

    rootElement.appendChild(movieElement);
  });
}

function renderPagination() {
  const paginationElement = document.getElementById("pagination");
  const totalPages = Math.ceil(Object.keys(allMovies).length / moviesPerPage);

  paginationElement.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    currentPage--;
    renderMovies();
    // renderMovies1();
    renderPagination();
  };
  paginationElement.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.disabled = i === currentPage;
    pageButton.onclick = () => {
      currentPage = i;
      renderMovies();
      // renderMovies1();
      renderPagination();
    };
    paginationElement.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    currentPage++;
    renderMovies();
    // renderMovies1();
    renderPagination();
  };
  paginationElement.appendChild(nextButton);
}

fetchMovies();

// login form
let loginForm = document.querySelector(".login-form");

document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
  navbar.classList.remove("active");
};

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  loginForm.classList.remove("active");
};

window.onscroll = () => {
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

// hero
var options = {
  accessibility: true,
  prevNextButtons: true,
  pageDots: true,
  setGallerySize: false,
  autoPlay: 3000,
  arrowShape: "M 10,50 L 60,75 L 60,25 Z",
};

var carousel = document.querySelector("[data-carousel]");
var slides = document.getElementsByClassName("carousel-cell");
var flkty = new Flickity(carousel, options);

flkty.on("scroll", function () {
  flkty.slides.forEach(function (slide, i) {
    var image = slides[i];
    var x = ((slide.target + flkty.x) * -1) / 3;
    image.style.backgroundPosition = x + "px";
  });
});
