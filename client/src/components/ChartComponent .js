import React from 'react';
import { Line } from 'react-chartjs-2';
import { useGetProfitsQuery } from 'state/api';
import FlexBetween from "./FlexBetween";

const ChartComponent = () => {
const { data: realized_pnls } = useGetProfitsQuery();

  const chartData = {
    labels: realized_pnls.map((item) => item.time),
    datasets: [
      {
        label: 'Realized PNL',
        data: realized_pnls.map((item) => item.income),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  return <Line data={chartData} options={{ responsive: true }} />;
};

export default ChartComponent;
