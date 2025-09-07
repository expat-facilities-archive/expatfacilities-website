import Progress from "@components/Layout/Progress";
import useTranslation from "@hooks/useTranslation";
import { ServiceState, TripService } from "@typeDefs/destinations";
import { Service } from "@typeDefs/services";
import React from "react";
import { useTheme } from "styled-components";

interface Props {
  service: TripService | Service;
}

const DashboardTripServiceProgress: React.FC<Props> = ({ service }: Props) => {
  const { t: tTrip } = useTranslation("dashboard/trip");

  const theme = useTheme();

  const progressBarData = [
    {
      value: 0,
      state: ServiceState.DRAFTED,
      title: tTrip("state-tracking.drafted.title"),
      content: tTrip("state-tracking.drafted.content"),
    },
    {
      value: 100,
      state: ServiceState.COMPLETED,
      title: tTrip("state-tracking.completed.title"),
      content: tTrip("state-tracking.completed.content"),
    },
  ];

  const currentServiceProgress =
    progressBarData.find(
      (progress) => progress.state === (service as TripService).state
    ) || progressBarData[0];

  return (
    <Progress
      value={
        currentServiceProgress.value === 100
          ? 100
          : currentServiceProgress.value + 5
      }
      states={{
        0: tTrip("state.service.drafted"),
        100: tTrip("state.service.completed"),
      }}
      colors={{
        "0": theme.colors.accent.light,
      }}
      checkpoints
    />
  );
};

export default DashboardTripServiceProgress;
