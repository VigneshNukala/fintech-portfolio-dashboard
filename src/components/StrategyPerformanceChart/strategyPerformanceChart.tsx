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
};

type StrategyPerformanceChartProps = {
  data: StrategyPerformanceData[];
};

const StrategyPerformanceChart = ({ data }: StrategyPerformanceChartProps) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
        Strategy Performance
      </h2>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="strategy" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="returns" fill="#8884d8" name="Returns (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StrategyPerformanceChart;
