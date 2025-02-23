# `rehype-urls`

This is a tiny module that allows you to transform rehype URLs.

## Usage

Given this markup:

```html
<article>
  <img src="http://internal.site/image.jpg">
  <a href="http://internal.site/page.html">page</a>
  <a href="http://example.com">link</a>
</article>
```

You can use the following script:

```js
import { rehype } from "npm:rehype";
import urls from "jsr:@lino/rehype-urls";

rehype()
  .use(urls, removeBaseUrl)
  .process(input, console.log);

function removeBaseUrl(url: string) {
  if (new URL(url).hostname === "internal.site") {
    return new URL(url).pathname;
  }
  return url;
}
```

Which will transform it into:

```html
<article>
  <img src="/image.jpg">
  <a href="/page.html">page</a>
  <a href="http://example.com">link</a>
</article>
```

Inspired by: https://github.com/brechtcs/rehype-urls
