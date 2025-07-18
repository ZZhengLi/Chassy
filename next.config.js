/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URI: process.env.API_URI,
  },
  images: {
    domains: ["profile.line-scdn.net"],
  },
};
// module.exports = nextConfig

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

// const moduleExports = {
//   // Your existing module.exports
// };

const moduleExports = nextConfig;

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  // dryRun: process.env.VERCEL_ENV !== "production"
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

SENTRY_IGNORE_API_RESOLUTION_ERROR = 1;
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
