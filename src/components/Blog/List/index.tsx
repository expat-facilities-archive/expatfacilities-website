import { WPPost } from "@typeDefs/wordpress";
import styled from "styled-components";
import Card from "./Card";

interface Props {
  data: WPPost[];
}

const BlogList: React.FC<Props> = ({ data }: Props) => (
  <Container>
    {data.map((post: WPPost, i: number) => (
      <Card key={post.slug} data={post} featured={i === 0} />
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
  margin-left: -10px;
  flex-direction: row;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    padding: 0;
  }
`;

export default BlogList;
