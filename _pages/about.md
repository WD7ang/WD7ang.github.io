---
permalink: /
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<style>
    #news,
    #experience,
    #publications,
    #projects,
    #awards,
    #talks {
        scroll-margin-top: 80px;
    }
  
      /* ===== News Scroll Box ===== */
    .news-box {
      max-height: 220px;
      overflow-y: auto;
      padding: 10px 14px;
      background: #f7f7f7;
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
      color: #ca6f6f;          /* 浅粉色 */
    }
  
    .experience-card {
        display: flex;
        align-items: center;
        background: #f9f9f9;
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
        margin-right: 20px;
        border-radius: 8px;
        object-fit: contain;
    }
    .experience-info {
        font-family: "Segoe UI", sans-serif;
    }
    .experience-info strong {
        font-size: 1.1em;
    }
    .experience-info a {
        text-decoration: none;
        color: #ca6f6f;
    }
    .experience-container {
        display: flex;
        flex-direction: column; /* 让子元素垂直排列，一行一个 */
        gap: 20px; /* 保持每个卡片之间的间距 */
    }
    .experience-card {
        box-sizing: border-box;
    }
    .publication-card {
        display: flex;
        align-items: center;
        padding: 3px;
        border: 1.5px solid #ddd;
        border-radius: 8px;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 20px; 
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        color: #5f6368; /* 正文整体更浅 */
    }
    .publication-card > div > strong,
    .publication-card > div > div > strong {
        color: #202124;
    }
    .publication-card i {
        color: #6b7280;
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
        background: rgba(107, 114, 128, 0.08);
        color: #6b7280;
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
        color: #4c6a94;
        background: rgba(131, 161, 199, 0.14);
        border-color: rgba(131, 161, 199, 0.35);
    }
    .publication-card:hover {
       
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .publication-card.featured {
        border-color: #f5bba7;       /* 更浅的哈密瓜色边框 */
        background: #fef5f1;         /* 非常浅的哈密瓜色背景 */
        box-shadow: 0 4px 8px rgba(242, 166, 120, 0.2); /* 更柔和的初始阴影 */
        z-index: 10;
    }

    .publication-card.featured:hover {
        box-shadow: 0 8px 16px rgba(242, 166, 120, 0.4); 
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
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 8px 16px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .pub-button:hover {
        background-color: #e0e0e0;
    }
    
    .pub-button.active {
        background-color: #ca6f6f;
        color: white;
        border-color: #ca6f6f;
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
        scrollbar-color: rgba(185, 95, 61, 0.45) rgba(254, 245, 241, 0.7);
    }

    #full-publications::-webkit-scrollbar {
        width: 8px;
    }

    #full-publications::-webkit-scrollbar-track {
        background: rgba(254, 245, 241, 0.7);
        border-radius: 999px;
    }

    #full-publications::-webkit-scrollbar-thumb {
        background: rgba(185, 95, 61, 0.45);
        border-radius: 999px;
    }

    #full-publications::-webkit-scrollbar-thumb:hover {
        background: rgba(185, 95, 61, 0.65);
    }
  
    .full-publication-list {
        margin: 0;
        padding-left: 1.25rem;
        color: #5f6368;
        font-size: 15px;
        line-height: 1.55;
    }

    .full-publication-list li {
        margin-bottom: 14px;
    }

    .pub-list-badge {
        display: inline-block;
        margin-right: 6px;
        padding: 2px 8px;
        border-radius: 999px;
        border: 1px solid rgba(245, 187, 167, 0.75);
        background: #fef5f1;
        color: #b95f3d;
        font-size: 11px;
        font-weight: 650;
        line-height: 1.35;
        vertical-align: 1px;
        white-space: nowrap;
    }

    .full-publication-list .pub-list-title {
        color: #202124;
        font-size: 15px;
        font-weight: 700;
        line-height: 1.45;
        text-decoration: none !important;
    }

      .pub-list-authors {
        color: #6b7280;
        font-size: 13px;
        font-style: italic;
    }

    .pub-list-authors > strong {
        color: #202124;
    }

      .pub-list-authors a strong {
        color: inherit;
    }

    .pub-list-note {
        color: #c7774c;
        font-style: italic;
        font-weight: 650;
    }

    .pub-list-links {
        white-space: nowrap;
    }

    .pub-list-links a {
        margin-left: 4px;
        color: #c7774c !important;
        font-weight: 600;
    }

      .pub-list-links a:hover {
        color: #b65f36 !important;
    }

    /* Projects cards: keep styles independent from publications */
    .project-card {
        display: flex;
        align-items: center;
        padding: 3px;
        border: 1.5px solid #ddd;
        border-radius: 8px;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 20px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        color: #5f6368;
    }

    .project-card > div > strong,
    .project-card > div > div > strong {
        color: #202124;
    }

    .project-card i {
        color: #6b7280;
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

        .full-publication-list {
            padding-left: 1rem;
        }

        .pub-list-badge {
            margin-bottom: 4px;
        }
    }

  
</style>
<html> 
<head>
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
            color: #ca6f6f;
        }
        div.markdown-body a,a {
            text-decoration: none !important;
            color: #ca6f6f;
            transition: all 0.3s ease; /* 平滑过渡效果 */
        }
        div.markdown-body a:hover, a:hover {
            color: #c71585;            /* 悬浮时变深一点的颜色 */
            text-decoration: underline; /* 加上悬浮时的下划线 */
        }
    </style>
</head>
<body>
<h1 class="main-heading">Hi there <img src="images/Hi.gif" width="40px"> Welcome to my Homepage!</h1>
</body>
</html>

Hi! I am a junior (3rd-year) undergraduate student at Xidian University. 

My research interests include **Multimodal learning**, **Efficient AI** and **Human-centric AI** and other emerging areas in AI. 
My methodological preference is for approaches that are simple, clear, and extensible. I enjoy exploring diverse research directions and collaborating with researchers across different fields.


Feel free to reach out if you are interested in collaboration or potential opportunities.

News
---------------
<div class="news-box">
  <ul class="news-list">
    <li><span class="news-date"><em>2026.07</em></span> 🎉🎉 I became a founding member of a startup.</li>
    <li><span class="news-date"><em>2026.05</em></span> 🎉🎉 I begin my internship at Alibaba Group.</li>
    <li><span class="news-date"><em>2026.04</em></span> 🎉🎉 Two papers accepted to ACL 2026.</li>
    <li><span class="news-date"><em>2026.02</em></span> 🎉🎉 One paper accepted to CVPR 2026.</li>
    <li><span class="news-date"><em>2026.01</em></span> 🎉🎉 I begin my internship at TeleAI.</li>
    <li><span class="news-date"><em>2025.08</em></span> 🎉🎉 One paper accepted to PRCV 2025.</li>
    <li><span class="news-date"><em>2025.07</em></span> 🎉🎉 One paper accepted to ICCV 2025.</li>
    <li><span class="news-date"><em>2024.10</em></span> 🎉🎉 I joined the HPC-AI Lab at NUS as a Research Assistant.</li>
  </ul>
</div>

Experience
--------------

<div class="experience-container">
  <div class="experience-card">
      <img src="images/Alibaba.png" alt="Alibaba logo" class="experience-logo">
      <div class="experience-info">
          <strong>Alibaba Group</strong><br>
          <em>2026.05 - 2026.07</em><br>
          Start My Journey in MLLM
      </div>
  </div>


  
  <div class="experience-card">
      <img src="images/TeleAI.png" alt="TeleAI logo" class="experience-logo">
      <div class="experience-info">
          <strong>Institute of Artificial Intelligence of China Telecom</strong><br>
          <em>2026.01 - 2026.03</em><br>
          Start My Journey in LLM
      </div>
  </div>

  <div class="experience-card">
      <img src="images/NUS.png" alt="NUS logo" class="experience-logo">
      <div class="experience-info">
          <strong>National University of Singapore</strong><br>
          <em>2024.10 - 2025.10</em><br>
          Research Assistant at <a href="https://ai.comp.nus.edu.sg/"><em>HPC-AI Lab</em></a> advised by <a href="https://www.comp.nus.edu.sg/~youy/"><em>Yang You</em></a>, <a href="https://wangbo-zhao.github.io/"><em>Wangbo Zhao</em></a> and <a href="https://lancezpf.github.io/"><em>Pengfei Zhou</em></a>
      </div>
  </div>


  <div class="experience-card">
      <img src="images/XDU.png" alt="Xi'dian logo" class="experience-logo">
      <div class="experience-info">
          <strong>Xidian University</strong><br>
          <em>2023.09 - Present</em><br>
          Rank 5/99, B.E at <a href="https://ste.xidian.edu.cn/"><em>School of Telecommunication Engineering</em></a> & Research Assistant advised by <a href="https://scholar.google.com/citations?user=k33uf2RE8nsC&hl=zh-CN&oi=ao"><em>Xiumei Wang</em></a>
      </div>
  </div>
  
</div>


Publications
--------------
<button class="pub-button active" onclick="filterPublications(event, 'all')">Core Publications</button>
<button class="pub-button" onclick="filterPublications(event, 'list')">Full Publications List</button>

(* equal contribution · &dagger; corresponding author · &Dagger; project leader)

<div id="core-publications" class="publication-view" data-publication-view="core">
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
        Zhigang Tian, 
        Weicheng Jiao, 
        Can Zhang, 
        Xinyan Wan, 
        <a href="https://jerryliang24.github.io/" target="_blank">Zhiyuan Liang</a>, 
        <a href="https://lancezpf.github.io/" target="_blank">Pengfei Zhou&dagger;</a>,
        <a href="https://www.comp.nus.edu.sg/~youy/" target="_blank">Yang You</a>, 
        <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao&dagger;</a>
      </i><br> 
      We propose GroupToM-Bench and show that current models fail at nonlinear group reasoning despite strong individual-level ToM, exposing a clear group cognitive gap. 
      <br> 
      <b><i style="color:#83a1c7;">ACL 2026 &nbsp;
      </i></b> 
      <a href="images/GroupToM_poster.pdf"><em>[Poster]</em></a>
      <a href="https://arxiv.org/pdf/2606.04184"><em>[arXiv]</em></a> 
      <a href="https://huggingface.co/datasets/Twwwd/GroupToM-Bench"><em>[code]</em></a> 
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
      <b><i style="color:#83a1c7;">ACL 2026 &nbsp;
      </i></b> 
      <a href=""><em>[arXiv]</em></a> 
      <a href=""><em>[code]</em></a> 
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
      <b><i style="color:#83a1c7;">CVPR 2026 &nbsp;
      </i></b> 
      <a href="images/cvpr_poster.pdf"><em>[Poster]</em></a>
      <a href="https://openaccess.thecvf.com/content/CVPR2026/html/Tang_Efficient_Video_Object_Segmentation_and_Tracking_with_Recurrent_Dynamic_Submodel_CVPR_2026_paper.html"><em>[arXiv]</em></a> 
      <a href=""><em>[code]</em></a> 
    </div>
  </div> 
</div>


<div class="publication-card" data-category="all"> 
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;"> 
      <img src="images/var-scaling.png" alt="wog" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;"> 
    </div> 
    <div>
      <strong>Inference-Time Scaling for Visual AutoRegressive modeling by Searching Representative Samples</strong><br>
      <i style="font-size: 13px;">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>, 
        Xinyan Wan,
        <a href="https://scholar.google.com/citations?user=k33uf2RE8nsC&hl=zh-CN&oi=ao" target="_blank">Xiumei Wang&dagger;</a>
      </i><br> 
      Explored inference-time scaling in discrete spaces by mapping them to continuous spaces to obtain density distributions, thereby optimizing the sampling of early coarse-scale features.
      <br> 
      <b><i style="color:#83a1c7;">PRCV 2025 &nbsp;
      </i></b> 
      <a href="images/var_poster.png"><em>[Poster]</em></a>
      <a href="https://link.springer.com/chapter/10.1007/978-981-95-5699-1_28"><em>[arXiv]</em></a> 
      <a href="https://github.com/WD7ang/VAR-Scaling"><em>[code]</em></a> 
    </div>
  </div> 
</div>


</div>
<div id="full-publications" class="publication-view" data-publication-view="list" hidden>
  <ul class="full-publication-list">
    <li>
      <span class="pub-list-badge">ACL 2026</span>
      <span class="pub-list-title">GroupToM-Bench: Benchmarking Group Theory of Mind and Nonlinear Social Emergence in MLLMs</span><br>
      <span class="pub-list-authors">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>, Jierui Li, Yueling Hou, Zihan Mei, Zhigang Tian, Weicheng Jiao, Can Zhang, Xinyan Wan,
        <a href="https://jerryliang24.github.io/" target="_blank">Zhiyuan Liang</a>,
        <a href="https://lancezpf.github.io/" target="_blank">Pengfei Zhou&dagger;</a>,
        <a href="https://www.comp.nus.edu.sg/~youy/" target="_blank">Yang You</a>,
        <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao&dagger;</a>.
      </span>
      <span class="pub-list-links"><a href="https://arxiv.org/pdf/2606.04184">[arXiv]</a><a href="https://huggingface.co/datasets/Twwwd/GroupToM-Bench">[code]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">ACL 2026</span>
      <span class="pub-list-title">MagicBench: Diagnosing Visual Agency Loss and Semantic Dependency in Multimodal LLMs</span><br>
      <span class="pub-list-authors">
        Tang Da Huang,
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang&Dagger;</strong></a>,
        Wen Qi Xu, Xianpeng Guo&dagger;.
      </span>
      <span class="pub-list-links"><a href="">[arXiv]</a><a href="">[code]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">CVPR 2026</span>
      <span class="pub-list-title">Efficient Video Object Segmentation and Tracking with Recurrent Dynamic Submodel</span><br>
      <span class="pub-list-authors">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>,
        <a href="https://jerryliang24.github.io/" target="_blank">Zhiyuan Liang</a>, Xinyan Wan,
        <a href="https://scholar.google.com.hk/citations?user=W9HbDoYAAAAJ&hl=en" target="_blank">Chen Zhu</a>,
        <a href="https://scholar.google.com.hk/citations?user=qNWDwOcAAAAJ&hl=en" target="_blank">Zhaopan Xu</a>,
        <a href="https://lancezpf.github.io/" target="_blank">Pengfei Zhou</a>&dagger;, Yan Song,
        <a href="https://www.comp.nus.edu.sg/~youy/" target="_blank">Yang You</a>,
        <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao&dagger;</a>.
      </span>
      <span class="pub-list-links"><a href="https://openaccess.thecvf.com/content/CVPR2026/html/Tang_Efficient_Video_Object_Segmentation_and_Tracking_with_Recurrent_Dynamic_Submodel_CVPR_2026_paper.html">[arXiv]</a><a href="">[code]</a></span>
    </li>
        <li>
      <span class="pub-list-badge">AAAI 2026</span>
      <span class="pub-list-title">MDK12-Bench: a multi-discipline benchmark for evaluating reasoning in multimodal large language models</span><br>
      <span class="pub-list-authors">
        <a href="https://lancezpf.github.io/" target="_blank">Pengfei Zhou*</a>,
          Xiaopeng Peng*,
           Fanrui Zhang*, 
          <a href="https://scholar.google.com.hk/citations?user=qNWDwOcAAAAJ&hl=en" target="_blank">Zhaopan Xu</a>,
          Jiaxin Ai, Yansheng Qiu,
          <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao</a>,
            Jiajun Song, Chuanhao Li, 
            <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>,
            Zhen Li, Haoquan Zhang, Zizhen Li, Xiaofeng Mao, Yukang Feng, Jianwen Sun, 
          <a href="https://scholar.google.com/citations?hl=zh-CN&user=i2II0XIAAAAJ" target="_blank">Kai Wang</a>,
          Xiaojun Chang, Wenqi Shao, 
          <a href="https://www.comp.nus.edu.sg/~youy/" target="_blank">Yang You</a>,
          <a href="https://scholar.google.com/citations?hl=zh-CN&user=4OqZBmYAAAAJ&view_op=list_works&sortby=pubdate" target="_blank">Kaipeng Zhang&dagger;</a>.
      </span>
      <span class="pub-list-links"><a href="">[arXiv]</a><a href="">[code]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">PRCV 2025</span>
      <span class="pub-list-title">Inference-Time Scaling for Visual AutoRegressive modeling by Searching Representative Samples</span><br>
      <span class="pub-list-authors">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>, Xinyan Wan, Siyu Li,
        <a href="https://scholar.google.com/citations?user=k33uf2RE8nsC&hl=zh-CN&oi=ao" target="_blank">Xiumei Wang&dagger;</a>.
      </span>
      <span class="pub-list-links"><a href="">[arXiv]</a><a href="">[code]</a></span>
    </li>
        <li>
      <span class="pub-list-badge">ICCV 2025</span>
      <span class="pub-list-title">EA-ViT: Efficient Adaptation for Elastic Vision Transformer</span><br>
      <span class="pub-list-authors">
        <a href="https://scholar.google.com.hk/citations?user=W9HbDoYAAAAJ&hl=en" target="_blank">Chen Zhu</a>,
        <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao&dagger;</a>,
        Huiwen Zhang,
        <a href="https://scholar.google.com/citations?hl=zh-CN&user=bGKF2tUAAAAJ" target="_blank">Yuhao Zhou</a>,
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>, 
        Shuo Wang,
        Zhihang Yuan,
        Yuzhang Shang,
        <a href="https://scholar.google.com/citations?hl=zh-CN&user=7oRD67kAAAAJ" target="_blank">Xiaojiang Peng</a>,
        <a href="https://scholar.google.com/citations?hl=zh-CN&user=i2II0XIAAAAJ" target="_blank">Kai Wang</a>,
        <a href="https://scholar.google.com/citations?hl=zh-CN&user=j2ANma0AAAAJ&view_op=list_works&sortby=pubdate" target="_blank">Dawei Yang&dagger;</a>.
      </span>
      <span class="pub-list-links"><a href="">[arXiv]</a><a href="">[code]</a></span>
    </li>
        <li>
      <span class="pub-list-badge">Preprint 2025</span>
      <span class="pub-list-title">Pebench: A fictitious dataset to benchmark machine unlearning for multimodal large language models</span><br>
      <span class="pub-list-authors">
        <a href="https://scholar.google.com.hk/citations?user=qNWDwOcAAAAJ&hl=en" target="_blank">Zhaopan Xu</a>,
        <a href="https://lancezpf.github.io/" target="_blank">Pengfei Zhou</a>,
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>, 
        Jiaxin Ai,
        <a href="https://wangbo-zhao.github.io/" target="_blank">Wangbo Zhao</a>,
        <a href="https://scholar.google.com/citations?hl=zh-CN&user=i2II0XIAAAAJ" target="_blank">Kai Wang</a>,
        <a href="https://scholar.google.com/citations?hl=zh-CN&user=7oRD67kAAAAJ" target="_blank">Xiaojiang Peng</a>,
        Wenqi Shao,
        Hongxun Yao,
        <a href="https://scholar.google.com/citations?hl=zh-CN&user=4OqZBmYAAAAJ&view_op=list_works&sortby=pubdate" target="_blank">Kaipeng Zhang&dagger;</a>.
      </span>
      <span class="pub-list-links"><a href="">[arXiv]</a><a href="">[code]</a></span>
    </li>
  </ul>
</div>

<script src="assets/js/show_publications.js"></script>
<script src="assets/js/pub_media_rotator.js"></script>


Projects
--------
<div class="project-card" data-category="project"> 
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/homepage.png" alt="ManiUniCon" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div> 
      <strong>WowPage</strong><br>
      <i style="font-size: 13px;">
        <a href="https://wd7ang.github.io" target="_blank"><strong>Weidong Tang</strong></a>,
        <a href="https://selen-suyue.github.io/" target="_blank"><strong>Yue Su</strong></a>.
      </i><br>
      In collaboration with Yue Su, I refined and improved his original homepage template. A clean standalone template version is coming soon.
      <br> 
      <b><i style="color:#83a1c7;">Project &nbsp;</i></b> 
      <a href="https://github.com/WD7ang/WowPage"><em>[code]</em></a> 
    </div>
  </div> 
</div>


Awards
--------
- *2025.09*, Second-Class Academic Scholarship, Xidian University (Ranked 5/99)



Services
--------
- *2025.06 – Present*, AI Team Lead, 🌊Xidian–Inspur Club.
- Reviewer for ICIC 2026, PRCV (2025,2026).

Talks
--------

