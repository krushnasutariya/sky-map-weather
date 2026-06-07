import AnimatedWeatherIcon from "./AnimatedWeatherIcon";

function WeatherCard({ weather, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="rounded-[2rem] bg-white/10 p-5 shadow-xl backdrop-blur-xl">
        <p className="text-slate-300">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] bg-red-500/10 p-5 text-red-200 shadow-xl">
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="rounded-[2rem] bg-white/10 p-5 shadow-xl backdrop-blur-xl">
        <p className="text-slate-400">Weather details will appear here.</p>
      </div>
    );
  }

  return (
    <section className="min-h-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.09] p-4 pb-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-300">
            Current Weather
          </p>

          <h3 className="mt-2 truncate text-2xl font-black leading-tight">
            {weather.cityName}, {weather.country}
          </h3>

          <p className="mt-1 text-xs text-slate-300">{weather.localTime}</p>

          <p className="mt-3 text-xl font-bold">{weather.condition}</p>
          <p className="text-sm capitalize text-slate-300">
            {weather.description}
          </p>
        </div>

        <div className="shrink-0 rounded-full bg-white/10 p-2 shadow-xl">
          <AnimatedWeatherIcon condition={weather.condition} />
        </div>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <p className="text-5xl font-black leading-none">
          {weather.temperature}°
        </p>
        <p className="mb-2 text-xl text-slate-300">C</p>
      </div>

      <p className="mt-1 text-sm text-slate-300">
        Feels like {weather.feelsLike}°C
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-white/10 p-2.5">
          <p className="text-[11px] text-slate-400">Humidity</p>
          <p className="mt-1 text-base font-bold">{weather.humidity}%</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-2.5">
          <p className="text-[11px] text-slate-400">Wind</p>
          <p className="mt-1 text-base font-bold">{weather.windSpeed} km/h</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-2.5">
          <p className="text-[11px] text-slate-400">Visibility</p>
          <p className="mt-1 text-base font-bold">{weather.visibility} km</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-2.5">
          <p className="text-[11px] text-slate-400">Pressure</p>
          <p className="mt-1 text-base font-bold">{weather.pressure}</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-2.5">
          <p className="text-[11px] text-slate-400">Sunrise</p>
          <p className="mt-1 text-base font-bold">{weather.sunrise}</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-2.5">
          <p className="text-[11px] text-slate-400">Sunset</p>
          <p className="mt-1 text-base font-bold">{weather.sunset}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;