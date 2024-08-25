
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  var slideIndex = 0;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("slide");
    var captionText = document.getElementById("caption");
  
    // Check if slides is empty
    if (slides.length === 0) {
      console.warn('No slides found.');
      return;
    }
  
    // Adjust slideIndex when it goes out of bounds
    if (n >= slides.length) { 
      slideIndex = 0;  // Reset to the first slide if index is out of bounds
    } else if (n < 0) { 
      slideIndex = slides.length - 1;  // Go to the last slide if index is below 0
    } else {
      slideIndex = n; // Ensure slideIndex is within bounds
    }
  
    // Hide all slides initially
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  
    // Uncomment and update if using dots for navigation
    // for (i = 0; i < dots.length; i++) {
    //   dots[i].className = dots[i].className.replace(" active", "");
    // }
  
    // Display the current slide if within bounds
    if (slides[slideIndex]) {
      slides[slideIndex].style.display = "block";
  
      // Uncomment and update if using dots for navigation
      // dots[slideIndex].className += " active";
  
      // Set the caption text based on the current slide
      if (dots[slideIndex]) {
        captionText.innerHTML = dots[slideIndex].alt;
      }
    } else {
      console.error('Slide at index ' + slideIndex + ' is undefined.');
    }
  }