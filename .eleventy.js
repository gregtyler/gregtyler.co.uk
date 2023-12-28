const site = require("./_data/site");
const { DateTime } = require("luxon");
const markdownit = require("markdown-it");

const md = markdownit();

module.exports = function (config) {
  config.addPassthroughCopy("assets");
  config.addPassthroughCopy("images");

  config.addFilter("date", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL, {
      locale: "en-GB",
    });
  });

  config.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate();
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
  caption ? `<figcaption class="c-figure__caption">${caption}</figcaption>` : ""
}
</figure>`;
  });
};
