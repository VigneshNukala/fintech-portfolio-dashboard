import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type dateData = {
  date: string;
  value: number;
};

type StrategyData = {
  name: string;
  data: dateData[];
};

type StrategyComparisionProps = {
  data: StrategyData[];
};

const StrategyComparison = ({ data }: StrategyComparisionProps) => {
  const [selectedStrategy1, setSelectedStrategy1] = useState<string>(
    data[0]?.name || ""
  );
  const [selectedStrategy2, setSelectedStrategy2] = useState<string>(
    data[1]?.name || ""
  );

  const handleStrategy1Change = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedStrategy1(event.target.value);
  };

  const handleStrategy2Change = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedStrategy2(event.target.value);
  };

  const filteredData = data
    .filter(
      (strategy) =>
        strategy.name === selectedStrategy1 ||
        strategy.name === selectedStrategy2
    )
    .map((strategy) => ({
      name: strategy.name,
      data: strategy.data,
    }));

  return (
    <div>
      <h2>Strategy Comparison</h2>
      <div>
        <label htmlFor="strategy1">Strategy 1:</label>
        <select
          id="strategy1"
          value={selectedStrategy1}
          onChange={handleStrategy1Change}
        >
          {data.map((strategy) => (
            <option key={strategy.name} value={strategy.name}>
              {strategy.name}
            </option>
          ))}
        </select>

        <label htmlFor="strategy2">Strategy 2:</label>
        <select
          id="strategy2"
          value={selectedStrategy2}
          onChange={handleStrategy2Change}
        >
          {data.map((strategy) => (
            <option key={strategy.name} value={strategy.name}>
              {strategy.name}
            </option>
          ))}
        </select>
      </div>
      <LineChart
        width={730}
        height={250}
        data={filteredData[0]?.data || []}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {filteredData.map((data, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey="value"
            data={data.data}
            name={data.name}
            stroke={colors[index % colors.length]}
          />
        ))}
      </LineChart>
    </div>
  );
};

const colors = ["#8884d8", "#82ca9d"];

export default StrategyComparison;
