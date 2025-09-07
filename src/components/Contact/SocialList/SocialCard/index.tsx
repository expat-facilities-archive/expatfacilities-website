import Link from "@components/Layout/Link";
import styled, { useTheme } from "styled-components";
import Icon from "@components/Layout/Icon";

interface Props {
  data: { link: string; image: string; title: string; subtitle: string };
}

const Card: React.FC<Props> = ({
  data: { link, image, title, subtitle },
}: Props) => {
  const theme = useTheme();
  return (
    <Container href={link}>
      <Col>
        <Icon name={image} fill size={32} color={theme.colors.text.lightest} />
      </Col>
      <Col>
        <Text>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Text>
      </Col>
    </Container>
  );
};

const Container = styled(Link)`
  max-width: 100%;
  max-height: 90px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.layout.darkest};
  margin-top: 30px;
`;

const Col = styled.div`
  display: flex;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.text.lightest};
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size.normal};
  white-space: nowrap;
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.text.lightest};
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size.small};
`;

export default Card;
