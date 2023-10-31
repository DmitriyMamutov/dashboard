/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  reactStrictMode: false,
  MODE: process.env.REACT_APP_HOST_ENV,
  experimental: {
    nextScriptWorkers: false,
  },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   staticFolder: '/static',
  // },
  i18n: {
    defaultLocale: "en", // Should be the same as in i18n file
    locales: ["en", "de"], // Should be the same as in i18n file
  },
};

module.exports = withPlugins(
  [
    [nextTranslate],
    // Your other plugins here
  ],
  nextConfig,
);
