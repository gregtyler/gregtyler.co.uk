const site = require("./_data/site");
const { DateTime } = require("luxon");
const markdownit = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const md = markdownit();

module.exports = function (config) {
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
${
  caption ? ` ${caption}</figcaption>` : ""
}
</figure>`;
  });
};
