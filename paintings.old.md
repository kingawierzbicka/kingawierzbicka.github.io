---
layout: gallery
title: Paintings
permalink: /paintings/
data_file: paintings
gallery_js: lightbox
---

<!--
<div class="gallery">
  {% assign paintings = site.data.paintings %}
  {% assign number_slides = paintings.size | minus: 1 %}
  {% assign slides = (0..number_slides) %}
  {% for slide in slides %} 
  <img src="{{ site.baseurl }}{{ paintings[slide].file }}" onclick="openModal();currentSlide({{ slide }})" class="gallery-item"  alt="{{ paintings[slide].name }}">
  {% endfor %}
</div>

<div id="myModal" class="modal">
  <span class="close cursor" onclick="closeModal()">&times;</span>
  <div class="modal-content">  
    {% for slide in slides %}
    <div class="mySlides">
      <div class="numbertext">{{ slide | plus: 1 }} / {{paintings.size}}</div>
      <img class="slide" src="{{ site.baseurl }}{{ paintings[slide].file }}" alt="{{ paintings[slide].name }}">
    </div>
    {% endfor %}  
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
    <div class="caption-container">
      <p id="caption"></p>
    </div>
  </div>
</div>
-->
