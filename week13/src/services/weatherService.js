const API_KEY = "c6705827d574311e59ec976ddceb8b93";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.json();
};

export const getForecastWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.json();
};
