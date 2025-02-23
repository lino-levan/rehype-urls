import { rehype } from "rehype";
import urls from "./mod.ts";
import { assertEquals } from "@std/assert";

Deno.test("return", () => {
  const href = '<a href="http://example.com/page.html">text</a>';
  const src = '<img src="http://example.com/image.jpg">';
  const p = rehype().use(urls, (url: string) => new URL(url).pathname).freeze();

  assertEquals(
    p.processSync(href).value,
    wrap('<a href="/page.html">text</a>'),
    "return href string",
  );
  assertEquals(
    p.processSync(src).value,
    wrap('<img src="/image.jpg">'),
    "return src string",
  );
});

function wrap(html: string) {
  return `<html><head></head><body>${html}</body></html>`;
}
