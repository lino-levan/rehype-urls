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

Deno.test("README example", () => {
  const input =
    '<article><img src="http://internal.site/image.jpg"><a href="http://internal.site/page.html">page</a><a href="http://example.com">link</a></article>';
  const p = rehype().use(urls, (url: string) => {
    if (new URL(url).host === "internal.site") {
      return new URL(url).pathname;
    }
    return url;
  }).freeze();

  assertEquals(
    p.processSync(input).value,
    wrap(
      '<article><img src="/image.jpg"><a href="/page.html">page</a><a href="http://example.com">link</a></article>',
    ),
    "process readme example",
  );
});

function wrap(html: string) {
  return `<html><head></head><body>${html}</body></html>`;
}
