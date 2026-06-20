function RankingTable({ topCountries }) {

  return (
    <div>

      <h2>🏆 Top 10 Countries Ranking</h2>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Cases</th>
          </tr>
        </thead>

        <tbody>

          {topCountries.map(
            (country, index) => (

              <tr key={country.country}>

                <td>{index + 1}</td>

                <td>{country.country}</td>

                <td>
                  {country.cases.toLocaleString()}
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default RankingTable;