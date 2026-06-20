import axios from "axios";

const BASE_URL = "https://disease.sh/v3/covid-19";

export const getGlobalStats = () =>
  axios.get(`${BASE_URL}/all`);

export const getCountryStats = (country) =>
  axios.get(`${BASE_URL}/countries/${country}`);

export const getAllCountries = () =>
  axios.get(`${BASE_URL}/countries`);

export const getHistoricalData = (country) =>
  axios.get(
    `${BASE_URL}/historical/${country}?lastdays=30`
  );