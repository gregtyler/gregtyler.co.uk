import site from "./_data/site.js";
import { DateTime } from "luxon";
import markdownit from "markdown-it";
import pluginRss from "@11ty/eleventy-plugin-rss";

const md = markdownit();

export default function (config) {
  config.addPassthroughCopy("assets");
  config.addPassthroughCopy("images");

  config.addPlugin(pluginRss);

  config.addFilter("date", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL, {
      locale: "en-GB",
    });
  });

  config.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });

  config.addFilter("toTagSlug", (tag) => {
    if (tag === "Web development") {
      return "webdev";
    }

    return tag.toLowerCase().replace(/ /g, "-");
  });

  config.addFilter("toAbsoluteUrl", (url) => {
    return new URL(url, site.baseUrl).href;
  });

  config.addPairedShortcode("figure", (content, caption = "", align = "") => {
    let classes = "c-figure";
    if (align === "left") classes += " c-figure--left";
    if (align === "right") classes += " c-figure--right";

    const trimmed = content.trim();

    return `<figure class="${classes}">
${trimmed.startsWith("!") ? md.renderInline(trimmed) : trimmed}
${caption ? ` ${caption}</figcaption>` : ""}
</figure>`;
  });
}
