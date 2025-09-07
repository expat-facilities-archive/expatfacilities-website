import styled from "styled-components";
import Icon from "@components/Layout/Icon";
// import useTranslation from "@hooks/useTranslation";

interface Props {
  data: {
    icon: { class: string; color: string };
    title: string;
    amount: string;
    evolution: { amount: string; time: string };
  };
  [key: string]: any;
}

const Card: React.FC<Props> = ({
  data: { icon, title, amount, evolution },
  ...rest
}: Props) => {
  return (
    <Container {...rest}>
      <IconContainer>
        <Icon name={icon.class} size={64} color={icon.color} />
      </IconContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Amount>{amount}</Amount>
        <SubTitle>
          <Span>{evolution.amount}%</Span> <Span>({evolution.time})</Span>
        </SubTitle>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  height: 175px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text.lightest};
  background-color: ${({ theme }) => theme.colors.layout.darker};
  cursor: pointer;
  user-select: none;
`;

const IconContainer = styled.div`
  /* width: 40%; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Amount = styled.h2`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.extraBold};
`;

const SubTitle = styled.small`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.tiny};
`;

const Span = styled.span`
  :last-child {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export default Card;
