import React from "react";

import styled from "styled-components";

import { Trip } from "@typeDefs/destinations";
import {
  DashboardList,
  DashboardListCard,
  DashboardListCol,
} from "@components/Layout/Dashboard";
import ROUTES from "@constants/routes";
import { formatAmount } from "@utils/formatAmount";
import Link from "@components/Layout/Link";
import useTranslation from "@hooks/useTranslation";

type Props = {
  trips: Trip[];
};

const TripList: React.FC<Props> = ({ trips }: Props) => {
  const { t } = useTranslation("dashboard/trip");
  return (
    <Wrapper>
      <DashboardList>
        {trips.map((trip: Trip) => (
          <DashboardListCard
            key={trip.id}
            as={Link}
            href={`${ROUTES.DASHBOARD_TRIPS}/${trip.id}`}
          >
            <DashboardListCol>
              {t("list.tripto")} {trip.city.name}
            </DashboardListCol>
            <DashboardListCol>{formatAmount(trip.totalPrice)}</DashboardListCol>
            <DashboardListCol>
              {trip.services.length}{" "}
              {trip.services.length === 1
                ? t("list.service")
                : t("list.services")}
            </DashboardListCol>
            <DashboardListCol>
              {t("list.tripstate")} {trip.state}
            </DashboardListCol>
          </DashboardListCard>
        ))}
      </DashboardList>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TripList;
