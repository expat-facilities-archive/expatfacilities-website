import React from "react";

import styled from "styled-components";

import useTranslation from "@hooks/useTranslation";
import Loading from "@components/Layout/Loading";
import TripServiceList from "../Service/List";
import ServiceList from "@components/Dashboard/Service/List";
import { DashboardSectionTitle } from "@components/Layout/Dashboard";
import { GET_SERVICES } from "@queries/services";

import { ServiceState, Trip, TripService } from "@typeDefs/destinations";
import type { Service } from "@typeDefs/services";
import { getStandaloneApolloClient } from "@services/apollo/client";

type Props = {
  trip: Trip;
};

const TripServicesList: React.FC<Props> = ({ trip }: Props) => {
  const { t } = useTranslation("dashboard/trip");

  const [loading, setLoading] = React.useState<boolean>(true);
  const [services, setServices] = React.useState<Service[]>([]);
  const [errors, setErrors] = React.useState<Error | null>(null);

  const [unpickedServices, setUnpickedServices] = React.useState<Service[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { query: apolloQuery } = await getStandaloneApolloClient();

      const response: { data: { getServices: Service[] } } = await apolloQuery({
        query: GET_SERVICES,
        variables: {
          countryIso2: trip.city.country.iso2,
          checkInDate: trip.date.start,
          checkOutDate: trip.date.end,
        },
      });

      return response;
    };

    fetchData()
      .then(({ data: { getServices: services } }) => {
        setServices(services);
        setUnpickedServices(
          services.filter(
            (s: Service) =>
              !trip.services.some(
                (ts: TripService) => ts.service.id === s.id
              ) && s.available
          )
        );
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [trip.city.country.iso2, trip.date.end, trip.date.start, trip.services]);

  if (loading) {
    return <Loading message={"Chargement des services de ton expatriation"} />;
  }

  if (errors) {
    return <div>{errors.message}</div>;
  }

  const renderServices = (): JSX.Element | JSX.Element[] => {
    switch (trip.state) {
      case ServiceState.DRAFTED:
      case ServiceState.COMPLETED:
        return (
          <ServiceListContainer>
            <DashboardSectionTitle>
              {trip.services && trip.services.length > 0
                ? t("overview.services.suggest")
                : t("overview.services.need")}
            </DashboardSectionTitle>
            <TripServiceListContainer>
              <ServiceList
                tripId={trip.id}
                services={unpickedServices.sort((a) => (!a.available ? 1 : -1))}
              />
            </TripServiceListContainer>
          </ServiceListContainer>
        );
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <TripServiceListContainer>
        <TripServiceList
          tripId={trip.id}
          tripServices={trip.services.map((ts: TripService) => ({
            ...ts,
            service:
              services.find((s: Service) => s.id === ts.service.id) ||
              ts.service,
          }))}
        />
      </TripServiceListContainer>

      {unpickedServices.length > 0 && renderServices()}
    </Container>
  );
};

const Container = styled.div``;

const ServiceListContainer = styled.div`
  margin-top: 10px;
`;

const TripServiceListContainer = styled.div`
  margin-top: 10px;
`;

export default TripServicesList;
