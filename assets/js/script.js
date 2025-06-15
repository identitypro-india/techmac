// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Footer Year
  const year = new Date().getFullYear();
  document.querySelector("footer p").innerHTML = `&copy; ${year} CTC. All rights reserved.`;

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const responseDiv = document.getElementById("formResponse");

      if (!name || !email || !message) {
        responseDiv.innerHTML = `<div class="alert alert-danger">Please fill all the fields.</div>`;
        return;
      }

      responseDiv.innerHTML = `<div class="alert alert-success">Thank you, ${name}! Your message has been sent.</div>`;

      contactForm.reset();
    });
  }

  // YouTube API Integration
  const apiKey = 'AIzaSyCsAa_CqUn04B5DbW9IJztfm4Rd1FJ9svs'; // Replace with your API key
  const channelId = 'UCje3ZP5asc0UVUpCXnx54LA'; // Replace with your Channel ID
  const maxResults = 10;

  fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const uploadsPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

      // Fetch videos from the uploads playlist
      return fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`);
    })
    .then(response => response.json())
    .then(data => {
      const videoIds = data.items.map(item => item.contentDetails.videoId).join(',');

      // Fetch video details (including duration)
      return fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`);
    })
    .then(response => response.json())
    .then(data => {
      data.items.forEach(item => {
        const videoId = item.id;
        const title = item.snippet.title;
        const duration = item.contentDetails.duration;

        // Convert ISO 8601 duration to total seconds
        const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
        const minutes = match[1] ? parseInt(match[1]) : 0;
        const seconds = match[2] ? parseInt(match[2]) : 0;
        const totalSeconds = (minutes * 60) + seconds;

        const videoHTML = `
          <div class="col-md-4 col-sm-6 mb-4">
            <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); background: white;">
              <iframe width="100%" height="230" src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allowfullscreen style="display:block;"></iframe>
              <div style="padding: 10px;">
                <h6 style="font-size: 16px; margin: 0;">${title}</h6>
              </div>
            </div>
          </div>
        `;

        if (totalSeconds < 60) {
          document.getElementById('shortVideos').innerHTML += videoHTML;
        } else {
          document.getElementById('fullVideos').innerHTML += videoHTML;
        }
      });
    })
    .catch(error => {
      console.error('Error fetching YouTube videos:', error);
    });
});


    // Preloader script
    window.addEventListener("load", function () {
      document.getElementById("preloader").style.display = "none";
    });


    AOS.init();

      AOS.init({ duration: 1000, once: true });

  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  });
