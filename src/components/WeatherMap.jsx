import { useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { DEFAULT_ZOOM } from "../utils/constants";
import AnimatedWeatherIcon from "./AnimatedWeatherIcon";

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, DEFAULT_ZOOM, {
      duration: 1.2,
    });
  }, [map, position]);

  return null;
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

function LogoStyleWeatherMarker({ position, weather }) {
  const map = useMap();

  useEffect(() => {
    function updateMarkerPosition() {
      const point = map.latLngToContainerPoint(position);
      const markerElement = document.getElementById("logo-style-weather-marker");

      if (markerElement) {
        markerElement.style.left = `${point.x}px`;
        markerElement.style.top = `${point.y}px`;
      }
    }

    updateMarkerPosition();

    map.on("move", updateMarkerPosition);
    map.on("zoom", updateMarkerPosition);
    map.on("resize", updateMarkerPosition);

    return () => {
      map.off("move", updateMarkerPosition);
      map.off("zoom", updateMarkerPosition);
      map.off("resize", updateMarkerPosition);
    };
  }, [map, position]);

  if (!weather) {
    return null;
  }

  return (
    <div
      id="logo-style-weather-marker"
      className="pointer-events-none absolute z-[1000] -translate-x-1/2 -translate-y-[130%]"
    >
      <div className="relative flex items-center justify-center">
        <div
          className="relative h-[58px] w-[58px] -rotate-45 shadow-[0_14px_28px_rgba(15,23,42,0.35)]"
          style={{
            borderRadius: "22px 22px 22px 6px",
            background:
              "linear-gradient(180deg, rgba(34,197,94,0.95) 0%, rgba(14,165,233,0.98) 100%)",
            border: "3px solid rgba(255,255,255,0.55)",
          }}
        >
          <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-sky-900/70 rotate-45 backdrop-blur-xl">
            <div className="scale-[0.38]">
              <AnimatedWeatherIcon condition={weather.condition} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function WeatherMap({ position, weather, onMapClick }) {
  return (
    <section className="relative h-full min-h-0 overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
      <div className="absolute left-6 top-6 z-[1000] rounded-2xl border border-white/20 bg-slate-950/75 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-300">
          Weather Map
        </p>

        {weather && (
          <p className="mt-1 text-sm capitalize text-slate-200">
            {weather.cityName}, {weather.country} · {weather.temperature}°C
          </p>
        )}
      </div>

      <div className="absolute bottom-6 right-6 z-[1000] rounded-full border border-white/20 bg-slate-950/75 px-4 py-2 text-sm text-slate-200 shadow-2xl backdrop-blur-xl">
        Click map to check weather
      </div>

      <MapContainer
        center={position}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="h-full w-full rounded-[1.5rem]"
      >
        <RecenterMap position={position} />
        <MapClickHandler onMapClick={onMapClick} />
        <LogoStyleWeatherMarker position={position} weather={weather} />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </section>
  );
}

export default WeatherMap;