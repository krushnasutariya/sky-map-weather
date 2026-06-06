function SunIcon() {
  return (
    <div className="relative h-20 w-20">
      <div className="absolute inset-2 animate-spin rounded-full border-2 border-dashed border-yellow-300/80" />
      <div className="absolute inset-5 rounded-full bg-yellow-300 shadow-[0_0_35px_rgba(250,204,21,0.75)]" />
    </div>
  );
}

function CloudIcon() {
  return (
    <div className="relative h-20 w-20">
      <div className="absolute left-3 top-9 h-7 w-14 rounded-full bg-white/90 shadow-lg" />
      <div className="absolute left-6 top-5 h-10 w-10 rounded-full bg-white" />
      <div className="absolute left-12 top-7 h-9 w-9 rounded-full bg-slate-200" />
      <div className="absolute inset-0 animate-pulse rounded-full bg-white/5" />
    </div>
  );
}

function RainIcon() {
  return (
    <div className="relative h-20 w-20">
      <div className="absolute left-3 top-7 h-7 w-14 rounded-full bg-white/90 shadow-lg" />
      <div className="absolute left-6 top-3 h-10 w-10 rounded-full bg-white" />
      <div className="absolute left-12 top-5 h-9 w-9 rounded-full bg-slate-200" />

      <div className="absolute left-6 top-14 h-5 w-0.5 animate-bounce rounded-full bg-sky-300" />
      <div className="absolute left-10 top-15 h-5 w-0.5 animate-bounce rounded-full bg-sky-300 [animation-delay:150ms]" />
      <div className="absolute left-14 top-14 h-5 w-0.5 animate-bounce rounded-full bg-sky-300 [animation-delay:300ms]" />
    </div>
  );
}

function HazeIcon() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className="space-y-1.5">
        <div className="h-1 w-14 animate-pulse rounded-full bg-slate-200/90" />
        <div className="ml-3 h-1 w-11 animate-pulse rounded-full bg-slate-300/70" />
        <div className="h-1 w-14 animate-pulse rounded-full bg-slate-200/90" />
        <div className="ml-2 h-1 w-10 animate-pulse rounded-full bg-slate-300/70" />
      </div>
    </div>
  );
}

function SnowIcon() {
  return (
    <div className="relative h-20 w-20">
      <div className="absolute left-3 top-7 h-7 w-14 rounded-full bg-white/90 shadow-lg" />
      <div className="absolute left-6 top-3 h-10 w-10 rounded-full bg-white" />
      <div className="absolute left-12 top-5 h-9 w-9 rounded-full bg-slate-200" />

      <div className="absolute left-6 top-14 animate-bounce text-lg text-sky-100">
        ❄
      </div>
      <div className="absolute left-12 top-15 animate-bounce text-sm text-sky-100 [animation-delay:200ms]">
        ❄
      </div>
    </div>
  );
}

function ThunderIcon() {
  return (
    <div className="relative h-20 w-20">
      <div className="absolute left-3 top-7 h-7 w-14 rounded-full bg-slate-200 shadow-lg" />
      <div className="absolute left-6 top-3 h-10 w-10 rounded-full bg-white" />
      <div className="absolute left-12 top-5 h-9 w-9 rounded-full bg-slate-300" />

      <div className="absolute left-8 top-12 text-3xl text-yellow-300 drop-shadow-lg">
        ⚡
      </div>
    </div>
  );
}

function AnimatedWeatherIcon({ condition }) {
  const value = condition?.toLowerCase() || "";

  if (value.includes("clear")) {
    return <SunIcon />;
  }

  if (value.includes("thunderstorm")) {
    return <ThunderIcon />;
  }

  if (value.includes("rain") || value.includes("drizzle")) {
    return <RainIcon />;
  }

  if (value.includes("snow")) {
    return <SnowIcon />;
  }

  if (
    value.includes("haze") ||
    value.includes("mist") ||
    value.includes("fog") ||
    value.includes("smoke") ||
    value.includes("dust")
  ) {
    return <HazeIcon />;
  }

  return <CloudIcon />;
}

export default AnimatedWeatherIcon;