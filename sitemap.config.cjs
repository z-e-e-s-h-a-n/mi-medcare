module.exports = {
  siteUrl: "https://www.mimedcarellc.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.8,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/auth"],
      },
    ],
  },
};
