import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import useBreakpoint from "@hooks/useBreakpoint";
import Card from "./Card";

const DestinationGallery: React.FC = () => {
  const { t } = useTranslation("trippicturesgrid/common");
  const { isMobile } = useBreakpoint();

  return (
    <Container>
      <Title>{t("title")}</Title>
      <SubTitle>{t("subtitle")}</SubTitle>
      <ThumbnailsContainer>
        <Row>
          <Card
            src={"/static/images/destinations/tokyo.jpg"}
            height={isMobile ? 330 : 650}
            place={"Tokyo"}
            photographer={"Jezael Melgoza"}
          />
          <Column>
            <Card
              src={"/static/images/destinations/dubrovnik.jpg"}
              height={isMobile ? 200 : 310}
              place={"Dubrovnik"}
              photographer={"Matthias Mullie"}
            />
            <Card
              src={"/static/images/destinations/rio.jpg"}
              height={isMobile ? 200 : 310}
              place={"Rio de Janeiro"}
              photographer={"Matthias Mullie"}
              marginTop={true}
            />
          </Column>
        </Row>
        <Row>
          <Card
            src={"/static/images/destinations/dubai.jpg"}
            height={595}
            place={"Dubai"}
            photographer={"Alex"}
          />
          <Card
            src={"/static/images/destinations/londre.jpg"}
            height={595}
            place={"Londres"}
            photographer={"Alex"}
          />
          <Card
            src={"/static/images/destinations/tetouan.jpg"}
            height={595}
            place={"Tétouan"}
            photographer={"Taryn Elliott"}
          />
        </Row>
      </ThumbnailsContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 70px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.large};
  }
`;
const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
  }
`;

const ThumbnailsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.layout.dark};
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  border-radius: 10px;
  box-sizing: border-box;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;

  :first-child {
    margin-top: -15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default DestinationGallery;
