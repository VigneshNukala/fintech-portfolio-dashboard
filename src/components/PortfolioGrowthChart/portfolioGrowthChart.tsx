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
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Portfolio Growth Over Time</h2>
      <div className="w-full max-w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
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
    </div>
  );
};

export default PortfolioGrowthChart;
