import styled from "styled-components";
import { APP_NAME } from "@constants/main";
import Image from "@components/Image";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";

interface Props {
  src: string;
}

const Background: React.FC<Props> = ({ src }: Props) => (
  <Container>
    <BackgroundImage
      src={src}
      alt={`${APP_NAME} Background`}
      width={1920}
      height={1080}
    />
    <Gradient />
  </Container>
);

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  user-select: none;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => convertRGBToRGBA(theme.colors.layout.darkest, 0.2)} 0%,
    ${({ theme }) => theme.colors.layout.darkest} 100%
  );
`;

export default Background;
