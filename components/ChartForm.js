'use client';

import { useState, useEffect } from 'react';

export default function ChartForm({ chartData, handleChange, generateChart }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Chart Definition</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chart Name</label>
          <input 
            type="text" 
            id="name" 
            value={chartData.name}
            onChange={handleChange}
            placeholder="My Awesome Chart" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
          <select 
            id="type" 
            value={chartData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="doughnut">Doughnut Chart</option>
            <option value="radar">Radar Chart</option>
            <option value="polarArea">Polar Area Chart</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chart Title</label>
          <input 
            type="text" 
            id="title" 
            value={chartData.title}
            onChange={handleChange}
            placeholder="Enter chart title" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Labels (comma-separated)</label>
          <input 
            type="text" 
            id="labels" 
            value={chartData.labels}
            onChange={handleChange}
            placeholder="Q1, Q2, Q3, Q4" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dataset (comma-separated numbers)</label>
          <textarea 
            id="datasets" 
            value={chartData.datasets}
            onChange={handleChange}
            rows="4" 
            placeholder="Series A, 120, 190, 300, 500&#10;Series B, 100, 150, 200, 250" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Axis labels */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis Label</label>
            <input 
              type="text" 
              id="xAxisLabel" 
              value={chartData.xAxisLabel}
              onChange={handleChange}
              placeholder="Quarter" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis Label</label>
            <input 
              type="text" 
              id="yAxisLabel" 
              value={chartData.yAxisLabel}
              onChange={handleChange}
              placeholder="Sales" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* Show values toggle */}
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="showValues" 
            checked={chartData.showValues}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
          />
          <label htmlFor="showValues" className="text-sm font-medium text-gray-700">Show Values on Chart</label>
        </div>

        {/* Bar-specific controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rounded Borders (bar only)</label>
          <input 
            type="range" 
            id="roundedBorders" 
            value={chartData.roundedBorders}
            onChange={handleChange}
            min="0" 
            max="100" 
            className="w-full" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Space Between Bars (bar only)</label>
          <input 
            type="range" 
            id="barSpacing" 
            value={chartData.barSpacing}
            onChange={handleChange}
            min="0" 
            max="1" 
            step="0.05" 
            className="w-full" 
          />
        </div>
        
        {/* Chart Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chart Colors</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Fill Color</label>
              <input 
                type="color" 
                id="backgroundColor" 
                value={chartData.backgroundColor}
                onChange={handleChange}
                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer" 
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Border Color</label>
              <input 
                type="color" 
                id="borderColor" 
                value={chartData.borderColor}
                onChange={handleChange}
                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={generateChart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Generate Chart
          </button>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Save Chart
          </button>
          <button 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
} 