module.exports = {
  locales: ["en", "de"],
  defaultLocale: "en",
  pages: {
    "*": ["common"], // We use one common file for all translations
    "/": ["index"],
    "/register": ["register"],
    "/login": ["login"],
    "/dashboard": ["dashboard"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./static/locales/${lang}/${ns}.json`).then((m) => m.default),
};
