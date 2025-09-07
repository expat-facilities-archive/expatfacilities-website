import Wrapper from "@components/Wrapper";
import LayoutMain from "@components/Layout/Main";
import LayoutContainer from "@components/Layout/Container";
import Head from "@components/Head";
import { NextPage } from "next";
import { getPosts } from "@services/wordpress";
import BlogList from "@components/Blog/List";
import { WPPost } from "@typeDefs/wordpress";
import Background from "@components/Background";
import useTranslation from "@hooks/useTranslation";

interface Props {
  data: WPPost[];
}

const Blog: NextPage<Props> = ({ data }: Props) => {
  const { t } = useTranslation("blog/common");
  return (
    <Wrapper>
      <LayoutMain>
        {data && data.length > 0 && <Background src={data[0].image} />}
        <Head title={t("head.title")} description={t("head.description")} />
        <LayoutContainer>
          <BlogList data={data} />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

Blog.getInitialProps = async () => {
  const data = await getPosts();
  return { data };
};

export default Blog;
