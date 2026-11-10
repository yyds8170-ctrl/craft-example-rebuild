# Example 网站洁净室复刻

[![CI](https://github.com/yyds8170-ctrl/craft-example-rebuild/actions/workflows/ci.yml/badge.svg)](https://github.com/yyds8170-ctrl/craft-example-rebuild/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue.svg)](LICENSE)
[![method](https://img.shields.io/badge/method-clean--room%20rebuild-green.svg)](#复刻流程)
[![platform](https://img.shields.io/badge/platform-HTML%20%7C%20CSS-lightgrey.svg)](#目录结构)

基于 **Craft Anything 引擎取证 + 编码代理手工实现**完成的洁净室（clean-room）网站复刻示例：只观察目标网站的外部可见行为，不读取其源码，独立写出可运行的 HTML/CSS，再与原版量化对照、迭代修正。

> **维护者 / Maintainer：洋洋（[yyds8170-ctrl](https://github.com/yyds8170-ctrl)）**
>
> 本仓库是独立的学习/研究项目，与目标网站及任何第三方**无隶属、无背书、无赞助关系**；第三方名称与标识归各自权利人，本项目仅做指示性说明。详见 [NOTICE](NOTICE)。

## 复刻流程

1. **取证（Craft Anything）**：在单个浏览器会话内对目标网站做 `web_site_capture`，产出全页截图、设计 token、布局大纲与精确坐标。
2. **手工编码（编码代理）**：仅依据取证证据，从零写出 `index.html` 与 `css/style.css`。
3. **渲染对照**：headless 浏览器渲染复刻版，与原版做像素级量化对比。
4. **迭代修正**：根据差异图修正图标样式与垂直位置，再渲染验证。

## 关键设计 token（来自取证）

| 项目 | 取值 |
| --- | --- |
| 背景色 | `#eeeeee` |
| 正文 / 链接 | `#000000` / `#000ee` |
| 字体 | `system-ui, sans-serif` |
| 字号 | 主文 `16px` / 辅助 `14px` |
| 内容列宽 | `416px` |

## 对照结果

- 背景色完全一致；内容列水平范围仅差 1–2px；差异像素占比约 **3.5%**（差异主要来自有意精简的多语言内容，而非样式）。
- 对照证据见 `evidence/`：原版/复刻截图、差异热力图、图标放大图。

## 如何运行

直接用浏览器打开 `index.html`，或：

```bash
# 本地起一个静态服务
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 质量检查（零依赖）

```bash
node tests/validate.mjs   # 结构与关键内容校验（19 项）
node tests/contrast.mjs   # WCAG 对比度，全部达 AA
```

## 目录结构

```text
rebuild-example/
├── index.html
├── css/style.css
├── .github/workflows/ci.yml  # CI：结构校验 + WCAG对比度 + 渲染冒烟
├── tests/validate.mjs        # 结构校验（19 项）
├── tests/contrast.mjs        # WCAG 对比度检查（零依赖）
├── CHANGELOG.md
├── CITATION.cff
├── VERSION
├── LICENSE          # PolyForm Noncommercial 1.0.0
├── NOTICE
└── evidence/        # 取证与对照截图
```

## 许可证

本项目基于 [PolyForm Noncommercial License 1.0.0](LICENSE) 发布，仅限非商业用途。Copyright (c) 2026 洋洋。
