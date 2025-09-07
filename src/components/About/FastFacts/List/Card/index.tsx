import styled from "styled-components";
import { Data } from "src/types/about";
import useTranslation from "@hooks/useTranslation";

interface Props {
  data: Data;
}

const Card: React.FC<Props> = ({ data: { title, subtitle } }: Props) => {
  const { t } = useTranslation("about/fastfacts");
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{t(subtitle)}</SubTitle>
    </Container>
  );
};

const Container = styled.div<{ alternative?: boolean }>`
  width: calc(25% - 10px - 40px * 2);
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 8px;
  height: calc(220px - 40px - 32px);
  background-color: ${({ theme }) => theme.colors.layout.darker};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 40px 32px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 108px;
    height: 108px;
    align-items: center;
    padding: 20px;
  }
`;

const Title = styled.h3`
  font-weight: ${({ theme }) => theme.weight.extraBold};
  font-size: ${({ theme }) => theme.size.extraTitle};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    font-size: ${({ theme }) => theme.size.large};
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.medium};
  }
`;

export default Card;
