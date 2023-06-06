import React, { useEffect, useState } from 'react';
import { useGetProfitsQuery } from 'state/api';
import { Line } from 'react-chartjs-2';

const Predictions = () => {
   
  const { data: realized_pnls } = useGetProfitsQuery();
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (Array.isArray(realized_pnls)) {
        const mappedData = realized_pnls.map((item) => ({ time: item.time, income: item.income }));
        setChartData(mappedData);
        console.log(mappedData); // Log the chart data when it gets updated
      }
    } catch (err) {
      setError(err);
    }
  }, [realized_pnls]);

  if (chartData.length === 0) {
    return <div>Loading chart data...</div>;
  }

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Income',
        },
      },
    },
  };

  const chartDataConfig = {
    labels: chartData.map((item) => item.time),
    datasets: [
      {
        label: 'Income',
        data: chartData.map((item) => item.income),
        borderColor: '#8884d8',
        backgroundColor: 'transparent',
        pointRadius: 6,
      },
    ],
  };

  return <Line data={chartDataConfig} options={chartOptions} />;
};

export default Predictions;
