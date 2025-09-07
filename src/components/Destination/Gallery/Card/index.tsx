import styled from "styled-components";
interface Props {
  src: string;
  height: number;
  place: string;
  photographer: string;
  marginTop?: boolean;
}

const Card: React.FC<Props> = ({
  src,
  height,
  place,
  photographer,
  marginTop,
}: Props) => {
  return (
    <Container src={src} marginTop={marginTop} height={height}>
      <Gradient />
      <Text>
        <Title>{place}</Title>
        <SubTitle>Credit: {photographer}</SubTitle>
      </Text>
    </Container>
  );
};

const Container = styled.div<{
  marginTop: boolean | undefined;
  height: number;
  src: string;
}>`
  width: calc(100% - 15px);
  min-height: ${({ height }) => height + "px"};
  position: relative;
  border-radius: 10px;
  background: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 15px;
  margin-left: 15px;
  flex: 1;
`;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(16, 7, 135, 0) 60%
  );
  position: absolute;
  top: 0;
`;

const Text = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  z-index: 1;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.large};
  }
`;

const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.size.medium};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.medium};
  }
`;

export default Card;
