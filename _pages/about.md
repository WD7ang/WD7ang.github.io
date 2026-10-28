---
layout: academic
permalink: /
description: Weidong Tang — undergraduate at Xidian University, researching natural language processing, computer vision, and multimodal intelligence.
body_class: homepage
redirect_from:
  - /about/
  - /about.html
---
<section class="profile-hero" aria-labelledby="profile-name">
  <div class="profile-copy">
    <div class="profile-intro">
      <p class="eyebrow">Language · Vision · Intelligence</p>
      <h1 id="profile-name">Weidong Tang <span class="chinese-name" lang="zh">汤维栋</span></h1>
      <p class="profile-subtitle">Undergraduate at <a href="https://www.xidian.edu.cn/">Xidian University</a> · He/Him</p>
    </div>
    <div class="profile-bio">
      <p>Hi! My research interests span <strong>natural language processing</strong>, <strong>computer vision</strong>, and their intersection.</p>
      <p>My long-term research goal is to understand and enable the emergence of human-like intelligence, while developing unified models that bridge the physical and mental worlds. I enjoy exploring diverse research directions and collaborating with researchers across different fields.</p>
      <p>Feel free to reach out for collaborations or potential opportunities.</p>
    </div>
    <div class="profile-links" aria-label="Contact and profiles">
      <a href="mailto:{{ site.author.email }}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>Email</a>
      <a href="{{ site.author.googlescholar }}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 8 10-5 10 5-10 5Z M6 10v7c4 3 8 3 12 0v-7 M22 8v9"/></svg>Google Scholar</a>
      <a href="https://github.com/{{ site.author.github }}">GitHub ↗</a>
      <a href="{{ '/images/vx.jpg' | relative_url }}">WeChat</a>
      <a href="{{ '/cv/' | relative_url }}">CV ↗</a>
    </div>
  </div>
  <figure class="portrait">
    <div class="portrait-frame"><img src="{{ '/images/wx.jpg' | relative_url }}" alt="Weidong Tang standing on a street in Edinburgh" width="1440" height="2160" fetchpriority="high"></div>
    <figcaption lang="zh">人间万象皆有数，唯此风骨世无双</figcaption>
  </figure>
</section>

<section id="news" class="home-section" aria-labelledby="news-heading">
  <div class="section-heading"><h2 id="news-heading">News</h2><span class="section-note">Recent updates</span></div>
  <ul class="news-list">
    {% for item in site.data.news limit:4 %}
    <li><time datetime="{{ item.date | replace: '.', '-' }}">{{ item.date }}</time><span>{{ item.text }}</span></li>
    {% endfor %}
  </ul>
  {% if site.data.news.size > 4 %}
  <details class="news-archive"><summary>Earlier updates <span aria-hidden="true">↓</span></summary>
    <ul class="news-list">{% for item in site.data.news offset:4 %}<li><time datetime="{{ item.date | replace: '.', '-' }}">{{ item.date }}</time><span>{{ item.text }}</span></li>{% endfor %}</ul>
  </details>
  {% endif %}
</section>

<section id="experience" class="home-section" aria-labelledby="experience-heading">
  <div class="section-heading"><h2 id="experience-heading">Experience</h2><span class="section-note">Research & education</span></div>
  <div class="experience-grid">
    {% for item in site.data.experience %}
    <article class="experience-card">
      <img class="experience-logo" src="{{ item.image | relative_url }}" alt="" width="46" height="48" loading="lazy">
      <div class="experience-info"><h3>{{ item.name }}</h3><div class="experience-date">{{ item.date }}</div><p class="experience-description">{{ item.description }}</p></div>
    </article>
    {% endfor %}
  </div>
</section>

<section id="blog" class="home-section" aria-labelledby="blog-heading">
  <div class="section-heading"><h2 id="blog-heading">Blog</h2><a class="section-link" href="{{ '/blog/' | relative_url }}">All writing ↗</a></div>
  {% if site.posts.size > 0 %}
  <ul class="blog-list">{% for post in site.posts limit:3 %}<li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b %d, %Y' }}</time><h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3><p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p></li>{% endfor %}</ul>
  {% else %}<p class="empty-note">Research notes and ideas — coming soon.</p>{% endif %}
</section>

<section id="publications" class="home-section" aria-labelledby="publications-heading">
  <div class="section-heading"><h2 id="publications-heading">Publications</h2><a class="section-link" href="{{ site.author.googlescholar }}">Google Scholar ↗</a></div>
  <div class="publication-controls" role="group" aria-label="Publication view" hidden>
    <button type="button" data-view="selected" aria-pressed="true" aria-controls="selected-publications">Selected</button>
    <button type="button" data-view="all" aria-pressed="false" aria-controls="all-publications">All publications ({{ site.data.publications.size }})</button>
  </div>
  <p class="publication-legend">* Equal contribution · † Corresponding author · ‡ Project leader</p>
  <div id="selected-publications" data-publication-panel="selected" hidden>
    {% for pub in site.data.publications %}{% if pub.selected %}
    <article class="publication"><img class="publication-image" src="{{ pub.image | relative_url }}" alt="Overview of {{ pub.title | escape }}" loading="lazy" width="220" height="138">{% include academic-publication.html pub=pub detailed=true %}</article>
    {% endif %}{% endfor %}
  </div>
  <ul id="all-publications" class="publication-list" data-publication-panel="all">
    {% for pub in site.data.publications %}<li class="publication">{% include academic-publication.html pub=pub %}</li>{% endfor %}
  </ul>
</section>

<section id="projects" class="home-section" aria-labelledby="projects-heading">
  <div class="section-heading"><h2 id="projects-heading">Projects</h2><a class="section-link" href="https://github.com/{{ site.author.github }}">GitHub ↗</a></div>
  <article class="project">
    <a href="https://github.com/WD7ang/WowPage" aria-label="WowPage on GitHub"><img class="project-image" src="{{ '/images/homepage.png' | relative_url }}" alt="Preview of the WowPage academic homepage template" loading="lazy" width="220" height="138"></a>
    <div><span class="publication-venue">Open source · Academic homepage</span><h3><a href="https://github.com/WD7ang/WowPage">WowPage</a></h3><p><strong>Weidong Tang</strong>, <a href="https://selen-suyue.github.io/">Yue Su</a></p><p>In collaboration with Yue Su, I refined and improved his original homepage template. A clean standalone template version is coming soon.</p><a class="section-link" href="https://github.com/WD7ang/WowPage">View code ↗</a></div>
  </article>
</section>

<section id="awards" class="home-section" aria-labelledby="awards-heading">
  <div class="section-heading"><h2 id="awards-heading">Awards</h2></div>
  <ul class="detail-list"><li><time datetime="2025-09">2025.09</time><strong>Second-Class Academic Scholarship</strong>, Xidian University <span class="section-note">(Ranked 5/99)</span></li></ul>
</section>

<section id="services" class="home-section" aria-labelledby="services-heading">
  <div class="section-heading"><h2 id="services-heading">Services</h2></div>
  <ul class="detail-list"><li><time>2025.06 – Present</time><strong>AI Team Lead</strong>, Xidian–Inspur Club.</li><li><strong>Reviewer</strong> for ICIC 2026 and PRCV 2025, 2026.</li></ul>
</section>

<section id="talks" class="home-section" aria-labelledby="talks-heading">
  <div class="section-heading"><h2 id="talks-heading">Talks</h2></div>
  {% if site.talks.size > 0 %}
  <ul class="detail-list">{% assign talks = site.talks | sort: 'date' | reverse %}{% for talk in talks %}<li><time datetime="{{ talk.date | date_to_xmlschema }}">{{ talk.date | date: '%Y.%m' }}</time><a href="{{ talk.url | relative_url }}">{{ talk.title }}</a>{% if talk.venue %} · {{ talk.venue }}{% endif %}</li>{% endfor %}</ul>
  {% else %}<p class="empty-note">Talks and slides will be listed here.</p>{% endif %}
</section>

<section id="cv" class="home-section" aria-labelledby="cv-heading">
  <div class="section-heading"><h2 id="cv-heading">Curriculum Vitae</h2></div>
  <div class="cv-callout"><p>Education, research experience, and publications, with automatically updated research metrics.</p><div class="button-row"><a class="button button-primary" href="{{ '/cv/' | relative_url }}">View online CV ↗</a><a class="button" href="{{ '/images/cv.pdf' | relative_url }}" download="Weidong-Tang-CV.pdf">Download PDF ↓</a></div></div>
</section>
