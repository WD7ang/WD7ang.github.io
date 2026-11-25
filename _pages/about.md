---
permalink: /
layout: single
homepage_palette: classic-blue
author_profile: false
redirect_from:
  - /about/
  - /about.html
---
<style>
    #news,
    #education,
    #experience,
    #publications,
    #projects,
    #blog,
    #talks,
    #reports,
    #awards,
    #services {
        scroll-margin-top: var(--home-nav-offset, 80px);
    }

      /* ===== News Scroll Box ===== */
    .news-box {
      max-height: 220px;
      overflow-y: auto;
      padding: 10px 14px;
      background: #f7f9fb;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .news-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .news-list li {
      margin-bottom: 10px;
      line-height: 1.5;
    }

    .news-date {
      display: inline-block;
      min-width: 70px;
      font-weight: 400;        /* 不加粗 */
      color: var(--home-accent);          /* 蓝色强调 */
    }

    .publication-card {
        display: flex;
        align-items: center;
        padding: 3px;
        border: 1.5px solid #e1e5e9;
        border-radius: 8px;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 20px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        color: var(--home-muted);
    }
    .publication-card > div > strong,
    .publication-card > div > div > strong {
        color: var(--home-ink);
    }
    .publication-card i {
        color: var(--home-muted);
    }

    .pub-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35em;
        margin-left: 8px;
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 650;
        line-height: 1.4;
        letter-spacing: 0.01em;
        vertical-align: middle;
        white-space: nowrap;
        border: 1px solid transparent;
        background: rgba(105, 115, 134, 0.08);
        color: var(--home-muted);
    }

    .pub-badge::before {
        content: "";
        width: 0.45em;
        height: 0.45em;
        border-radius: 999px;
        background: currentColor;
        opacity: 0.75;
    }

    .pub-badge--oral {
        margin-left: 4px;
        vertical-align: 2px;
        color: var(--home-accent);
        background: rgba(49, 93, 128, 0.08);
        border-color: rgba(49, 93, 128, 0.25);
    }
    .publication-card:hover {

        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .publication-card.featured {
        border-color: #cbd5df;       /* 浅蓝灰边框 */
        background: #f7f9fb;         /* 浅蓝灰背景 */
        box-shadow: 0 4px 8px rgba(49, 93, 128, 0.12); /* 更柔和的初始阴影 */
        z-index: 10;
    }

    .publication-card.featured:hover {
        box-shadow: 0 8px 16px rgba(49, 93, 128, 0.22);
    }

    /*.publication-card.non-featured {*/
        /*display: flex;  默认隐藏非精选出版物 */
    /*}*/

    .pub-authors,
    .pub-venue,
    .pub-resource-links em {
        font-style: normal;
    }

    .pub-authors strong {
        color: var(--home-highlight);
        font-weight: 700;
    }

    .pub-resource-links {
        display: inline-block;
        max-width: 100%;
    }

    .pub-media-link-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        vertical-align: middle;
        white-space: nowrap;
    }

    .page__content .pub-media-link-logo {
        display: block;
        flex: 0 0 16px;
        width: 16px;
        height: 16px;
        margin: 0;
        border: 0;
        border-radius: 3px;
        object-fit: contain;
    }

    .page__content a:hover .pub-media-link-logo {
        box-shadow: none;
    }

    .pub-resource-links a {
        display: inline-block;
        color: var(--home-highlight) !important;
    }

    .publication-title-star { display: inline-block; width: .9em; height: .9em; margin-right: .35em; fill: #dda500; vertical-align: -.04em; }

    .pub-resource-links a + a::before {
        content: "\00b7";
        display: inline-block;
        margin: 0 6px;
        color: var(--home-muted);
        font-style: normal;
        text-decoration: none;
    }

    .pub-tech-report {
        display: inline-block;
        padding: 0 5px;
        border: 1px solid #ead6d9;
        border-radius: 3px;
        background: #f9eff0;
        color: var(--home-highlight);
        font-weight: 600;
        font-style: normal;
        line-height: 1.25;
        white-space: nowrap;
    }

    .publication-card .pub-venue,
    .project-card .pub-venue {
        color: var(--home-accent);
    }

    /* Projects cards: keep styles independent from publications */
    .project-card {
        display: flex;
        align-items: center;
        padding: 3px;
        border: 1.5px solid #e1e5e9;
        border-radius: 8px;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 20px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        color: var(--home-muted);
    }

    .project-card > div > strong,
    .project-card > div > div > strong {
        color: var(--home-ink);
    }

    .project-card i {
        color: var(--home-muted);
    }

    .project-card:hover {
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

      @media (max-width: 720px) {
        .publication-card,
        .project-card {
            align-items: stretch;
            padding: 8px;
        }

        .publication-card > div,
        .project-card > div {
            flex-direction: column;
            align-items: stretch !important;
            width: 100%;
        }

        .publication-card .pub-media-rotator,
        .project-card .pub-media-rotator {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 9;
            margin-right: 0 !important;
            margin-bottom: 12px;
        }

        .publication-card .pub-media-rotator > img,
        .project-card .pub-media-rotator > img {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain;
        }

        .publication-card strong,
        .project-card strong {
            line-height: 1.35;
        }
    }


</style>


<style>
        div.markdown-body a,a {
            text-decoration: none !important;
            color: var(--home-accent);
            transition: all 0.3s ease; /* 平滑过渡效果 */
        }
        div.markdown-body a:hover, a:hover {
            color: var(--home-accent-hover);            /* 悬浮时变深一点的颜色 */
            text-decoration: underline; /* 加上悬浮时的下划线 */
        }
</style>


{% include home-profile.html %}

News
---------------
<div class="news-box">
  <ul class="news-list">
    {% for item in site.data.news %}<li><span class="news-date"><em>{{ item.date }}</em></span> 🎉🎉 {{ item.text }}</li>{% endfor %}
  </ul>
</div>

{% include experience-timeline.html %}

{% include home-publications.html %}
<script src="assets/js/pub_media_rotator.js"></script>


Projects
--------
<div class="project-card" data-category="project">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/wowpage-clouds.jpg" alt="WowPage — clouds over a green field" style="width: 320px; height: 180px; object-fit: cover; object-position: center 60%; display: block; margin: 0 auto;">
    </div>
    <div class="pub-card-body">
      <p class="pub-card-title">WowPage</p>
      <p class="pub-authors">
        <strong>Weidong TANG</strong>,
        Yue SU.
      </p>
      <p class="pub-description">In collaboration with Yue SU, I refined and improved his original homepage template. A clean standalone template version is coming soon.</p>
      <div class="pub-card-meta">
        <b><i class="pub-venue">Project &nbsp;</i></b>
        <span class="pub-resource-links"><a href="https://github.com/WD7ang/WowPage"><em>GitHub</em></a><a href="https://www.xiaohongshu.com/discovery/item/69feb95d000000003502e8b7?source=webshare&amp;xhsshare=pc_web&amp;xsec_token=ABPOGv4BUnujNdJXL2rltJQVQ8AGjnq0xVWDGPPDKSj6c=&amp;xsec_source=pc_share" target="_blank" rel="noopener noreferrer"><em>RedNote</em></a></span>
      </div>
    </div>
  </div>
</div>


{% include blog-bookshelf.html %}

<section class="home-talks" aria-labelledby="talks">
  <h2 id="talks">Talks</h2>
  <p class="section-empty">To be updated.</p>
</section>

<section class="home-reports" aria-labelledby="reports">
  <h2 id="reports">Reports</h2>
  <ul class="report-list" role="list">
    <li class="report-featured">
      <span class="report-logo-crop">
        <img class="report-logo" src="images/qilu-evening-news-logo.png" alt="Qilu Evening News logo" width="108" height="60" loading="lazy" decoding="async">
      </span>
      <div class="report-details">
        <a class="report-title" lang="zh" href="https://m.ql1d.com/new/general/28245962" target="_blank" rel="noopener noreferrer">从科研博主到AI公司首席科学家：一名西电00后人工智能逐梦路</a>
        <span class="report-meta" lang="en">Interview by Qilu Evening News, a Shandong Provincial Media Outlet</span>
      </div>
      <time class="report-date" datetime="2026-10-25">25/10/2026</time>
    </li>
    <li>
      <img class="report-logo" src="images/next-star-logo.png" alt="Next Star logo" width="108" height="60" loading="lazy" decoding="async">
      <div class="report-details">
        <a class="report-title" lang="zh" href="https://mp.weixin.qq.com/s/K679PCKWRSvY5e1kvBp9_g" target="_blank" rel="noopener noreferrer">2026“创业之星”Next Star 一等奖</a>
        <span class="report-meta" lang="en">InfRec Wins First Prize in the Domestic Industry Semifinals and Advances to the Global Finals</span>
      </div>
      <time class="report-date" datetime="2026-11-04">04/11/2026</time>
    </li>
    <li>
      <img class="report-logo" src="images/271-education-logo.png" alt="271 Education Group logo" width="108" height="60" loading="lazy" decoding="async">
      <div class="report-details">
        <a class="report-title" lang="zh" href="https://mp.weixin.qq.com/s/brsPcjyKhElxAOQiW70RpQ" target="_blank" rel="noopener noreferrer">昌乐二中|271教育  汤维栋：纵有疾风起，人生不言弃</a>
        <span class="report-meta" lang="en">Outstanding Alumnus Interview</span>
      </div>
      <time class="report-date" datetime="2026-11-04">04/11/2026</time>
    </li>
  </ul>
</section>

Awards
--------
<ul class="award-list">
  <li class="award-row">
    <img class="award-logo award-logo--byd" src="{{ '/images/byd-logo.png' | relative_url }}" alt="BYD logo" width="108" height="60" loading="lazy" decoding="async">
    <div class="award-details">
      <span class="award-title">BYD Scholarship</span>
      <span class="award-meta">Xidian University · Sponsored by BYD</span>
    </div>
    <span class="award-date">2026</span>
  </li>
  <li class="award-row">
    <img class="award-logo" src="{{ '/images/XDU.png' | relative_url }}" alt="Xidian University logo" width="108" height="60" loading="lazy" decoding="async">
    <div class="award-details">
      <span class="award-title">Academic Scholarship</span>
      <span class="award-meta">Xidian University</span>
    </div>
    <span class="award-date">2024 &amp; 2025 &amp; 2026</span>
  </li>
</ul>

Services
--------
<ul class="service-list" role="list">
  <li class="service-row">
    <img class="service-logo" src="{{ '/images/xidian-admissions-group.png' | relative_url }}" alt="Xidian admissions group logo" width="108" height="60" loading="lazy" decoding="async">
    <div class="service-details">
      <span class="service-title">Leader</span>
      <span class="service-meta">Xidian Graduate Admissions Experience-Sharing Group (3,000 members)</span>
    </div>
    <span class="service-date">10/2026 – Present</span>
  </li>
  <li class="service-row">
    <img class="service-logo" src="{{ '/images/xidian-inspur-club.png' | relative_url }}" alt="Xidian–Inspur Club logo" width="108" height="60" loading="lazy" decoding="async">
    <div class="service-details">
      <span class="service-title">AI Team Lead</span>
      <span class="service-meta">Xidian–Inspur Club</span>
    </div>
    <span class="service-date">06/2025 – 05/2026</span>
  </li>
  <li class="service-row">
    <a class="service-logo-link" href="{{ '/images/reviewer-accept-cloud.png' | relative_url }}" target="_blank" rel="noopener noreferrer" aria-label="View full-size ACCEPT word cloud">
      <img class="service-logo" src="{{ '/images/reviewer-accept-cloud.png' | relative_url }}" alt="Conference and journal word cloud centered on ACCEPT" width="108" height="60" loading="lazy" decoding="async">
    </a>
    <div class="service-details">
      <span class="service-title">Reviewer</span>
      <span class="service-meta">ICIC 2026, PRCV (2025, 2026), ICLR 2027</span>
    </div>
    <span class="service-date">Present</span>
  </li>
</ul>
