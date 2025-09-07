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
  users: any[];
  daysLength: number;
}

const UserChart: React.FC<Props> = ({ users, daysLength }: Props) => {
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

  // data is a list of the number of users registered in the last 30 days
  const data = Array.from(
    { length: daysLength },
    (_, i) =>
      users.filter(
        (user) =>
          convertDate(new Date(user.createdAt)) ===
          convertDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000))
      ).length
  ).reverse();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Nouveaux comptes créés",
        data,
        backgroundColor: "rgb(26, 188, 156)",
        borderColor: "rgb(26, 188, 156)",
        tension: 0.4,
        cubicInterpolationMode: (): "monotone" => "monotone",
      },
    ],
  };

  if (users && users.length > 0) {
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

export default UserChart;
