const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // --- EL FILTRO DE FECHA ---
  eleventyConfig.addFilter(
    "dateFilter",
    (dateObj, format = "dd LLL", lang = "es") => {
      // Convertimos el texto del JSON a un objeto de fecha y luego al formato que queramos
      // 'dd' es el día (15) y 'LLL' es el mes abreviado (MAY)
      return DateTime.fromISO(dateObj).setLocale(lang).toFormat(format);
    },
  );
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
