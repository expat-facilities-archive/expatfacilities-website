import { NextPage } from "next";

import LayoutContainer from "@components/Layout/Container";
import LayoutMain from "@components/Layout/Main";
import Head from "@components/Head";
import { getPost } from "@services/wordpress";
import styled from "styled-components";
import { WPCategory, WPPost } from "@typeDefs/wordpress";
import { FormattedContent } from "@components/Layout/WordPress";
import ROUTES from "@constants/routes";
import Link from "@components/Layout/Link";
import Wrapper from "@components/Wrapper";
import Background from "@components/Background";
import Error from "@screens/Error";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";

interface Props {
  data: WPPost;
}

const Article: NextPage<Props> = ({ data }: Props) => {
  if (!data) return <Error statusCode={404} />;

  const { image, title, categories, content } = data;
  return (
    <Wrapper>
      <LayoutMain>
        <Background src={image} />
        <Head
          title={"Blog"}
          subtitle={title}
          thumbnailUrl={image}
          keywords={categories.map((category: WPCategory) => category.name)}
        />
        <LayoutContainer>
          <Container>
            <Header>
              <HeaderCol>
                <ThumbnailImage
                  src={image}
                  width={1920}
                  height={1080}
                  alt={title}
                />
              </HeaderCol>
              <HeaderCol>
                <Title>{title}</Title>
                <CategoryRow>
                  {categories.length > 0 &&
                    categories.map((category: WPCategory, i: number) => (
                      <CategoryCard
                        key={i}
                        href={`${ROUTES.BLOG_CATEGORY}/${category.slug}`}
                      >
                        {category.name}
                      </CategoryCard>
                    ))}
                </CategoryRow>
              </HeaderCol>
            </Header>
            <FormattedContent dangerouslySetInnerHTML={{ __html: content }} />
          </Container>
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

Article.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { slug } = query as { slug: string };
  const data = await getPost(slug);

  if (!data && ctx.res) {
    ctx.res.statusCode = 404;
  }

  return { data };
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeaderCol = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
  user-select: none;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    max-height: 300px;
  }
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.large};
  width: 80%;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 25px;
  }
`;

const CategoryRow = styled.div`
  margin-top: 15px;
  display: flex;
`;

const CategoryCard = styled(Link)`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.size.tiny};
  padding: 3px 5px;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darkest, 0.3)};
  font-weight: ${({ theme }) => theme.weight.bold};
  margin-right: 3px;
`;

export default Article;
