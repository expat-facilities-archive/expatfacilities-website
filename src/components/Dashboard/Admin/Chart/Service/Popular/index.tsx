import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import convertDate from "@utils/convertDate";
import styled from "styled-components";
import React from "react";
import { Trip, TripService } from "@typeDefs/destinations";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

interface Props {
  trips: Trip[];
  daysLength: number;
}

const PopularServiceChart: React.FC<Props> = ({ trips, daysLength }: Props) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Stats",
      },
    },
  };

  // labels is a list of the last 30 days from 30 to today
  const labels = Array.from({ length: daysLength }, (_, i) =>
    convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000))
  ).reverse();

  // visa is a list of the number of trips that include the visa service in the last 30 days
  const visa = Array.from(
    { length: daysLength },
    (_, i) =>
      trips.filter(
        (trip) =>
          convertDate(new Date(trip.date.creation)) ===
            convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000)) &&
          trip.services.filter(
            (tripService: TripService) => tripService.service.type === "visa"
          ).length > 0
      ).length
  ).reverse();

  // housing is a list of the number of trips that include the housing service in the last 30 days
  const housing = Array.from(
    { length: daysLength },
    (_, i) =>
      trips.filter(
        (trip) =>
          convertDate(new Date(trip.date.creation)) ===
            convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000)) &&
          trip.services.filter(
            (tripService: TripService) => tripService.service.type === "housing"
          ).length > 0
      ).length
  ).reverse();

  // insurance is a list of the number of trips that include the insurance service in the last 30 days
  const insurance = Array.from(
    { length: daysLength },
    (_, i) =>
      trips.filter(
        (trip) =>
          convertDate(new Date(trip.date.creation)) ===
            convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000)) &&
          trip.services.filter(
            (tripService: TripService) =>
              tripService.service.type === "insurance"
          ).length > 0
      ).length
  ).reverse();

  // transportation is a list of the number of trips that include the transportation service in the last 30 days
  const transportation = Array.from(
    { length: daysLength },
    (_, i) =>
      trips.filter(
        (trip) =>
          convertDate(new Date(trip.date.creation)) ===
            convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000)) &&
          trip.services.filter(
            (tripService: TripService) =>
              tripService.service.type === "transportation"
          ).length > 0
      ).length
  ).reverse();

  // ambassador is a list of the number of trips that include the ambassador service in the last 30 days
  const ambassador = Array.from(
    { length: daysLength },
    (_, i) =>
      trips.filter(
        (trip) =>
          convertDate(new Date(trip.date.creation)) ===
            convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000)) &&
          trip.services.filter(
            (tripService: TripService) =>
              tripService.service.type === "ambassador"
          ).length > 0
      ).length
  ).reverse();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Visa",
        data: visa,
        backgroundColor: "#FF6B6B",
        borderColor: "#FF6B6B",
        tension: 0.4,
        cubicInterpolationMode: (): "monotone" => "monotone",
      },
      {
        label: "Logement",
        data: housing,
        backgroundColor: "#FFD93D",
        borderColor: "#FFD93D",
        tension: 0.4,
        cubicInterpolationMode: (): "monotone" => "monotone",
      },
      {
        label: "Assurance",
        data: insurance,
        backgroundColor: "#6BCB77",
        borderColor: "#6BCB77",
        tension: 0.4,
        cubicInterpolationMode: (): "monotone" => "monotone",
      },
      {
        label: "Transport",
        data: transportation,
        backgroundColor: "#4D96FF",
        borderColor: "#4D96FF",
        tension: 0.4,
        cubicInterpolationMode: (): "monotone" => "monotone",
      },
      {
        label: "Ambassadeur",
        data: ambassador,
        backgroundColor: "#F190B7",
        borderColor: "#F190B7",
        tension: 0.4,
        cubicInterpolationMode: (): "monotone" => "monotone",
      },
    ],
  };

  if (trips && trips.length > 0) {
    return <StyledChart data={chartData} options={options} />;
  } else {
    return <></>;
  }
};

const StyledChart = styled(Line)`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
`;

export default PopularServiceChart;
