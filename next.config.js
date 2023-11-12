/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    nextScriptWorkers: false,
  },
  i18n: {
    defaultLocale: "en", // Should be the same as in i18n file
    locales: ["en", "de"], // Should be the same as in i18n file
  },
  reactStrictMode: true,
  images: {
    domains: ["robohash.org"],
  },
};

module.exports = withPlugins(
  [
    [nextTranslate],
    // Your other plugins here
  ],
  nextConfig,
);
