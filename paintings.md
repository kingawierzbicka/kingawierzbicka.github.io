---
layout: gallery
title: Paintings
permalink: /paintings/
gallery_js: lightbox
---

<div class="row">
  {% assign slides = (1..4) %}
  {% for slide in slides %}
  <div class="column">
    <img src="{{ site.baseurl }}/assets/image{{ slide }}.png" onclick="openModal();currentSlide({{ slide }})" class="hover-shadow">
  </div>
  {% endfor %}
</div>

<div id="myModal" class="modal">
  <span class="close cursor" onclick="closeModal()">&times;</span>
  <div class="modal-content">
    {% for slide in slides %}
    <div class="mySlides">
      <div class="numbertext">{{ slide }} / 4</div>
      <img class="demo" src="{{ site.baseurl }}/assets/image{{ slide }}.png" style="width:100%" alt="Slide {{ slide }}">
    </div>
    {% endfor %}
    
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
    
    <div class="caption-container">
      <p id="caption"></p>
    </div>
<!-- 
    <div class="column-modal">
      <img id="prevSlide" class="demo" src="{{ site.baseurl }}/assets/image1.png" onclick="currentSlide(1)" alt="Slide 1">
    </div>
    <div class="column-modal">
      <img id="currentSlide" class="demo" src="{{ site.baseurl }}/assets/image2.png" onclick="currentSlide(2)" alt="Slide 2">
    </div>
    <div class="column-modal">
      <img id="nextSlide" class="demo" src="{{ site.baseurl }}/assets/image3.png" onclick="currentSlide(3)" alt="Slide 3">
    </div>


    {% for i in (1..3) %}
    <div class="column-modal">
      <img class="demo" src="{{ site.baseurl }}/assets/image{{ i }}.png" onclick="currentSlide({{ i }})" alt="Slide {{ i }}">
    </div>
    {% endfor %}
-->    
  </div>
</div>
