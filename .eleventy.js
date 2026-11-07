const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // {{ date | isoDate }} -> "2026-11-29" (sitemap lastmod, Event schema)
  eleventyConfig.addFilter("isoDate", (d) =>
    DateTime.fromJSDate(new Date(d), { zone: "utc" }).toFormat("yyyy-LL-dd"));

  // {{ value | jsonld }} -> JSON safe inside <script type="application/ld+json">
  eleventyConfig.addFilter("jsonld", (v) =>
    JSON.stringify(v).replace(/</g, "\\u003c").replace(/>/g, "\\u003e"));

  // No trailing slash except root. Must match html_handling in wrangler.toml.
  eleventyConfig.addFilter("canonicalPath", (url) =>
    url !== "/" && url.endsWith("/") ? url.slice(0, -1) : url);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/site.css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  return {
    dir: { input: "src", output: "_site", includes: "../_includes", data: "../_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
