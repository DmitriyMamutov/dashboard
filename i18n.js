module.exports = {
  defaultLocale: "en",
  locales: ["en", "de"],
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
