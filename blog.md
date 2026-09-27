---
layout: default
title: Blog
permalink: /blog/
---

<p class="eyebrow">Blog</p>

{%- if site.posts.size > 0 %}
<ul class="post-list">
  {%- for post in site.posts %}
  <li>
    {%- if post.image %}
    <a href="{{ post.url | relative_url }}">
      <img src="{{ post.image | relative_url }}" alt="{{ post.image_alt | default: post.title | escape }}" loading="lazy" decoding="async">
    </a>
    {%- endif %}
    <div>
      <a href="{{ post.url | relative_url }}"><span class="t">{{ post.title | escape }}</span></a>
      <div class="d">{{ post.date | date: "%-d %B %Y" }}</div>
    </div>
  </li>
  {%- endfor %}
</ul>
{%- else %}
<p class="stmt">No posts yet.</p>
{%- endif %}
