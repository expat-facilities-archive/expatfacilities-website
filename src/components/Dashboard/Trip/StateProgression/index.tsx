import React from "react";

import styled, { useTheme } from "styled-components";

import useTranslation from "@hooks/useTranslation";
import { TripState } from "@typeDefs/destinations";
import Progress from "@components/Layout/Progress";

type Props = {
  tripState: string;
};

const TripStateProgression: React.FC<Props> = ({ tripState }: Props) => {
  const { t: tTrip } = useTranslation("dashboard/trip");

  const theme = useTheme();

  const progressBarData = [
    {
      value: 0,
      state: TripState.DRAFTED,
      title: tTrip("state-tracking.drafted.title"),
      content: tTrip("state-tracking.drafted.content"),
    },
    {
      value: 25,
      state: TripState.COMPLETED,
      title: tTrip("state-tracking.completed.title"),
      content: tTrip("state-tracking.completed.content"),
    },
    {
      value: 50,
      state: TripState.PAID,
      title: tTrip("state-tracking.paid.title"),
      content: tTrip("state-tracking.paid.content"),
    },
    {
      value: 75,
      state: TripState.STARTED,
      title: tTrip("state-tracking.started.title"),
      content: tTrip("state-tracking.started.content"),
    },
    {
      value: 100,
      state: TripState.ENDED,
      title: tTrip("state-tracking.ended.title"),
      content: tTrip("state-tracking.ended.content"),
    },
  ];

  const currentTripProgress = progressBarData.find(
    (progress) => progress.state === tripState
  );

  return (
    <Container>
      {currentTripProgress ? (
        <Progress
          value={
            currentTripProgress.value === 100
              ? 100
              : currentTripProgress.value + 5
          }
          states={{
            0: tTrip("state.trip.drafted"),
            25: tTrip("state.trip.completed"),
            50: tTrip("state.trip.paid"),
            75: tTrip("state.trip.started"),
            100: tTrip("state.trip.ended"),
          }}
          colors={{
            "0": theme.colors.accent.light,
          }}
          checkpoints
        />
      ) : (
        <Progress
          value={100}
          states={{
            0: tTrip("state.trip.archived"),
          }}
          checkpoints={false}
          colors={{
            "0": theme.colors.accent.red,
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default TripStateProgression;
