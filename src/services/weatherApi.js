const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function formatLocalTime(unixTime, timezoneOffset) {
  const localDate = new Date((unixTime + timezoneOffset) * 1000);

  return localDate.toLocaleString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatShortTime(unixTime, timezoneOffset) {
  const localDate = new Date((unixTime + timezoneOffset) * 1000);

  return localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export async function getWeatherByCoordinates(latitude, longitude) {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  const windSpeedKmh = Math.round(data.wind.speed * 3.6);
  const visibilityKm = data.visibility
    ? (data.visibility / 1000).toFixed(1)
    : "N/A";

  return {
    cityName: data.name,
    country: data.sys.country,

    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,

    windSpeed: windSpeedKmh,
    visibility: visibilityKm,

    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,

    localTime: formatLocalTime(data.dt, data.timezone),
    sunrise: formatShortTime(data.sys.sunrise, data.timezone),
    sunset: formatShortTime(data.sys.sunset, data.timezone),
  };
}