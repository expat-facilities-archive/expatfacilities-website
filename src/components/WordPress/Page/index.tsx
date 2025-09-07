import Wrapper from "@components/Wrapper";
import LayoutMain from "@components/Layout/Main";
import LayoutContainer from "@components/Layout/Container";
import Head from "@components/Head";
import styled from "styled-components";
import { FormattedContent } from "@components/Layout/WordPress";

interface Props {
  data: any;
  description?: string;
}

const WordPressPage: React.FC<Props> = ({
  data: { title, content },
  description,
}: Props) => {
  return (
    <Wrapper>
      <LayoutMain>
        <Head title={title.rendered} description={description} />
        <LayoutContainer>
          <Container>
            <Title>{title.rendered}</Title>
            <FormattedContent
              dangerouslySetInnerHTML={{ __html: content.rendered }}
            />
          </Container>
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
`;

export default WordPressPage;
