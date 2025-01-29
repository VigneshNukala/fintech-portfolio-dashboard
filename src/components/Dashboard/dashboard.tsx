import { useEffect, useState } from "react";
import { LineChart } from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Briefcase,
  PieChartIcon,
} from "lucide-react";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import PortfolioGrowthChart from "../PortfolioGrowthChart/portfolioGrowthChart";
import AssetAllocationChart from "../AssetAllocationChart/assetAllocationChart";
import StrategyPerformanceChart from "../StrategyPerformanceChart/strategyPerformanceChart";
// import StrategyComparison from "../StrategyComparision/strategycomparision";

type PortfolioGrowthData = {
  date: string;
  value: number;
  returns: number;
};

type AssetAllocationData = {
  name: string;
  value: number;
};

type StrategyPerformanceData = {
  strategy: string;
  returns: number;
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
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-600">{title}</span>
      {icon}
    </div>
    <div className="flex items-baseline justify-between">
      <span className="text-xl sm:text-2xl font-bold text-gray-900">
        {value}
      </span>
      <span
        className={`px-2.5 py-0.5 rounded-full text-sm ${
          positive ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
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
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-medium text-gray-700">{title}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const Dashboard = () => {
  const [portData, setPortData] = useState<PortfolioGrowthData[]>([]);
  const [assetData, setAssetData] = useState<AssetAllocationData[]>([]);
  const [strategyData, setStraegyData] = useState<StrategyPerformanceData[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/investment.json");
      const data = await response.json();
      setPortData(data.portfolioGrowth);
      setAssetData(data.assetAllocation);
      setStraegyData(data.strategyPerformance);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900 pt-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
            Portfolio Overview
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Balance"
              value="$124,571.00"
              change="+2.3%"
              icon={<DollarSign className="h-6 w-6 text-green-600" />}
              positive
            />
            <StatCard
              title="Stocks"
              value="$89,125.00"
              change="+1.4%"
              icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
              positive
            />
            <StatCard
              title="Crypto"
              value="$35,446.00"
              change="-0.8%"
              icon={<TrendingDown className="h-6 w-6 text-red-600" />}
            />
            <StatCard
              title="Active Trades"
              value="12"
              change="+3"
              icon={<Activity className="h-6 w-6 text-purple-600" />}
              positive
            />
          </div>

          {/* Charts Grid */}
          <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-2 p-4 border-b">
                <LineChart className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Portfolio Growth
                </h2>
              </div>
              <PortfolioGrowthChart data={portData} />
            </div>

            <div className="bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-2 p-4 border-b">
                <PieChartIcon className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Asset Allocation
                </h2>
              </div>
              <AssetAllocationChart data={assetData} />
            </div>

            <div className="bg-white rounded-lg shadow-md lg:col-span-2">
              <div className="flex items-center gap-2 p-4 border-b">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Strategy Performance
                </h2>
              </div>
              <StrategyPerformanceChart data={strategyData} />
            </div>
          </div>

          {/* Portfolio Distribution */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Asset Distribution
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AssetCard
                title="Stocks"
                value="71.5%"
                icon={<Briefcase className="h-5 w-5 text-blue-600" />}
                percentage={71.5}
              />
              <AssetCard
                title="Crypto"
                value="28.5%"
                icon={<Activity className="h-5 w-5 text-purple-600" />}
                percentage={28.5}
              />
              <AssetCard
                title="Cash"
                value="0%"
                icon={<DollarSign className="h-5 w-5 text-green-600" />}
                percentage={0}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
