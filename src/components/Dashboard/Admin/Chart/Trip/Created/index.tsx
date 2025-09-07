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
  trips: any[];
  daysLength: number;
}

const TripChart: React.FC<Props> = ({ trips, daysLength }: Props) => {
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

  // data is a list of the number of trips registered in the last 30 days
  const data = Array.from(
    { length: daysLength },
    (_, i) =>
      trips.filter(
        (trip) =>
          convertDate(new Date(trip.date.creation)) ===
          convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000))
      ).length
  ).reverse();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Voyages créés",
        data,
        backgroundColor: "#FF6B6B",
        borderColor: "#FF6B6B",
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

export default TripChart;
