module.exports = function (eleventyConfig) {
  // Copiar carpetas de assets al destino final sin procesar
  eleventyConfig.addPassthroughCopy("src/assets");
  // Si tienes el CSS o JS en carpetas separadas en la raíz de src, añádelas:
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  return {
    dir: {
      input: "src",
      output: "public", // Aquí se generará tu web "lista para vender"
    },
  };
};
