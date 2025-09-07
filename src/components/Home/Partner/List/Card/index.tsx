import styled from "styled-components";
import { Partner } from "src/types/partners";
import Image from "@components/Image";
import themes from "@services/themes";

interface Props {
  data: Partner;
}

const PartnerCard: React.FC<Props> = ({ data: { name, thumbnail } }: Props) => {
  return (
    <Container>
      <ThumbnailImage
        src={`/static/images/partners/${thumbnail}`}
        alt={`${name} Logo`}
        height={50}
        width={150}
      />
    </Container>
  );
};

const ThumbnailImage = styled(Image)`
  opacity: 0.3;
  width: 60%;
  height: auto;
  max-height: 80%;
  transition: all 1s;
  object-fit: contain;
  filter: ${({ theme }) =>
    theme.id === themes.light.id && "grayscale(0) brightness(0) invert(0)"};
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
  margin: 0 10px;
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s;

  :hover {
    transform: scale(1.05);
    ${ThumbnailImage} {
      opacity: 1;
    }
  }
`;

export default PartnerCard;
