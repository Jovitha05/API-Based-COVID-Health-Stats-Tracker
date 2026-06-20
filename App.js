import React, { useEffect, useState } from "react";
import {
  getGlobalStats,
  getCountryStats,
  getAllCountries,
  getHistoricalData
} from "./services/api";

import DashboardCards from "./components/DashboardCards";
import SearchCountry from "./components/SearchCountry";
import TopCountriesChart from "./components/TopCountriesChart";
import TrendChart from "./components/TrendChart";
import RankingTable from "./components/RankingTable";
import AIInsight from "./components/AIInsight";
import DarkModeToggle from "./components/DarkModeToggle";

import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  const [stats, setStats] = useState(null);
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [topCountries, setTopCountries] = useState([]);
  const [trendData, setTrendData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    getGlobalStats()
      .then((response) => {
        setStats(response.data);
      })
      .catch(console.error);

    getAllCountries()
      .then((response) => {

        const sorted = response.data
          .sort((a, b) => b.cases - a.cases)
          .slice(0, 10);

        setTopCountries(sorted);

      })
      .catch(console.error);

  }, []);

  const searchCountry = () => {

    if (!country.trim()) return;

    getCountryStats(country)
      .then((response) => {

        setCountryData(response.data);

        return getHistoricalData(country);

      })
      .then((historyResponse) => {

        if (historyResponse) {
          setTrendData(historyResponse.data.timeline);
        }

      })
      .catch(() => {
        alert("Country not found");
      });

  };

  const getRiskLevel = (activeCases) => {

    if (activeCases > 1000000) {
      return "🔴 High Risk";
    }

    if (activeCases > 100000) {
      return "🟠 Medium Risk";
    }

    return "🟢 Low Risk";
  };

  const chartData = {
    labels: topCountries.map(
      (country) => country.country
    ),

    datasets: [
      {
        label: "COVID Cases",
        data: topCountries.map(
          (country) => country.cases
        ),
        backgroundColor:
          "rgba(54,162,235,0.6)"
      }
    ]
  };

  const trendChartData = trendData
    ? {
        labels: Object.keys(
          trendData.cases
        ),

        datasets: [
          {
            label: "Cases Trend",
            data: Object.values(
              trendData.cases
            ),
            borderColor: "blue",
            backgroundColor:
              "rgba(54,162,235,0.2)",
            fill: true
          }
        ]
      }
    : null;

  if (!stats) {
    return (
  <div>
    <h2>Loading Dashboard...</h2>
  </div>
);
  }

  return (
    <div
      className={
        darkMode
          ? "container dark"
          : "container"
      }
    >

      <h1>
        🌍 COVID Health Intelligence Dashboard
      </h1>

      <DarkModeToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <DashboardCards stats={stats} />

      <TopCountriesChart
        chartData={chartData}
      />

      <RankingTable
        topCountries={topCountries}
      />

      <SearchCountry
        country={country}
        setCountry={setCountry}
        searchCountry={searchCountry}
      />

      {countryData && (

        <div className="country-card">

          <img
            src={countryData.countryInfo.flag}
            alt="flag"
            width="120"
          />

          <h2>
            {countryData.country}
          </h2>

          <p>
            Population:
            {" "}
            {countryData.population.toLocaleString()}
          </p>

          <p>
            Total Cases:
            {" "}
            {countryData.cases.toLocaleString()}
          </p>

          <p>
            Recovered:
            {" "}
            {countryData.recovered.toLocaleString()}
          </p>

          <p>
            Deaths:
            {" "}
            {countryData.deaths.toLocaleString()}
          </p>

          <p>
            Active:
            {" "}
            {countryData.active.toLocaleString()}
          </p>

          <h3>
            Risk Level:
            {" "}
            {getRiskLevel(
              countryData.active
            )}
          </h3>

        </div>

      )}

      {countryData && (
        <AIInsight
          countryData={countryData}
        />
      )}

      <TrendChart
        trendChartData={trendChartData}
      />
      <footer
  style={{
    marginTop: "50px",
    padding: "20px"
  }}
>
  <p>
    Developed by Jovitha | React.js |
    Disease.sh API | 2026
  </p>
</footer>

    </div>
  );
}

export default App;