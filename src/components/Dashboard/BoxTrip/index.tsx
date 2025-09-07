import router from "next/router";
import React from "react";
import { formatAmount } from "@utils/formatAmount";

import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import { Trip } from "@typeDefs/destinations";
import { DashboardButton } from "@components/Layout/Dashboard";
import Icon from "@components/Layout/Icon";
import ROUTES from "@constants/routes";
import DashboardTripLabel from "../Trip/Label";
import DashboardTripServiceState from "../Trip/Service/Label";

type Props = {
  trip: Trip;
};

const BoxTrip: React.FC<Props> = ({ trip }: Props) => {
  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tService } = useTranslation("data/services");
  const { t: tTrip } = useTranslation("dashboard/trip");

  const handleClickCompleteTrip = () => {
    router.push(`${ROUTES.DASHBOARD_TRIPS}/${trip.id}`);
  };

  const startDate = new Date(trip.date.start);

  console.log(trip);

  return (
    <Container>
      <ImgTrip bgUrl={trip.city.country.thumbnailUrl} />
      <Info>
        <SectionInfo justify={"end"}>
          <SectionInfo>
            <Title>{trip.city.name}</Title>
            <SubTitle>
              {startDate > new Date()
                ? `${tTrip("list.start")} ${startDate.toLocaleDateString()}`
                : `${tTrip("list.started")} ${startDate.toLocaleDateString()}`}
            </SubTitle>
          </SectionInfo>

          <ServiceSection>
            <ItemServiceHeader>
              <TitleService>{tTrip("list.services")}</TitleService>
            </ItemServiceHeader>

            {trip.services.map((service) => (
              <ItemServices key={service.id}>
                <ItemDisplay>
                  <ItemServiceInfo>
                    <ItemServiceName>
                      {tService(service.service.name)}
                    </ItemServiceName>
                    <ItemServiceDoc>
                      {`1 ${tCommon("on")} 3 ${tTrip(
                        "overview.services.documents-provided"
                      )}`}
                    </ItemServiceDoc>
                  </ItemServiceInfo>
                  <DashboardTripServiceState state={service.state} />
                </ItemDisplay>
              </ItemServices>
            ))}
          </ServiceSection>

          <ItemEnd>
            <StatusTrip>
              <TitleService>
                {tTrip("overview.services.tripstatus")}
              </TitleService>
              <TripStatus state={trip.state} />
            </StatusTrip>

            <StatusTrip align={"end"}>
              <TitleService>
                {tTrip("overview.services.totalcost")}
              </TitleService>
              <Price>{formatAmount(trip.totalPrice)}</Price>
              <CompleteTripButton
                onClick={handleClickCompleteTrip}
                prefix={<Icon name={"eye"} fill />}
              >
                {tTrip("overview.services.completemytrip")}
              </CompleteTripButton>
            </StatusTrip>
          </ItemEnd>
        </SectionInfo>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  margin: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.text.lightest};
  padding: 20px;
  display: flex;
  flex-flow: row nowrap;
  /* gap: 30px; */
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-flow: column nowrap;
  }
`;

const ImgTrip = styled.div<{ bgUrl: string }>`
  background: ${({ bgUrl }) => `url(${bgUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  width: 40%;
  margin-right: 30px;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 100%;
    padding-bottom: 60%;
    margin-bottom: 30px;
    margin-right: 0;
  }
`;

const Info = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: end;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 100%;
  }
`;

const SectionInfo = styled.div<{ justify?: string }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: ${({ justify }) => justify};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.size.extraTitle};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  /* TODO update color when update the theme system */
  color: ${({ theme }) => theme.colors.layout.lighter};
`;

const ServiceSection = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  width: 350px;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 100%;
  }
`;

const ItemServiceHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const TitleService = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.medium};
  /* TODO update color when update the theme system */
  color: ${({ theme }) => theme.colors.layout.lighter};
`;

const TripStatus = styled(DashboardTripLabel)`
  margin-top: 10px;
`;

const ItemServices = styled.li`
  list-style: none;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  color: ${({ theme }) => theme.colors.text.lightest};
`;

const ItemDisplay = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const ItemServiceInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 10px;
`;

const ItemServiceName = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
`;

const ItemServiceDoc = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.regular};
  /* TODO update color when update the theme system */
  color: ${({ theme }) => theme.colors.layout.lighter};
  margin-bottom: 10px;
`;

const ItemEnd = styled(ItemDisplay)`
  margin-top: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const StatusTrip = styled.div<{ align?: string }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: end;
  align-items: ${({ align }) => align};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    align-items: center;
    text-align: center;
  }
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.colors.accent.light};
`;

const CompleteTripButton = styled(DashboardButton)`
  margin-top: 20px;
`;

export default BoxTrip;
