import React from "react";
import { NextPageContext } from "next";
import { getPosts } from "@services/wordpress";
import { WPPost } from "@typeDefs/wordpress";
import ROUTES from "@constants/routes";
import { APP_NAME, APP_URL } from "@constants/main";

const blogPostsRssXml = (posts: WPPost[]) => {
  let latestPostDate = "";
  let rssItemsXml = "";
  posts.forEach((post) => {
    const postDate = Date.parse(post.date);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>
          ${APP_URL}${`${ROUTES.BLOG_ARTICLE}/${post.slug}`}
        </link>
        <pubDate>${post.date}</pubDate>
        <description>
        <![CDATA[${post.content}]]>
        </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (posts: WPPost[], locale = "en") => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(posts);

  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:wfw="http://wellformedweb.org/CommentAPI/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
  >

  <image>
    <url>https://expatfacilities.co/static/images/favicon/favicon-32x32.png</url>
    <title>Blog | ${APP_NAME}</title>
    <link>https://expatfacilities.co${ROUTES.BLOG}</link>
    <width>32</width>
    <height>32</height>
  </image>

  <channel>
      <title>Blog | ${APP_NAME}</title>
      <link>${APP_URL}${ROUTES.BLOG}</link>
      <description>${"Expat Facilities helps students travel abroad through various services: applying for visas and residence permits, finding accommodation and transport..."}</description>
      <language>${locale}</language>
      <lastBuildDate>${latestPostDate}</lastBuildDate>
      ${rssItemsXml}
  </channel>
  </rss>`;
};

/* export const getInitialProps = async ({
  res,
}: NextPageContext): Promise<{
  data: WPPost[];
}> => {
  const data = await getPosts();
  if (res) {
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(data));
    res.end();
  }
  return { data };
}; */

export default class Rss extends React.Component {
  static async getInitialProps({ res, locale }: NextPageContext) {
    if (!res) return;
    const data = await getPosts();
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(data, locale));
    res.end();
  }
}
