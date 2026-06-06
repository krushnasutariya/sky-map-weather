import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
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

function WeatherIconOverlay({ position, weather }) {
  const map = useMap();

  useEffect(() => {
    const updateIconPosition = () => {
      const point = map.latLngToContainerPoint(position);
      const element = document.getElementById("weather-map-icon");

      if (element) {
        element.style.left = `${point.x}px`;
        element.style.top = `${point.y}px`;
      }
    };

    updateIconPosition();

    map.on("move zoom", updateIconPosition);

    return () => {
      map.off("move zoom", updateIconPosition);
    };
  }, [map, position]);

  if (!weather) {
    return null;
  }

  return (
    <div
      id="weather-map-icon"
      className="pointer-events-none absolute z-[1000] -translate-x-1/2 -translate-y-[120%]"
    >
      <div className="scale-90 rounded-full border border-white/20 bg-slate-950/80 p-1.5 shadow-2xl backdrop-blur-xl">
          <AnimatedWeatherIcon condition={weather.condition} />
      </div>
    </div>
  );
}

function WeatherMap({ position, locationName, weather, onMapClick }) {
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
        <WeatherIconOverlay position={position} weather={weather} />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <Marker position={position}>
          <Popup>
            <div className="min-w-[190px] text-center">
              <p className="font-semibold">{locationName}</p>

              {weather && (
                <>
                  <p className="mt-1 capitalize">{weather.description}</p>
                  <p className="mt-1 text-lg font-bold">
                    {weather.temperature}°C
                  </p>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

export default WeatherMap;