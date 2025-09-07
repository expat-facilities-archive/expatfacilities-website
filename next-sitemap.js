module.exports = {
  siteUrl: "https://expatfacilities.co",
  changefreq: "daily",
  priority: 1.0,
  generateRobotsTxt: true,
  exclude: ["/dashboard/*", "/server-sitemap.xml"],
  alternateRefs: [
    {
      href: "https://expatfacilities.co/fr",
      hreflang: "fr",
    },
  ],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/dashboard/",
      },
    ],
    additionalSitemaps: [
      "https://expatfacilities.co/sitemap.xml",
      "https://expatfacilities.co/server-sitemap.xml",
    ],
  },
};
