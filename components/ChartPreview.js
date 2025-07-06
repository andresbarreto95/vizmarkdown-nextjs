'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

export default function ChartPreview({ chartConfig, generateChart, chartData }) {
  const [embedUrl, setEmbedUrl] = useState('');

  // Generate embed URL when chartData changes
  useEffect(() => {
    if (chartData && Object.keys(chartConfig).length > 0) {
      const chartDataForEmbed = {
        name: chartData.name,
        config: chartConfig
      };
      const baseUrl = window.location.origin + window.location.pathname;
      const compressedData = btoa(JSON.stringify(chartDataForEmbed));
      const embedUrl = `${baseUrl}?embed=true&data=${encodeURIComponent(compressedData)}`;
      setEmbedUrl(embedUrl);
    }
  }, [chartData, chartConfig]);

  // Function to copy embed URL
  const copyEmbedUrl = async () => {
    if (!embedUrl) {
      alert('Generate a chart first');
      return;
    }
    try {
      await navigator.clipboard.writeText(embedUrl);
      alert('Embed URL copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = embedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Embed URL copied to clipboard!');
    }
  };

  // Function to download chart as image
  const downloadChart = () => {
    if (!chartConfig || Object.keys(chartConfig).length === 0) {
      alert('Please generate a chart first');
      return;
    }
    
    // Create a temporary canvas to render the chart
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Create a temporary chart instance for download
    const tempChart = new ChartJS(ctx, chartConfig);
    
    // Convert to data URL and download
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${chartData.name || 'chart'}.png`;
    link.href = dataURL;
    link.click();
    
    // Clean up
    tempChart.destroy();
  };

  // Render the appropriate chart component based on type
  const renderChart = () => {
    if (!chartConfig || Object.keys(chartConfig).length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>Generate a chart to see the preview</p>
        </div>
      );
    }

    const chartProps = {
      data: chartConfig.data,
      options: chartConfig.options
    };

    switch (chartConfig.type) {
      case 'bar':
        return <Bar {...chartProps} />;
      case 'line':
        return <Line {...chartProps} />;
      case 'pie':
        return <Pie {...chartProps} />;
      case 'doughnut':
        return <Doughnut {...chartProps} />;
      case 'radar':
        return <Radar {...chartProps} />;
      case 'polarArea':
        return <PolarArea {...chartProps} />;
      default:
        return <Bar {...chartProps} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>
      <div className="chart-container">
        {renderChart()}
      </div>
      
      {/* Embed Codes */}
      <div className="mt-6 space-y-4">
        <div className="mb-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800 text-sm rounded">
            <strong>For Notion:</strong> Use the <b>Download as Image</b> button below, then upload the PNG to Notion using the <b>/image</b> block. Notion does not support live embeds from custom web apps.
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website Embed URL</label>
          <div className="flex">
            <textarea 
              value={embedUrl}
              readOnly 
              rows="2" 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm font-mono" 
            />
            <button 
              onClick={copyEmbedUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-md text-sm font-medium transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">Note: For embedding in websites that support iframes. For Notion, use the Download as Image option below.</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Email Static Image</label>
            <button 
              onClick={downloadChart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-medium transition-colors"
            >
              Download as Image
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">Download the chart as a PNG image to use in emails or other platforms.</p>
        </div>
      </div>
    </div>
  );
} 