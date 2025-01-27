import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";

type MarketData = {
  symbol: string;
  name: string;
  priceDisplay: string;
  price: number;
  change: string;
  volumeDisplay: string;
  volume: number;
  positive: boolean;
};

type VolumeData = {
  time: string;
  volume: number;
};

const Markets = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [volumeData, setVolumeData] = useState<VolumeData[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/markets.json");
      const data = await response.json();

      setMarketData(data.marketData);
      setVolumeData(data.volumeData);
    };

    fetchData();
  }, []);
  
  const searchResults = marketData.filter((each) =>
    each.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  const filteredData = selectedVolume === "all" ? marketData : marketData.filter((stock) => stock.volume <= parseInt(selectedVolume));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 pt-20 px-4 sm:px-6 lg:px-8 mt-5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Markets
            </h1>
            <div className="flex space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search markets..."
                  className="w-full bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md w-full sm:w-auto">
              <label className="text-gray-700 font-medium">Filter By Volume</label>
              <div className="relative w-full sm:w-auto">
                <select
                  id="volumeFilter"
                  className="p-2 rounded-md border w-full"
                  value={selectedVolume}
                  onChange={(e) => setSelectedVolume(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="50000000">50,00,00,000+</option>
                  <option value="80000000">80,00,00,000+</option>
                  <option value="1200000000">1,20,00,00,000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Market Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Market Volume */}
            {selectedVolume === 'all' && (!searchInput && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Market Volume
                </h2>
                <div className="h-[300px] overflow-y-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volumeData}>
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E5E7EB",
                        }}
                        labelStyle={{ color: "#374151" }}
                        itemStyle={{ color: "#1F2937" }}
                      />
                      <Bar dataKey="volume" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}

            {/* Top Movers */}
            {!searchInput && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Top Movers
                </h2>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {filteredData.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Star className="h-5 w-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                        <div>
                          <div className="font-semibold text-gray-800">
                            {stock.symbol}
                          </div>
                          <div className="text-sm text-gray-500">
                            {stock.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${stock.price}
                        </div>
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
            )}
          </div>

          {/* Market Table */}
          {selectedVolume === 'all' && (
            <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
              <div className="max-h-[400px] overflow-y-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Symbol
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        24h Change
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {searchResults.map((stock) => (
                      <tr
                        key={stock.symbol}
                        className="hover:bg-gray-50 transition-all duration-200"
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-gray-400 hover:text-yellow-500 cursor-pointer" />
                            <span className="font-medium text-gray-800">
                              {stock.symbol}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
                          {stock.name}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-700">
                          ${stock.priceDisplay}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
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
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-gray-700">
                          {stock.volumeDisplay}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Markets;
