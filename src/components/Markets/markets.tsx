import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Search, Filter, Star, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
const marketData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: "173.50",
    change: "+1.2%",
    volume: "82.5M",
    positive: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: "378.85",
    change: "+0.8%",
    volume: "45.2M",
    positive: true,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet",
    price: "142.65",
    change: "-0.5%",
    volume: "33.1M",
    positive: false,
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: "175.35",
    change: "+2.1%",
    volume: "55.8M",
    positive: true,
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: "202.45",
    change: "-1.8%",
    volume: "128.4M",
    positive: false,
  },
];

const volumeData = [
  { time: "9:30", volume: 1200 },
  { time: "10:30", volume: 2100 },
  { time: "11:30", volume: 1800 },
  { time: "12:30", volume: 1600 },
  { time: "13:30", volume: 2400 },
  { time: "14:30", volume: 2800 },
  { time: "15:30", volume: 3200 },
];

const Markets = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Markets</h1>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Market Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Market Volume</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData}>
                    <XAxis dataKey="time" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                      }}
                    />
                    <Bar dataKey="volume" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Top Movers</h2>
              <div className="space-y-4">
                {marketData.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                      <div>
                        <div className="font-semibold">{stock.symbol}</div>
                        <div className="text-sm text-gray-400">
                          {stock.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${stock.price}</div>
                      <div
                        className={`text-sm ${
                          stock.positive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stock.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Table */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {marketData.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                        <span className="font-medium">{stock.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {stock.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      ${stock.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div
                        className={`flex items-center justify-end space-x-1 ${
                          stock.positive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stock.positive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span>{stock.change}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-300">
                      {stock.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Markets;