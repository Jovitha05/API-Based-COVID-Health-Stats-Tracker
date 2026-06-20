import { Bar } from "react-chartjs-2";

function TopCountriesChart({
  chartData
}) {
  return (
    <div>

      <h2>
        📊 Top 10 Countries by Cases
      </h2>

      <Bar data={chartData} />

    </div>
  );
}

export default TopCountriesChart;