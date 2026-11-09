# 变更日志

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 规范，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)，许可证为 PolyForm Noncommercial 1.0.0。

## [1.1.0] - 2026-11-09

### 新增
- 无障碍：屏幕阅读器标题（`sr-only`）、外部链接 `rel`、SVG `focusable=false`。
- 键盘焦点可见样式（`:focus-visible`）与 `prefers-reduced-motion` 支持。
- SEO/元信息：`meta description`、`theme-color`、Open Graph 标签。
- 移动端（390 CSS px）响应式布局与渲染对照，内容列与原版对齐（34–355）。
- 工程文件：`VERSION`、`CITATION.cff`、`CHANGELOG.md`。
- GitHub Actions CI：HTML 校验与渲染冒烟测试。

### 变更
- 整理 `evidence/`，仅保留最终桌面/移动截图与差异图。

## [1.0.0] - 2026-11-09

### 新增
- 基于 Craft Anything `web_site_capture` 取证的洁净室复刻首版。
- `index.html` 与 `css/style.css`，设计 token 全部来自外部可见证据。
- 桌面端像素对照（背景色一致、内容列差 1–2px、差异像素约 3.5%）。
