import React from "react";

import { TripState } from "@typeDefs/destinations";
import useTranslation from "@hooks/useTranslation";
import Badge from "@components/Layout/Badge";

interface Props {
  state: string;
  className?: string;
}

const DashboardTripLabel: React.FC<Props> = ({ state, ...props }: Props) => {
  const { t } = useTranslation("dashboard/trip");

  switch (state) {
    case TripState.DRAFTED:
      return (
        <Badge size={"normal"} mode={"yellow"} {...props}>
          {t("state.trip.drafted")}
        </Badge>
      );
    case TripState.COMPLETED:
      return (
        <Badge size={"normal"} mode={"blue"} {...props}>
          {t("state.trip.completed")}
        </Badge>
      );
    default:
      return (
        <Badge size={"normal"} mode={"white"} {...props}>
          {t(state)}
        </Badge>
      );
  }
};

export default DashboardTripLabel;
