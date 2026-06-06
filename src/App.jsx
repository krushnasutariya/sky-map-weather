import { useEffect, useRef, useState } from "react";
import SearchPanel from "./components/SearchPanel";
import WeatherCard from "./components/WeatherCard";
import WeatherMap from "./components/WeatherMap";
import { searchCities } from "./services/citySearchApi";
import { getWeatherByCoordinates } from "./services/weatherApi";
import {
  DEFAULT_LOCATION_NAME,
  DEFAULT_POSITION,
} from "./utils/constants";
import { getWeatherGradient } from "./utils/weatherStyle";

function App() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [locationName, setLocationName] = useState(DEFAULT_LOCATION_NAME);

  const [weather, setWeather] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const skipNextSearch = useRef(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        setPosition([success.coords.latitude, success.coords.longitude]);
        setLocationName("Current Location");
      },
      () => {
        setPosition(DEFAULT_POSITION);
        setLocationName(DEFAULT_LOCATION_NAME);
      }
    );
  }, []);

  useEffect(() => {
    async function loadWeather() {
      try {
        setIsWeatherLoading(true);
        setWeatherError("");

        const weatherData = await getWeatherByCoordinates(
          position[0],
          position[1]
        );

        setWeather(weatherData);

        if (
          locationName === "Current Location" ||
          locationName === "Selected Map Location"
        ) {
          setLocationName(`${weatherData.cityName}, ${weatherData.country}`);
        }
      } catch (error) {
        console.error(error);
        setWeatherError("Could not load weather data.");
      } finally {
        setIsWeatherLoading(false);
      }
    }

    loadWeather();
  }, [position]);

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      setSuggestions([]);
      return;
    }

    if (city.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const delaySearch = setTimeout(async () => {
      try {
        const results = await searchCities(city);
        setSuggestions(results);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [city]);

  function handleSelectSuggestion(suggestion) {
    skipNextSearch.current = true;

    setCity(suggestion.name);
    setLocationName(suggestion.name);
    setPosition([suggestion.latitude, suggestion.longitude]);
    setSuggestions([]);
  }

  function handleMapClick(latitude, longitude) {
    skipNextSearch.current = true;

    setCity("");
    setSuggestions([]);
    setLocationName("Selected Map Location");
    setPosition([latitude, longitude]);
  }

  const backgroundGradient = getWeatherGradient(weather?.condition);

  return (
    <main
      className={`h-screen overflow-hidden bg-gradient-to-br ${backgroundGradient} text-white`}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute right-[-120px] top-36 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex h-screen max-w-[1440px] flex-col px-5 py-5 md:px-8">
        <header className="mb-4 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-sky-300">
              Live Weather Studio
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Sky Map Weather
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              Search a city or click on the map to explore live weather,
              local time and animated conditions.
            </p>
          </div>

          {weather && (
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-3 shadow-2xl backdrop-blur-xl lg:block">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-300">
                Now showing
              </p>
              <p className="mt-1 text-lg font-bold">
                {weather.cityName}, {weather.country}
              </p>
            </div>
          )}
        </header>

        <section className="grid min-h-0 flex-1 gap-5 xl:grid-cols-[390px_1fr]">
          <aside className="grid min-h-0 grid-rows-[auto_1fr] gap-4">
            <SearchPanel
              city={city}
              setCity={setCity}
              suggestions={suggestions}
              onSelectSuggestion={handleSelectSuggestion}
            />

            <WeatherCard
              weather={weather}
              isLoading={isWeatherLoading}
              error={weatherError}
            />
          </aside>

          <WeatherMap
            position={position}
            locationName={locationName}
            weather={weather}
            onMapClick={handleMapClick}
          />
        </section>
      </div>
    </main>
  );
}

export default App;