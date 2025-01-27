// import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
  

type PortfolioGrowthData = {
    date: string;
    value: number;
    returns: number;
  };
  
  type PortfolioGrowthChartProps = {
    data: PortfolioGrowthData[];
  };
  
  const PortfolioGrowthChart = ({ data }: PortfolioGrowthChartProps) => {
    // console.log(data)
    return (
      <div className="w-full h-[400px] p-4">
        <h2 className="text-xl font-semibold mb-4">Portfolio Growth Over Time</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              name="Portfolio Value ($)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="returns"
              stroke="#82ca9d"
              name="Monthly Returns (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default PortfolioGrowthChart;
  