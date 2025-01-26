import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Briefcase,
} from "lucide-react";
import Navbar from "../Navbar/navbar";

// const data = [
//   { name: "Jan", value: 4000 },
//   { name: "Feb", value: 3000 },
//   { name: "Mar", value: 5000 },
//   { name: "Apr", value: 2780 },
//   { name: "May", value: 1890 },
//   { name: "Jun", value: 2390 },
// ];

const performanceData = [
  { name: "Mon", stocks: 3000, crypto: 1400 },
  { name: "Tue", stocks: 3500, crypto: 1200 },
  { name: "Wed", stocks: 3200, crypto: 1600 },
  { name: "Thu", stocks: 4000, crypto: 1800 },
  { name: "Fri", stocks: 3800, crypto: 1700 },
];

const strategies = [
  {
    name: "Strategy A",
    performance: [
      { date: "2023-01-01", value: 100 },
      { date: "2023-01-15", value: -0.01 },
    ],
  },
  {
    name: "Strategy B",
    performance: [
      { date: "2023-01-01", value: 90 },
      { date: "2024-01-30", value: 0.03 },
    ],
  },
];

type PerformanceData = {
  date: string;
  value: number;
};
type Strategy = {
  name: string;
  performance: PerformanceData[];
};

type StrategyComparisonProps = {
  strategies: Strategy[];
};
const StrategyComparison = ({ strategies }: StrategyComparisonProps) => {
  const [selectedStrategies, setSelectedStrategies] = useState<Strategy[]>([]);

  const handleStrategySelect = (strategy: Strategy) => {
    if (selectedStrategies.includes(strategy)) {
      setSelectedStrategies(selectedStrategies.filter((s) => s !== strategy));
    } else {
      setSelectedStrategies([...selectedStrategies, strategy]);
    }
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl mt-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Strategy Comparison
      </h2>

      {/* Strategy selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {strategies.map((strategy) => (
          <button
            key={strategy.name}
            className={`px-4 py-2 rounded ${
              selectedStrategies.includes(strategy)
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleStrategySelect(strategy)}
          >
            {strategy.name}
          </button>
        ))}
      </div>

      {/* Comparison chart */}
      {selectedStrategies.length > 0 && (
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedStrategies[0].performance}>
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
              />
              {selectedStrategies.map((strategy, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey="value"
                  name={strategy.name}
                  stroke={index === 0 ? "#8884d8" : "#82ca9d"}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
};

const StatCard = ({
  title,
  value,
  change,
  icon,
  positive = false,
}: StatCardProps) => (
  <div className="bg-gray-800 p-4 sm:p-6 rounded-xl">
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-400">{title}</span>
      {icon}
    </div>
    <div className="flex items-baseline justify-between">
      <span className="text-xl sm:text-2xl font-bold">{value}</span>
      <span
        className={`px-2.5 py-0.5 rounded-full text-sm ${
          positive
            ? "text-green-500 bg-green-500/10"
            : "text-red-500 bg-red-500/10"
        }`}
      >
        {change}
      </span>
    </div>
  </div>
);

type AssetCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  percentage: number;
};

const AssetCard = ({ title, value, icon, percentage }: AssetCardProps) => (
  <div className="bg-gray-900 p-4 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const Dashboard = () => {
  const [data,setData] = useState([])
  useEffect(() => {
    fetch("/dummy_data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white pt-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Portfolio Overview
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Total Balance"
              value="$124,571.00"
              change="+2.3%"
              icon={<DollarSign className="h-6 w-6 text-green-500" />}
              positive
            />
            <StatCard
              title="Stocks"
              value="$89,125.00"
              change="+1.4%"
              icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
              positive
            />
            <StatCard
              title="Crypto"
              value="$35,446.00"
              change="-0.8%"
              icon={<TrendingDown className="h-6 w-6 text-red-500" />}
            />
            <StatCard
              title="Active Trades"
              value="12"
              change="+3"
              icon={<Activity className="h-6 w-6 text-purple-500" />}
              positive
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Portfolio Performance
              </h2>
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient
                        id="colorStocks"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorCrypto"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8B5CF6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="stocks"
                      stroke="#3B82F6"
                      fillOpacity={1}
                      fill="url(#colorStocks)"
                    />
                    <Area
                      type="monotone"
                      dataKey="crypto"
                      stroke="#8B5CF6"
                      fillOpacity={1}
                      fill="url(#colorCrypto)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Market Trends
              </h2>
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="min-h-screen bg-gray-900 text-white pt-20 px-4 sm:px-6">
              <div className="max-w-7xl mx-auto">
                <StrategyComparison strategies={strategies} />
              </div>
            </div>
          </div>

          {/* Portfolio Distribution */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-xl mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Asset Distribution
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AssetCard
                title="Stocks"
                value="71.5%"
                icon={<Briefcase className="h-5 w-5 text-blue-500" />}
                percentage={71.5}
              />
              <AssetCard
                title="Crypto"
                value="28.5%"
                icon={<Activity className="h-5 w-5 text-purple-500" />}
                percentage={28.5}
              />
              <AssetCard
                title="Cash"
                value="0%"
                icon={<DollarSign className="h-5 w-5 text-green-500" />}
                percentage={0}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
