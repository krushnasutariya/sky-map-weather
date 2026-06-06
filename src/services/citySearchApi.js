function buildCleanPlaceName(place) {
  const address = place.address || {};

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county ||
    place.name;

  const state =
    address.state ||
    address.region ||
    address.state_district ||
    "";

  const country = address.country || "";

  return [city, state, country].filter(Boolean).join(", ");
}

export async function searchCities(searchText) {
  if (!searchText || searchText.trim().length < 2) {
    return [];
  }

  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
    searchText
  )}&limit=6&addressdetails=1&featuretype=city`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch city suggestions");
  }

  const data = await response.json();

  return data.map((place) => ({
    id: place.place_id,
    name: buildCleanPlaceName(place),
    latitude: Number(place.lat),
    longitude: Number(place.lon),
  }));
}