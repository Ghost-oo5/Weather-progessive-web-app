import axios from "axios";
import { WeatherResponse } from "../Types/types";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "f33a484cf794d08d0148764789aaba32";

export const fetchWeather = (
  query: string
): Promise<WeatherResponse | null> => {
  const response = axios
    .get(URL, {
      params: {
        q: query,
        units: "metric",
        APPID: API_KEY,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      err.message.data;
    });
  return response;
};
