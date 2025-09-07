import { NextPage } from "next";
import Wrapper from "@components/Wrapper";
import LayoutContainer from "@components/Layout/Container";
import LayoutMain from "@components/Layout/Main";
import BlogList from "@components/Blog/List";
import Head from "@components/Head";
import { getPostsbyCategory } from "@services/wordpress";
import { WPPost } from "@typeDefs/wordpress";
import { useRouter } from "next/router";

interface Props {
  data: WPPost[];
}

const Category: NextPage<Props> = ({ data }: Props) => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  return (
    <Wrapper>
      <LayoutMain>
        <Head title={"Blog"} subtitle={slug} />
        <LayoutContainer>
          <BlogList data={data} />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

Category.getInitialProps = async ({ query }) => {
  const { slug } = query as { slug: string };
  const data = await getPostsbyCategory(slug);
  return { data };
};

export default Category;
