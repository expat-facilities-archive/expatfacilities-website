import { WPCategory, WPPost } from "@typeDefs/wordpress";
import WPAPI from "wpapi";

export const endpoint =
  (process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://wp.expatfacilities.co") +
  "/wp-json";

const wp = new WPAPI({ endpoint });

export const formatPost = (data: any): WPPost => {
  let categories: WPCategory[] = [];

  let image = "";

  if (data["_embedded"]) {
    if (data["_embedded"]["wp:term"] && data["_embedded"]["wp:term"][0]) {
      categories = data["_embedded"]["wp:term"][0];
    }

    if (
      data["_embedded"]["wp:featuredmedia"] &&
      data["_embedded"]["wp:featuredmedia"][0]
    ) {
      image = data["_embedded"]["wp:featuredmedia"][0].source_url;
    }
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title.rendered,
    date: data.date,
    content: data.content.rendered,
    image,
    categories,
  };
};

export const getPage = async (slug: string) => {
  const result = await wp.pages().embed();
  return result.filter((page: any) => {
    return page.slug == slug;
  })[0];
};

export const getPosts = async (): Promise<WPPost[]> => {
  const result = await wp
    .posts()
    .embed()
    .then((data) => data.map((post: any) => formatPost(post)));
  return result;
};

export const getPostsbyCategory = async (
  category: string
): Promise<WPPost[]> => {
  let result = await wp
    .posts()
    .embed()
    .then((data) => data.map((post: any) => formatPost(post)));
  result = result.filter((post: any) => {
    post.categories = post.categories.filter((c: any) => c.slug == category);
    return post.categories.length > 0;
  });
  return result;
};

export const getPost = async (slug: string): Promise<WPPost> => {
  const result = await wp
    .posts()
    .embed()
    .then((data) => data.map((post: any) => formatPost(post)));
  return result.filter((post: any) => {
    return post.slug == slug;
  })[0];
};
