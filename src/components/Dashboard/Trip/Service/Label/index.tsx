import React from "react";

import DashboardLabel, { LabelType } from "@components/Dashboard/Label";
import useTranslation from "@hooks/useTranslation";
import { ServiceState } from "@typeDefs/destinations";
import Badge from "@components/Layout/Badge";

interface Props {
  state: string;
}

const DashboardTripServiceState: React.FC<Props> = ({ state }: Props) => {
  const { t } = useTranslation("dashboard/trip");

  switch (state) {
    case ServiceState.DRAFTED:
      return (
        <Badge size={"small"} mode={"yellow"}>
          {t("state.service.drafted")}
        </Badge>
      );
    case ServiceState.COMPLETED:
      return (
        <Badge size={"small"} mode={"green"}>
          {t("state.service.completed")}
        </Badge>
      );
    default:
      return <DashboardLabel type={LabelType.DANGER} content={t(state)} />;
  }
};

export default DashboardTripServiceState;
