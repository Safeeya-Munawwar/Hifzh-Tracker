import { Calendar, CheckCircle, Trophy } from "lucide-react";

export default function SurahCard({
  surah,
  item,
  selected,
  onToggleAyah,
  setRef,
}) {
  const completed = item?.completed || [];
  const history = item?.history || [];

  const percentage = completed.length
    ? Math.round((completed.length / surah.ayahs) * 100)
    : 0;

  return (
    <article ref={setRef} className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green-100 shadow-sm ${selected === surah.id ? "ring-4 ring-green-300" : ""}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-green-900">
            {surah.id}. {surah.name}
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {surah.ayahs} Ayahs
          </p>
        </div>

        <div className="flex items-center gap-4">
          {history.length > 0 && (
            <div className="flex items-center gap-1 text-sm font-semibold text-yellow-600">
              <Trophy size={17} />
              {history.length}
            </div>
          )}

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="h-1.5 bg-green-50 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
        {Array.from({ length: surah.ayahs }, (_, index) => {
          const ayah = index + 1;
          const done = completed.includes(ayah);

          return (
            <button
              key={ayah}
              type="button"
              onClick={() => onToggleAyah(surah.id, ayah)}
              aria-label={`Ayah ${ayah}`}
              aria-pressed={done}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center justify-self-center text-xs sm:text-sm font-semibold transition-transform active:scale-90 ${done ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
            >
              {done ? <CheckCircle size={17} /> : ayah}
            </button>
          );
        })}
      </div>

      {history.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <Calendar size={15} />
          Completed {history.length} {history.length === 1 ? "time" : "times"}
        </div>
      )}
    </article>
  );
}