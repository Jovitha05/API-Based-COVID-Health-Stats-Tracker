function AIInsight({ countryData }) {

  let insight = "";

  if (countryData.active > 1000000) {
    insight =
      "High active cases. Health measures are strongly recommended.";
  } else if (countryData.active > 100000) {
    insight =
      "Moderate risk level. Continue monitoring trends.";
  } else {
    insight =
      "Low risk level with relatively controlled active cases.";
  }

  return (
    <div className="country-card">
      <h2>🤖 AI Health Insight</h2>
      <p>{insight}</p>
    </div>
  );
}

export default AIInsight;