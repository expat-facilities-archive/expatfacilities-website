import Image from "@components/Image";
import Link from "@components/Layout/Link";
import styled from "styled-components";
import ROUTES from "@constants/routes";
import { WPCategory, WPPost } from "@typeDefs/wordpress";
import { useRouter } from "next/router";
import React from "react";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";

interface Props {
  data: WPPost;
  featured?: boolean;
}

const Card: React.FC<Props> = ({
  data: { slug, image, title, categories },
  featured = false,
}: Props) => {
  const router = useRouter();
  const link = `${ROUTES.BLOG_ARTICLE}/${slug}`;
  const handleClick = (event: any) => {
    if (event.target.tagName.toLowerCase() !== "a") router.push(link);
  };
  return (
    <Container featured={featured} onClick={handleClick}>
      <ThumbnailImage src={image} alt={title} height={1080} width={1920} />
      <Content>
        {categories.length > 0 &&
          categories.map((category: WPCategory, i: number) => (
            <CategoryCard
              key={i}
              href={`${ROUTES.BLOG_CATEGORY}/${category.slug}`}
              title={category.name}
            >
              {category.name}
            </CategoryCard>
          ))}
        <Title href={link} title={title}>
          {title}
        </Title>
      </Content>
    </Container>
  );
};
const Container = styled.div<{ featured?: boolean }>`
  position: relative;
  width: ${({ featured }) =>
    featured ? "calc(50% - 10px)" : "calc(25% - 10px)"};
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  height: 250px;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: calc(100% - 10px);
  }
`;

const ThumbnailImage = styled(Image)`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s;
  :hover {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  width: calc(100% - 5px * 2);
  padding: 5px;
  background: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darkest, 0.5)};
  border-radius: 0 0 8px 8px;
  backdrop-filter: blur(7px);
  line-height: 1.3;
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

const Title = styled(Link)`
  display: block;
  margin-top: 5px;
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.medium};
`;

export default Card;
