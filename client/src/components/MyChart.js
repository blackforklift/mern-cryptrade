import React, { useEffect, useState, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { useGetOhlcQuery } from 'state/api';

const MyChart = () => {
  const [chartData, setChartData] = useState([]);
  const [latestCandle, setLatestCandle] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/');
    let isSocketOpen = false;

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/management/anasayfa');
        const initialChartData = await response.json();
        console.log(initialChartData); 
        setChartData(initialChartData.ohlchistory); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      isSocketOpen = true;
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data); // Log data

        setLatestCandle(data.data.k); // Update the latest candle data

        setChartData((prevChartData) => {
          const newData = prevChartData.concat(data);
          return newData.slice(Math.max(newData.length - 500, 0)); // Limit the array 
        });
      } catch (error) {
        console.error(error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
      isSocketOpen = false;
    };

    return () => {
      if (isSocketOpen) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      const datahist = chartData.map((item) => ({
        x: new Date(item.openTime),
        y: [item.open, item.high, item.low, item.close],
      }));

      const options = {
        chart: {
          type: 'candlestick',
          height: 500,
          width: 900,
         
        },
        series: [
          {
            data: datahist,
          },
        ],
        xaxis: {
          type: 'datetime',
        },
      };

      if (latestCandle) {
        const latestCandleData = {
          x: new Date(latestCandle.t),
          y: [latestCandle.o, latestCandle.h, latestCandle.l, latestCandle.c],
        };
        options.series[0].data.push(latestCandleData); // Add the latest candle to the series data
      }

      if (chartInstance.current) {
        //  update the options and render the chart again
        chartInstance.current.updateOptions(options);
      } else {
        // Create a new chart instance and render it
        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();
      }
    }
  }, [chartData, latestCandle]);

  return <div ref={chartRef} id="candlestick-chart"></div>;
};

export default MyChart;
