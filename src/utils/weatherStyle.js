export function getWeatherGradient(condition) {
  const value = condition?.toLowerCase() || "";

  if (value.includes("clear")) {
    return "from-slate-950 via-blue-950 to-orange-950";
  }

  if (value.includes("rain") || value.includes("drizzle")) {
    return "from-slate-950 via-slate-900 to-blue-950";
  }

  if (value.includes("thunderstorm")) {
    return "from-slate-950 via-indigo-950 to-purple-950";
  }

  if (
    value.includes("haze") ||
    value.includes("mist") ||
    value.includes("fog") ||
    value.includes("smoke")
  ) {
    return "from-slate-950 via-slate-900 to-stone-900";
  }

  if (value.includes("snow")) {
    return "from-slate-950 via-slate-900 to-sky-950";
  }

  return "from-slate-950 via-slate-900 to-sky-950";
}