/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Powered-By",
    value: "Next.js & onRuntime",
  },
];

const i18n = {
  locales: ["en", "fr"],
  defaultLocale: "en",
};

const pwa = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

const moduleExports = {
  poweredByHeader: false,
  i18n,
  pwa,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add webpack aliases to redirect Apollo imports to static client
    config.resolve.alias = {
      ...config.resolve.alias,
      '@apollo/client': require('path').resolve(__dirname, 'src/services/apollo/static-client.ts'),
      '@apollo/react-hooks': require('path').resolve(__dirname, 'src/services/apollo/static-client.ts'),
    };
    return config;
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/expatriation",
        destination: "/destinations",
        permanent: false,
      },
      {
        source: "/destinations/:slug/:path*",
        destination: "/expatriation/:slug/:path*",
        permanent: false,
      },
      {
        source: "/signin",
        destination: "/auth",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/auth",
        permanent: true,
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

const config = withSentryConfig(
  withPWA(moduleExports),
  sentryWebpackPluginOptions
);

module.exports = config;
