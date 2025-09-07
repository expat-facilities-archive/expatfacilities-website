import Image from "@components/Image";
import useTranslation from "@hooks/useTranslation";
import { Trip } from "@typeDefs/destinations";
import React from "react";
import styled from "styled-components";

interface Props {
  trip: Trip;
}

const DashboardTripDetailsCard: React.FC<Props> = ({ trip }: Props) => {
  const { t } = useTranslation("dashboard/trip");

  return (
    <Container>
      <Details>
        <Title>{t("overview.details.title")}</Title>

        <Rows>
          <Row>
            <Label>{t("overview.details.city")}</Label>
            <Value>{trip.city.name}</Value>
          </Row>

          <Row>
            <Label>{t("overview.details.startdate")}</Label>
            <Value>{new Date(trip.date.start).toLocaleDateString()}</Value>
          </Row>

          <Row>
            <Label>{t("overview.details.enddate")}</Label>
            <Value>{new Date(trip.date.end).toLocaleDateString()}</Value>
          </Row>
        </Rows>
      </Details>

      <ThumbnailContainer>
        <Thumbnail
          src={trip.city.country.thumbnailUrl}
          alt={trip.city.country.description}
          width={200}
          height={200}
        />
      </ThumbnailContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  padding: 20px;
  border-radius: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    flex-direction: column-reverse;
  }
`;

const Title = styled.h6`
  font-weight: ${({ theme }) => theme.weight.regular};
  font-size: ${({ theme }) => theme.size.medium};
`;

const Details = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    margin-top: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    margin-top: 0;
  }
`;

const Rows = styled.div`
  flex: 1;
  margin-top: 25px;

  & > *:not(:first-child) {
    margin-top: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.p`
  flex: 0.8;
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.medium};
  margin-right: 30px;
`;

const Value = styled.p`
  display: flex;
  flex: 1.2;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 10px;
  border-radius: 5px;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    display: none;
  }
`;

const Thumbnail = styled(Image)`
  border-radius: 5px;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export default DashboardTripDetailsCard;
