import { Line } from "react-chartjs-2";

function TrendChart({
  trendChartData
}) {

  if (!trendChartData) return null;

  return (
    <div>

      <h2>
        📈 Last 30 Days Trend
      </h2>

      <Line data={trendChartData} />

    </div>
  );
}

export default TrendChart;