import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type StrategyPerformanceData = {
  strategy: string;
  returns: number;
}

type StrategyPerformanceChartProps = {
  data: StrategyPerformanceData[];
}

const StrategyPerformanceChart = ({ data }: StrategyPerformanceChartProps) => {
  return (
    <div className="w-full h-[400px] p-4">
      <h2 className="text-xl font-semibold mb-4">Strategy Performance</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="strategy" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="returns" fill="#8884d8" name="Returns (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrategyPerformanceChart;