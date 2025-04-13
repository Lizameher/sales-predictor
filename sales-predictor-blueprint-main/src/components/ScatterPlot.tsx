
import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Label
} from 'recharts';

interface DataPoint {
  advertising: number;
  sales: number;
}

interface ScatterPlotProps {
  data: DataPoint[];
  slope: number;
  intercept: number;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, slope, intercept }) => {
  // Generate points for the regression line
  const minAd = Math.min(...data.map(d => d.advertising));
  const maxAd = Math.max(...data.map(d => d.advertising));
  
  const regressionLineData = [
    { advertising: minAd, sales: intercept + slope * minAd },
    { advertising: maxAd, sales: intercept + slope * maxAd }
  ];

  // Format for tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">Advertising: ${payload[0].payload.advertising}k</p>
          <p className="text-brand-teal font-medium">Sales: ${payload[0].payload.sales}k</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 20, right: 30, bottom: 40, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="advertising" 
          name="Advertising" 
          type="number"
          label={{ 
            value: 'Advertising Spend ($000s)', 
            position: 'insideBottom', 
            offset: -10,
            style: { textAnchor: 'middle' }
          }}
          tickFormatter={(value) => `$${value}k`}
        />
        <YAxis 
          dataKey="sales" 
          name="Sales" 
          type="number"
          label={{ 
            value: 'Sales ($000s)', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' } 
          }}
          tickFormatter={(value) => `$${value}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Scatter 
          name="Sales Data" 
          data={data} 
          fill="#73c2fb" 
          shape="circle" 
        />
        <Scatter
          name="Regression Line"
          data={regressionLineData}
          line={{ stroke: '#4bb3a6', strokeWidth: 2 }}
          lineType="fitting"
          shape={<></>}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
