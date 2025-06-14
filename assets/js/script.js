// script.js
document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  document.querySelector("footer p").innerHTML = `&copy; ${year} CTC. All rights reserved.`;
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const responseDiv = document.getElementById("formResponse");

  if (!name || !email || !message) {
    responseDiv.innerHTML = `<div class="alert alert-danger">Please fill all the fields.</div>`;
    return;
  }

  // Simulate a successful message send
  responseDiv.innerHTML = `<div class="alert alert-success">Thank you, ${name}! Your message has been sent.</div>`;

  // Optionally clear form
  document.getElementById("contactForm").reset();
});
