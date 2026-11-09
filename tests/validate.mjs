// 仓库结构与关键内容校验（无外部依赖，node 直接运行）
import assert from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const checks = [];
const check = (name, fn) => {
  try { fn(); checks.push(["PASS", name]); }
  catch (e) { checks.push(["FAIL", name + " — " + e.message]); }
};

// 必需文件
for (const f of ["index.html", "css/style.css", "LICENSE", "NOTICE", "README.md", "VERSION"]) {
  check(`存在 ${f}`, () => assert.ok(existsSync(join(root, f))));
}

const html = read("index.html");
check("以 <!DOCTYPE html> 开头", () => assert.ok(html.trimStart().toLowerCase().startsWith("<!doctype html>")));
check("html 带 lang 属性", () => assert.ok(/<html[^>]*\slang=/.test(html)));
check("含 viewport meta", () => assert.ok(/name="viewport"/.test(html)));
check("含 title", () => assert.ok(/<title>[^<]+<\/title>/.test(html)));
check("含 <main> 语义标签", () => assert.ok(/<main[\s>]/.test(html) && /<\/main>/.test(html)));
check("链接外部样式表", () => assert.ok(/href="css\/style\.css"/.test(html)));
check("含无障碍 sr-only 标题", () => assert.ok(/class="sr-only"/.test(html)));

const css = read("css/style.css");
check("CSS 含取证背景色 #eeeeee", () => assert.ok(css.includes("#eeeeee")));
check("CSS 含焦点可见样式", () => assert.ok(css.includes(":focus-visible")));

const license = read("LICENSE");
check("LICENSE 为 PolyForm Noncommercial 1.0.0", () => assert.ok(license.includes("PolyForm Noncommercial License 1.0.0")));
check("LICENSE 含洋洋署名", () => assert.ok(license.includes("洋洋")));

const notice = read("NOTICE");
check("NOTICE 含版权与署名", () => assert.ok(notice.includes("Copyright (c) 2026 洋洋")));

let failed = 0;
for (const [s, n] of checks) {
  console.log(s, n);
  if (s === "FAIL") failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} 通过`);
process.exit(failed ? 1 : 0);
