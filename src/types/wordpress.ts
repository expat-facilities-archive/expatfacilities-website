export type WPPost = {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: string;
  date: string;
  categories: WPCategory[];
};

export type WPCategory = {
  id: number;
  name: string;
  link: string;
  slug: string;
};
