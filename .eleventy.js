module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  eleventyConfig.addCollection("halls", (api) =>
    api.getFilteredByGlob("src/halls/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addCollection("equipment", (api) =>
    api.getFilteredByGlob("src/equipment/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addCollection("extraServices", (api) =>
    api.getFilteredByGlob("src/extra-services/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addCollection("promos", (api) =>
    api.getFilteredByGlob("src/promos/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addCollection("communityPhotos", (api) =>
    api.getFilteredByGlob("src/community-photos/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
