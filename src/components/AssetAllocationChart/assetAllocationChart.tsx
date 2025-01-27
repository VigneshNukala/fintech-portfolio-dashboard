import {
  PieChart,
  Pie,
//   Cell,
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

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const AssetAllocationChart = ({ data }: AssetAllocationChartProps) => {
    console.log(data)
  return (
    <div className="w-full h-[400px] p-4">
      <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {/* {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))} */}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetAllocationChart;
