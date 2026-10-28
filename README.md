# Weidong Tang · Academic homepage

Jekyll / GitHub Pages 个人主页。首页恢复原有 AcademicPages `single` 布局和左侧个人资料栏，使用蓝色与蓝灰色配色；Blog 使用 `academic` 布局。CV 使用独立的 `cv-reference` 布局，按 liamding.cc 的 Jemdoc 版式复刻。无需前端打包，旧的 AcademicPages 页面继续可用。

主页导航和个人介绍中的 **CV** 均打开 `/cv/` 独立网页。在线 CV 是主要入口，PDF 是额外的下载／打印选项；徽章在网页中自动更新，PDF 保留导出时的快照。

## 本地运行

安装 Ruby 和 Bundler 后：

```sh
bundle install
bundle exec jekyll serve
```

浏览器打开终端显示的地址（默认 `http://127.0.0.1:4000`）。正式构建使用 `bundle exec jekyll build`。`_site/` 是生成目录，不提交。

本次工作区已经配置便携 Ruby，可以在 PowerShell 中执行：

```powershell
& '.\local\rubyinstaller-3.1.7-1-x64\bin\ruby.exe' local/build.rb
```

`local/` 仅供本机预览和检查，已从 Git 和 Jekyll 发布中排除。

## 内容维护

| 内容 | 文件 |
| --- | --- |
| 首页简介、原版经历和论文卡片、项目、奖项、服务 | `_pages/about.md` |
| 导航 | `_data/navigation.yml` |
| 新闻，按新到旧排列 | `_data/news.json` |
| 重设计版经历备份 | `_data/experience.json` |
| 重设计版论文备份 | `_data/publications.json` |
| 在线 CV | `_pages/cv.html` |
| 独立 CV 页面框架 | `_layouts/cv-reference.html` |
| 下载版 CV | `images/cv.pdf` |
| 头像 | `images/wx.jpg` |
| GitHub stars 缓存、Scholar citations | `_data/profile_stats.json` |
| 纳入 GitHub stars 的论文项目 | `_data/github_projects.json` |
| 原版首页主题补充 / Blog 排版 / CV 与打印排版 | `assets/css/classic-home.css` / `assets/css/academic.css` / `assets/css/cv.css` |

首页论文卡片与完整列表在 `_pages/about.md` 中维护，保留原版切换按钮和图片轮播。`_data/publications.json` 是重设计版本的数据备份，当前首页不读取它。

新照片在首页使用原版圆形头像框，CV 使用竖向照片；通过 CSS 的 `aspect-ratio`、`object-fit` 和 `object-position` 调整显示，原始图片没有被裁剪或修改。

CV 联系方式使用与参考页同款的统计徽章。GitHub stars 统计 **WD7ang 名下公开仓库 + 已核实的论文项目**，按仓库去重；不是 GitHub 个人页中“给别人点过的星”的数量，也不是全部组织仓库的总和。原先仅统计个人名下仓库的 34 stars 不包含组织或合作者维护的论文项目。项目列表在 `_data/github_projects.json` 中维护，网页可查看每个纳入仓库的明细。

浏览器打开在线 CV 时会直接向 GitHub 公开 API 刷新 stars。Scholar citations 使用 Google Scholar 的 **Citations / All** 总数，通过后台定时抓取更新。网页同时读取 `profile-metrics` 分支的 `profile-stats.json`，获取最近一次成功采集的完整统计；加载失败时保留可用缓存，尚未核实的数值显示 `—`。

`.github/workflows/update-profile-stats.yml` 每小时运行一次，也支持在 Actions 页面手动运行；GitHub 调度可能有延迟。工作流、脚本、项目列表或快照推送到 `master` 时也会触发更新。脚本仅使用 Python 标准库，正常访问公开的 GitHub API 和 Scholar 页面；如 Scholar 限流、要求验证码或页面格式变化，会保留上次成功的 citations 与检查日期，不会写成 0，也不会绕过验证。GitHub 只有在所有纳入仓库都成功获取后才更新总数，避免部分接口失败导致总数突然减少。历史缓存必须与当前账号、统计范围和项目列表一致，旧的 owner-only 数值不会覆盖新总数。数据发布到独立的 `profile-metrics` 分支，不修改网站源代码分支；网页直接读取该 JSON，因此统计更新不依赖重新触发 GitHub Pages 构建。

本地只读取统计、不发布到 GitHub：

```sh
python scripts/update-profile-stats.py --output local/profile-stats.json
```

工作流仅使用仓库自带的 `GITHUB_TOKEN`，权限为 `contents: write`；无需在代码中保存密钥。`--publish` 才会创建／更新数据分支中的 JSON，数据未变化时不会提交。导出的 PDF 保留导出时的统计快照。

## 发布博客

创建 `_posts/YYYY-MM-DD-title.md`，例如：

```markdown
---
title: "文章标题"
date: YYYY-MM-DD
---

摘要段落。

正文。
```

博客自动使用 `academic-post` 布局，出现在 `/blog/`，首页展示最新三篇。未添加文章时展示空状态，不生成示例文章。

## 更新 PDF

1. 修改 `_pages/cv.html`，同时检查 `_data/experience.json` 中的经历日期。
2. 构建后打开 `/cv/`，点击 **Print / Save as PDF**，选择 A4、100% 缩放、关闭浏览器自动页眉页脚。
3. 将导出的文件保存为 `images/cv.pdf`，再次构建，检查下载按钮。

本次 CV 内容依据用户于 2026-10-28 提供的《汤维栋CV.pdf》更新，包含 5 篇 Core Publications、4 篇 Collaborative Publications 和 4 段研究经历。下载版按在线 CV 导出为三页 A4。Alibaba 日期为 `05/2026 - 07/2026`；NUS 日期继续采用用户此前明确确认的主页日期 `10/2024 - 10/2025`（提供的 PDF 中为 `12/2024 - 12/2025`）。

CV 桌面版采用参考页的 960px 内容宽度加两侧 50px 留白、Georgia 16px 正文、蓝色标题和右侧 320px 无框照片。News 和 Publications 分别使用 500px / 900px 滚动区域；打印时自动展开全部内容。CV 不加载 `academic.css`，以免首页样式覆盖参考版式。

## 部署

保留现有 GitHub Pages 的发布设置，将改动提交到该仓库配置的发布分支即可。无需切换主机或添加 `.nojekyll`。

本项目基于 AcademicPages / Minimal Mistakes，保留原 MIT License；原主页模板改进由 Weidong Tang 与 Yue Su 合作完成。
