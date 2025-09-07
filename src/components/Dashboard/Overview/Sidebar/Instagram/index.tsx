import { useQuery } from "@services/apollo/static-client";
import Link from "@components/Layout/Link";
import LINKS from "@constants/links";
import useBreakpoint from "@hooks/useBreakpoint";
import { GET_INSTAGRAM_POSTS } from "@queries/instagram";
import { InstagramPost } from "@typeDefs/instagram";
import styled from "styled-components";
import InstagramCard from "./Card";

const DashboardOverviewSidebarInstagram: React.FC = () => {
  const { data } = useQuery(GET_INSTAGRAM_POSTS);
  const posts = data?.getInstagramPosts ?? Array(9).fill(undefined);
  const { isTablet } = useBreakpoint();

  return (
    <Container>
      <Title>
        <Link href={LINKS.INSTAGRAM}>{"Instagram"}</Link>
      </Title>
      <Row>
        {posts &&
          posts
            .slice(0, isTablet ? 4 : posts.length)
            .map((post: InstagramPost, index: number) => (
              <InstagramCard key={index} post={post} />
            ))}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -10px;
`;

export default DashboardOverviewSidebarInstagram;
