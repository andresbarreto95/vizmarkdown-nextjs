'use client';

import { useState } from 'react';
import ChartForm from '../components/ChartForm';
import ChartPreview from '../components/ChartPreview';

// Helper function to generate chart configuration
function generateChartConfig(chartData: any) {
  const labels = chartData.labels.split(',').map((label: string) => label.trim());
  const datasetLines = chartData.datasets.split('\n')
    .filter((line: string) => line.trim())
    .map((line: string) => line.split(',').map((val: string) => val.trim()));
  
  const datasets = datasetLines.map((values: string[]) => {
    const label = values[0];
    const data = values.slice(1).map(Number);
    
    return {
      label,
      data,
      backgroundColor: chartData.backgroundColor,
      borderColor: chartData.borderColor,
      borderRadius: parseInt(chartData.roundedBorders.toString()),
      barPercentage: 1 - parseFloat(chartData.barSpacing.toString())
    };
  });

  return {
    type: chartData.type,
    data: {
      labels,
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: !!chartData.title,
          text: chartData.title
        },
        datalabels: {
          display: chartData.showValues,
          color: '#666',
          font: {
            weight: 'bold'
          },
          formatter: (value: number) => value.toLocaleString()
        }
      },
      scales: {
        x: {
          title: {
            display: !!chartData.xAxisLabel,
            text: chartData.xAxisLabel
          }
        },
        y: {
          title: {
            display: !!chartData.yAxisLabel,
            text: chartData.yAxisLabel
          },
          beginAtZero: true
        }
      }
    }
  };
}

export default function Home() {
  const [chartData, setChartData] = useState({
    name: 'Sample Sales Chart',
    type: 'bar',
    title: 'Sales Performance',
    labels: 'Q1, Q2, Q3, Q4',
    datasets: 'Series A, 120, 190, 300, 500',
    xAxisLabel: 'Quarter',
    yAxisLabel: 'Sales',
    showValues: true,
    roundedBorders: 14,
    barSpacing: 0.2,
    backgroundColor: '#36a2eb',
    borderColor: '#36a2eb'
  });

  const [chartConfig, setChartConfig] = useState({});

  const handleFormChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setChartData(prevData => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const generateChart = () => {
    const config = generateChartConfig(chartData);
    setChartConfig(config);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartForm chartData={chartData} handleChange={handleFormChange} generateChart={generateChart} />
        <ChartPreview chartConfig={chartConfig} generateChart={generateChart} chartData={chartData} />
      </div>
    </main>
  );
}
