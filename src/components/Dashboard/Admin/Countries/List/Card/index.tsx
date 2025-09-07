import styled from "styled-components";
import ROUTES from "@constants/routes";
import Link from "@components/Layout/Link";

type Props = {
  name: string;
  slug: string;
  imageUrl: string;
};

const DashboardDestinationListCard: React.FC<Props> = ({
  name,
  slug,
  imageUrl,
}: Props) => {
  return (
    <Container href={`${ROUTES.DASHBOARD_ADMIN_COUNTRIES}/${slug}`}>
      <ThumbnailImage src={imageUrl} loading={"lazy"} />
      <Title>{name}</Title>
    </Container>
  );
};

const Title = styled.h1<{ bold?: boolean }>`
  position: absolute;
  z-index: 2;
  width: 100%;
  bottom: 5px;
  text-align: center;
  line-height: 15px;
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: rgb(255, 255, 255);
`;

const ThumbnailImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  transition: all 0.2s;
`;

const Container = styled(Link)`
  position: relative;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  transition: transform 0.4s;
  overflow: hidden;
  // draw a shadow inside the card so the text is more readable
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 50px;
    left: 0;
    bottom: 0;
    background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
  }

  :hover {
    ${ThumbnailImage} {
      transform: scale(1.1);
    }
  }
`;

export default DashboardDestinationListCard;
