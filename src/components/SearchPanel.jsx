function SearchPanel({ city, setCity, suggestions, onSelectSuggestion }) {
  return (
    <section className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Search City</h2>

        <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">
          Live
        </span>
      </div>

      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Search city..."
        className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-3 text-white shadow-inner outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
      />

      {suggestions.length > 0 && (
        <div className="mt-3 max-h-36 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => onSelectSuggestion(suggestion)}
              className="block w-full rounded-xl px-4 py-2 text-left text-xs leading-relaxed text-slate-200 transition hover:bg-sky-500/20 hover:text-white"
            >
              {suggestion.name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchPanel;