---
permalink: /
layout: single
homepage_palette: classic-blue
author_profile: true
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
    #awards,
    #talks,
    #services {
        scroll-margin-top: 80px;
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
      color: #315d80;          /* 蓝色强调 */
    }

    .experience-card {
        display: flex;
        align-items: flex-start;
        background: #f7f9fb;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 0px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .experience-card:hover {

        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    .experience-logo {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
        margin-right: 20px;
        border-radius: 0;
        border: 0;
        background: transparent;
        box-shadow: none;
        object-fit: contain;
    }
    .experience-logo--teleai {
        /* Clip the exterior white margin while preserving the original logo pixels. */
        clip-path: polygon(2.5% 0%, 95.5% 0%, 95.5% 56.75%, 93.5% 70.75%, 91% 75.75%, 91% 77.25%, 85% 84.75%, 80.5% 88.25%, 59.5% 100%, 38.5% 100%, 25% 92.75%, 14% 85.75%, 9% 80.25%, 5% 72.25%, 3.5% 67.25%, 2.5% 57.25%);
    }
    .experience-info {
        flex: 1;
        min-width: 0;
        font-family: "Segoe UI", sans-serif;
    }
    .experience-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px 20px;
    }
    .experience-date {
        flex-shrink: 0;
        color: #697386;
        font-size: 0.9em;
        white-space: nowrap;
    }
    .experience-role {
        margin-top: 3px;
        font-weight: 500;
    }
    .experience-description {
        margin-top: 3px;
    }
    .experience-info strong {
        font-size: 1.1em;
    }
    .experience-info a {
        text-decoration: none;
        color: #315d80;
    }
    .experience-container {
        display: flex;
        flex-direction: column; /* 让子元素垂直排列，一行一个 */
        gap: 20px; /* 保持每个卡片之间的间距 */
    }
    .experience-card {
        box-sizing: border-box;
    }
    @media (max-width: 600px) {
        .experience-card { padding: 12px; }
        .experience-logo { width: 40px; height: 40px; margin-right: 12px; }
        .experience-header { flex-wrap: wrap; gap: 2px 12px; }
        .experience-date { margin-left: auto; }
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

        color: #697386; /* 正文整体更浅 */
    }
    .publication-card > div > strong,
    .publication-card > div > div > strong {
        color: #273444;
    }
    .publication-card i {
        color: #697386;
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
        color: #697386;
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
        color: #315d80;
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

    .pub-button-container {
        display: flex;
        gap: 10px;
        margin: 20px 0;
        flex-wrap: wrap;
    }

    .pub-button {
        background-color: #f7f9fb;
        border: 1px solid #cbd5df;
        border-radius: 20px;
        padding: 8px 16px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .pub-button:hover {
        background-color: #e1e5e9;
    }

    .pub-button.active {
        background-color: #315d80;
        color: white;
        border-color: #315d80;
    }

      .publication-view[hidden] {
        display: none !important;
    }

      #full-publications {
        max-height: 380px;
        overflow-y: auto;
        padding-right: 8px;
        margin-bottom: 24px;
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: rgba(49, 93, 128, 0.45) rgba(247, 249, 251, 0.7);
    }

    #full-publications::-webkit-scrollbar {
        width: 8px;
    }

    #full-publications::-webkit-scrollbar-track {
        background: rgba(247, 249, 251, 0.7);
        border-radius: 999px;
    }

    #full-publications::-webkit-scrollbar-thumb {
        background: rgba(49, 93, 128, 0.45);
        border-radius: 999px;
    }

    #full-publications::-webkit-scrollbar-thumb:hover {
        background: rgba(49, 93, 128, 0.65);
    }

    .full-publication-list {
        list-style: none;
        margin: 0;
        padding: 0;
        color: #697386;
        font-size: 15px;
        line-height: 1.55;
    }

    .full-publication-list .pub-list-row {
        display: grid;
        grid-template-columns: 106px minmax(0, 1fr);
        align-items: center;
        gap: 12px;
        margin-bottom: 5px;
        padding: 7px 12px;
        border-left: 3px solid #234864;
        background: linear-gradient(90deg, rgba(255, 255, 255, .64), rgba(255, 255, 255, .12));
    }

    .pub-list-venue {
        color: #697386;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: .02em;
    }

    .pub-list-details {
        min-width: 0;
        overflow-wrap: anywhere;
    }

    .full-publication-list .pub-list-title {
        display: block;
        color: #273444;
        font-size: 15px;
        font-weight: 700;
        line-height: 1.45;
        text-decoration: none !important;
    }

      .pub-list-authors {
        display: block;
        color: #697386;
        font-size: 13px;
        font-style: italic;
    }

    .pub-list-authors > strong {
        color: #273444;
    }

      .pub-list-authors a strong {
        color: inherit;
    }

    .pub-list-note {
        color: #315d80;
        font-style: italic;
        font-weight: 650;
    }

    .pub-list-links {
        display: flex;
        flex-wrap: wrap;
        gap: 2px 8px;
    }

    .pub-list-links a {
        color: #315d80 !important;
        font-weight: 600;
    }

      .pub-list-links a:hover {
        color: #234864 !important;
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

        color: #697386;
    }

    .project-card > div > strong,
    .project-card > div > div > strong {
        color: #273444;
    }

    .project-card i {
        color: #697386;
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

        .full-publication-list .pub-list-row {
            grid-template-columns: 76px minmax(0, 1fr);
            gap: 10px;
            padding: 8px 10px;
        }
    }


</style>


<style>
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap');
        body {
            background-color:	 #FFFFFF;
            font-family: 'Arial Rounded MT Bold', 'Verdana', sans-serif;
            font-size: 15px;
        }
        .main-heading {
            font-family: 'Permanent Marker', cursive;
            text-align: center;
            color: #315d80;
        }
        div.markdown-body a,a {
            text-decoration: none !important;
            color: #315d80;
            transition: all 0.3s ease; /* 平滑过渡效果 */
        }
        div.markdown-body a:hover, a:hover {
            color: #234864;            /* 悬浮时变深一点的颜色 */
            text-decoration: underline; /* 加上悬浮时的下划线 */
        }
</style>


<h1 class="main-heading">Hi there <img src="images/Hi.gif" width="40px"> Welcome to my Homepage!</h1>



Hi! I am a senior (4th-year) undergraduate student at Xidian University.

My research interests lie at the intersection of natural language processing and computer vision, with a particular focus on **multimodal representation learning**. My long-term goal is to understand how human-like intelligence can emerge and to develop unified models that connect the physical world with human cognition.

I enjoy exploring new research directions and collaborating with researchers across disciplines. In my spare time, I also enjoy exploring Buddhist philosophy. Feel free to reach out if you are interested in research collaborations or other opportunities.

One day, I'll become a chef and open my own restaurant; if you have my contact info, you'll get a discount. 😏

<div class="research-interests" role="group" aria-labelledby="research-interests-label">
  <span class="research-caption" id="research-interests-label">Research interests</span>
  <div class="research-tags">
    <span class="research-topic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 1M7 7l4 11m6-10-6 10"/><circle cx="7" cy="7" r="3"/><circle cx="17" cy="8" r="3"/><circle cx="11" cy="18" r="3"/></svg>MLLM</span>
    <span class="research-topic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7a8 8 0 1 0 0 10M20 3v5h-5"/></svg>RSI</span>
    <span class="research-topic"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M8 12h1m6 0h1m-8 4h8"/></svg>Agentic Robot</span>
    <span class="research-topic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 3-8 11h6l-1 7L20 9h-7l1-6Z"/></svg>Efficient AI</span>
    <span class="research-topic"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-3-13 6 4-3 1-1 3Z"/></svg>HCI</span>
    <span class="research-topic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12h4l3-7 4 14 3-10 2 3h4"/></svg>BCI</span>
  </div>
</div>

News
---------------
<div class="news-box">
  <ul class="news-list">
    {% for item in site.data.news %}<li><span class="news-date"><em>{{ item.date }}</em></span> 🎉🎉 {{ item.text }}</li>{% endfor %}
  </ul>
</div>

Education
--------------

<div class="education-container">
  <div class="experience-card">
      <img src="images/XDU.png" alt="Xi'dian logo" class="experience-logo">
      <div class="experience-info">
          <div class="experience-header">
              <strong>Xidian University</strong>
              <span class="experience-date">2023.09 - Present</span>
          </div>
          <div class="experience-role">Undergraduate Student</div>
          <div class="experience-description">B.E. at <a href="https://ste.xidian.edu.cn/">School of Telecommunication Engineering</a>; advised by <a href="https://scholar.google.com/citations?user=k33uf2RE8nsC&hl=zh-CN&oi=ao">Xiumei Wang</a></div>
      </div>
  </div>
</div>

Experience
--------------

<div class="experience-container">
  <div class="experience-card">
      <img src="images/InfRec-transparent.png" alt="InfRec cardinal logo" class="experience-logo">
      <div class="experience-info">
          <div class="experience-header">
              <strong><a href="https://www.cardinal-agi.com/">Cardinal AI Lab, InfRec</a></strong>
              <span class="experience-date">2026.07 - Present</span>
          </div>
          <div class="experience-role">Chief Research Officer (Founding Member)</div>
          <div class="experience-description">Leading research on recursive self-improvement and long-horizon world interaction.</div>
      </div>
  </div>

  <div class="experience-card">
      <img src="images/Alibaba.png" alt="Alibaba logo" class="experience-logo">
      <div class="experience-info">
          <div class="experience-header">
              <strong>Alibaba Group</strong>
              <span class="experience-date">2026.05 - 2026.07</span>
          </div>
          <div class="experience-role">MLLM Research Intern</div>
          <div class="experience-description">Research on post-training, visual-semantic alignment, and large-scale e-commerce retrieval.</div>
      </div>
  </div>



  <div class="experience-card">
      <img src="images/TeleAI.png" alt="TeleAI logo" class="experience-logo experience-logo--teleai">
      <div class="experience-info">
          <div class="experience-header">
              <strong>Institute of Artificial Intelligence of China Telecom</strong>
              <span class="experience-date">2026.01 - 2026.03</span>
          </div>
          <div class="experience-role">LLM Research Intern</div>
          <div class="experience-description">AI infrastructure for LLM training and inference on Huawei Ascend 910B.</div>
      </div>
  </div>

  <div class="experience-card">
      <img src="images/NUS-crest.png" alt="NUS crest" class="experience-logo" width="60" height="60">
      <div class="experience-info">
          <div class="experience-header">
              <strong>National University of Singapore</strong>
              <span class="experience-date">2024.10 - 2025.10</span>
          </div>
          <div class="experience-role">Research Assistant · <a href="https://ai.comp.nus.edu.sg/">HPC-AI Lab</a></div>
          <div class="experience-description">Advised by <a href="https://www.comp.nus.edu.sg/~youy/">Yang You</a>, <a href="https://wangbo-zhao.github.io/">Wangbo Zhao</a> and <a href="https://lancezpf.github.io/">Pengfei Zhou</a></div>
      </div>
  </div>
</div>


Publications
--------------
<button class="pub-button active" onclick="filterPublications(event, 'all')">Core Publications</button>
<button class="pub-button" onclick="filterPublications(event, 'list')">Full Publications List</button>

(* equal contribution · &dagger; corresponding author · &Dagger; project leader)

<div id="core-publications" class="publication-view" data-publication-view="core">
{% assign trinity = site.data.cv_publications | where: 'title', 'The Trinity: Capability-Driven Recursive Self-Improvement for Multimodal Agents' | first %}
<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/trinity-intro.png" alt="The Trinity overview: Creator, Explorer, and Evolver co-evolve worlds and agent capabilities" loading="lazy" width="3001" height="1423" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong><a href="{{ trinity.title_url }}">{{ trinity.title }}</a></strong><br>
      <i style="font-size: 13px;">{{ trinity.authors_html | replace: 'W. Tang', 'Weidong Tang' }}</i><br>
      We introduce a capability-driven framework that couples world generation with agent harness evolution, enabling multimodal agents to recursively improve and transfer learned capabilities to unseen tasks.
      <br>
      <b><i style="color:#315d80;">{{ trinity.venue }} &nbsp;</i></b>
      {% for link in trinity.links %}{% unless link.url == 'https://huggingface.co/papers/2610.36077' %}<a href="{{ link.url }}"><em>[{{ link.label }}]</em></a> {% endunless %}{% endfor %}
    </div>
  </div>
</div>

<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/GroupToM.png" alt="wog" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>GroupToM-Bench: Benchmarking Group Theory of Mind and Nonlinear Social Emergence in MLLMs</strong><br>
      <i style="font-size: 13px;">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>,
        Jierui Li,
        Yueling Hou,
        Zihan Mei,
        Can Zhang,
        Xinyan Wan,
        <a href="https://jerryliang24.github.io/" target="_blank">Zhiyuan Liang</a>,
        <a href="https://lancezpf.github.io/" target="_blank">Pengfei Zhou&dagger;</a>,
        <a href="https://www.comp.nus.edu.sg/~youy/" target="_blank">Yang You</a>,
        <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao&dagger;</a>
      </i><br>
      We propose GroupToM-Bench and show that current models fail at nonlinear group reasoning despite strong individual-level ToM, exposing a clear group cognitive gap.
      <br>
      <b><i style="color:#315d80;">ACL 2026 &nbsp;
      </i></b>
      <a href="images/GroupToM_poster.pdf"><em>[Poster]</em></a>
      <a href="https://aclanthology.org/2026.acl-long.1859/"><em>[Paper]</em></a>
      <a href="https://huggingface.co/datasets/Twwwd/GroupToM-Bench"><em>[Dataset]</em></a>
    </div>
  </div>
</div>


<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/MagicBench.png" alt="wog" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>MagicBench: Diagnosing Visual Agency Loss and Semantic Dependency in Multimodal LLMs</strong><br>
      <i style="font-size: 13px;">
        Tang Da Huang,
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang&Dagger;</strong></a>,
        Wen Qi Xu,
        Xianpeng Guo&dagger;
      </i><br>
      The authors introduce MagicBench, a video dataset of magic tricks, to test if Multimodal LLMs actually rely on visual physics or if they are overly dependent on language narratives (which, in magic tricks, are deliberately deceptive).
      <br>
      <b><i style="color:#315d80;">ACL 2026 &nbsp;
      </i></b>
      <a href="https://aclanthology.org/2026.acl-long.1314/"><em>[Paper]</em></a>
      <a href="https://github.com/Ink-Dawn/MagicBench"><em>[code]</em></a>
    </div>
  </div>
</div>


<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/RDS.png" alt="wog" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>Efficient Video Object Segmentation and Tracking with Recurrent Dynamic Submodel</strong><br>
      <i style="font-size: 13px;">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>,
        <a href="https://jerryliang24.github.io/" target="_blank">Zhiyuan Liang</a>,
        Xinyan Wan,
        <a href="https://scholar.google.com.hk/citations?user=W9HbDoYAAAAJ&hl=en" target="_blank">Chen Zhu</a>,
        <a href="https://scholar.google.com.hk/citations?user=qNWDwOcAAAAJ&hl=en" target="_blank">Zhaopan Xu</a>,
        <a href="https://lancezpf.github.io/" target="_blank">Pengfei Zhou</a>,
        Yan Song,
        <a href="https://www.comp.nus.edu.sg/~youy/" target="_blank">Yang You</a>,
        <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao&dagger;</a>
      </i><br>
      Proposed a Recurrent Dynamic Submodel for efficient Video Object Segmentation and Tracking. By integrating temporal-prior-guided global dynamic routing and Importance-aware LoRA, it achieves an optimal trade-off between performance and speed using minimal trainable parameters and training data.
      <br>
      <b><i style="color:#315d80;">CVPR 2026 &nbsp;
      </i></b>
      <a href="images/cvpr_poster.pdf"><em>[Poster]</em></a>
      <a href="https://openaccess.thecvf.com/content/CVPR2026/html/Tang_Efficient_Video_Object_Segmentation_and_Tracking_with_Recurrent_Dynamic_Submodel_CVPR_2026_paper.html"><em>[Paper]</em></a>
    </div>
  </div>
</div>


<div class="publication-card" data-category="all">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/var-scaling.png" alt="wog" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>Inference-Time Scaling for Visual AutoRegressive Modeling by Searching Representative Samples</strong><br>
      <i style="font-size: 13px;">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>,
        Xinyan Wan,
        Siyu Li,
        <a href="https://scholar.google.com/citations?user=k33uf2RE8nsC&hl=zh-CN&oi=ao" target="_blank">Xiumei Wang&dagger;</a>
      </i><br>
      Explored inference-time scaling in discrete spaces by mapping them to continuous spaces to obtain density distributions, thereby optimizing the sampling of early coarse-scale features.
      <br>
      <b><i style="color:#315d80;">PRCV 2025 &nbsp;
      </i></b>
      <a href="images/var_poster.png"><em>[Poster]</em></a>
      <a href="https://arxiv.org/pdf/2601.07293"><em>[arXiv]</em></a>
      <a href="https://github.com/WD7ang/VAR-Scaling"><em>[code]</em></a>
    </div>
  </div>
</div>


</div>
<div id="full-publications" class="publication-view" data-publication-view="list" hidden>
  <ul class="full-publication-list" role="list">
    {% for publication in site.data.cv_publications %}
    <li class="pub-list-row">
      <span class="pub-list-venue" title="{{ publication.venue | escape }}">{{ publication.venue | replace: 'arXiv preprint,', 'arXiv' | replace: 'IEEE Transactions on Network Science and Engineering,', 'IEEE TNSE' }}</span>
      <div class="pub-list-details">
        <a class="pub-list-title" href="{{ publication.title_url }}">{{ publication.title }}</a>
        <span class="pub-list-authors">{{ publication.authors_html | replace: 'W. Tang', 'Weidong Tang' }}</span>
        <span class="pub-list-links">{% for link in publication.links %}{% unless link.url == 'https://huggingface.co/papers/2610.36077' %}<a href="{{ link.url }}">[{{ link.label }}]</a>{% endunless %}{% endfor %}</span>
      </div>
    </li>
    {% endfor %}
  </ul>
</div>

<script src="assets/js/show_publications.js"></script>
<script src="assets/js/pub_media_rotator.js"></script>


Projects
--------
<div class="project-card" data-category="project">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/wowpage-clouds.jpg" alt="WowPage — clouds over a green field" style="width: 320px; height: 180px; object-fit: cover; object-position: center 60%; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>WowPage</strong><br>
      <i style="font-size: 13px;">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>,
        <a href="https://selen-suyue.github.io/" target="_blank"><strong>Yue Su</strong></a>.
      </i><br>
      In collaboration with Yue Su, I refined and improved his original homepage template. A clean standalone template version is coming soon.
      <br>
      <b><i style="color:#315d80;">Project &nbsp;</i></b>
      <a href="https://github.com/WD7ang/WowPage"><em>[code]</em></a>
      <a href="https://www.xiaohongshu.com/discovery/item/69feb95d000000003502e8b7?source=webshare&amp;xhsshare=pc_web&amp;xsec_token=ABPOGv4BUnujNdJXL2rltJQVQ8AGjnq0xVWDGPPDKSj6c=&amp;xsec_source=pc_share" target="_blank" rel="noopener noreferrer"><em>[RedNote]</em></a>
    </div>
  </div>
</div>


{% include blog-bookshelf.html %}

Awards
--------
<ul class="award-list">
  <li class="award-row">
    <span class="award-date">2025 &amp; 2026</span>
    <div class="award-details">
      <span class="award-title">Second-Class Academic Scholarship</span>
      <span class="award-meta">Xidian University · Ranked 5/99 (2025)</span>
    </div>
  </li>
</ul>



Talks
--------

Services
--------
<ul class="service-list" role="list">
  <li class="service-row">
    <span class="service-date">2026.10 – Present</span>
    <div class="service-details">
      <span class="service-title">Coordinator</span>
      <span class="service-meta service-meta--with-avatar">
        <img class="service-avatar" src="images/xidian-admissions-group.png" alt="Xidian admissions group avatar" width="15" height="15" loading="lazy" decoding="async">
        <span>Xidian Graduate Admissions Experience-Sharing Group (3,000 members)</span>
      </span>
    </div>
  </li>
  <li class="service-row">
    <span class="service-date">2025.06 – Present</span>
    <div class="service-details">
      <span class="service-title">AI Team Lead</span>
      <span class="service-meta">🌊Xidian–Inspur Club</span>
    </div>
  </li>
  <li class="service-row">
    <span class="service-date">Present</span>
    <div class="service-details">
      <span class="service-title">Reviewer</span>
      <span class="service-meta">ICIC 2026, PRCV (2025, 2026), ICLR 2027</span>
    </div>
  </li>
</ul>
