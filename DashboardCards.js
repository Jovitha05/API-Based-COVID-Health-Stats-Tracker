function DashboardCards({ stats }) {
  return (
    <div className="cards">

      <div className="card">
        <h2>Total Cases</h2>
        <p>{stats.cases.toLocaleString()}</p>
      </div>

      <div className="card">
        <h2>Recovered</h2>
        <p>{stats.recovered.toLocaleString()}</p>
      </div>

      <div className="card">
        <h2>Deaths</h2>
        <p>{stats.deaths.toLocaleString()}</p>
      </div>

      <div className="card">
        <h2>Active Cases</h2>
        <p>{stats.active.toLocaleString()}</p>
      </div>

    </div>
  );
}

export default DashboardCards;