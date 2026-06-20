function SearchCountry({
  country,
  setCountry,
  searchCountry
}) {
  return (
    <div className="search-section">

      <input
        type="text"
        placeholder="Enter Country Name"
        value={country}
        onChange={(e) =>
          setCountry(e.target.value)
        }
      />

      <button onClick={searchCountry}>
        Search
      </button>

    </div>
  );
}

export default SearchCountry;