// 自包含 WCAG 对比度检查（无外部依赖）。实现 WCAG 2.x 相对亮度与对比度公式。
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// 解析 #rgb / #rrggbb
export function parseHex(hex) {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

// sRGB 分量线性化
function channel(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.2);
}

export function relativeLuminance(hex) {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const css = readFileSync(join(root, "css/style.css"), "utf8");
const bg = (css.match(/--bg:\s*(#[0-9a-fA-F]+)/) || [])[1];
const text = (css.match(/--text:\s*(#[0-9a-fA-F]+)/) || [])[1];
const link = (css.match(/--link:\s*(#[0-9a-fA-F]+)/) || [])[1];

// 组合：[名称, 前景, 背景, 最低要求, 说明]
const pairs = [
  ["正文文字", text, bg, 4.5, "正文 AA"],
  ["链接", link, bg, 4.5, "正文 AA"],
  ["注释文字", "#333333", bg, 4.5, "正文 AA"],
  ["图标", "#6b6b6b", bg, 3.0, "非文本图形 AA"],
];

let failed = 0;
for (const [name, fg, bgc, min, note] of pairs) {
  const ratio = contrastRatio(fg, bgc);
  const ok = ratio >= min;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}  ${ratio.toFixed(2)}:1 （要求≥${min}，${note}）`);
  if (!ok) failed++;
}
assert.equal(failed, 0, `${failed} 个颜色组合未达 WCAG AA`);
console.log("\n全部颜色组合达到 WCAG AA 标准");
