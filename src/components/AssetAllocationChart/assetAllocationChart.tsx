import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface AssetAllocationData {
  name: string;
  value: number;
}

type AssetAllocationChartProps = {
  data: AssetAllocationData[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const AssetAllocationChart = ({ data }: AssetAllocationChartProps) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Asset Allocation</h2>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetAllocationChart;
