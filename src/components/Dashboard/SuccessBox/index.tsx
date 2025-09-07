import styled from "styled-components";

type Props = {
  title: string;
  text: string;
  btn: React.ReactNode;
};

const SuccessBox: React.FC<Props> = ({ title, text, btn }: Props) => {
  return (
    <Container>
      <BoxText>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </BoxText>
      {btn}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 10px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.layout.darker};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 10px;
  background-image: url("/static/images/dashboard/payment.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.layout.darker};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
  }
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
  text-shadow: 2px 2px 3px ${({ theme }) => theme.colors.layout.darker};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-shadow: 2px 2px 3px ${({ theme }) => theme.colors.layout.darker};
`;

const BoxText = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export default SuccessBox;
