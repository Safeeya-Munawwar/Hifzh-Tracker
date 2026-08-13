import {
  BookOpen,
  CheckCircle,
  Trophy,
  RotateCcw,
  Calendar,
  Search,
  X,
} from "lucide-react";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { surahs } from "../../data/surahs";
import { getHifzhData, saveHifzhData } from "../../utils/hifzhStorage";

const EMPTY_DATA = {
  cycles: [],
  progress: {},
  statistics: {
    totalAyahsCompleted: 0,
    totalSurahsCompleted: 0,
  },
};

/* =========================================================
   SURAH CARD
========================================================= */

const SurahCard = memo(function SurahCard({
  surah,
  item,
  selected,
  onToggleAyah,
}) {
  const completed = item?.completed || [];
  const history = item?.history || [];

  const percentage = completed.length
    ? Math.round((completed.length / surah.ayahs) * 100)
    : 0;

  return (
    <article
      className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green-100 shadow-sm ${
        selected === surah.id ? "ring-4 ring-green-300" : ""
      }`}
    >
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
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center justify-self-center text-xs sm:text-sm font-semibold transition-transform active:scale-90 ${
                done
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
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
});

/* =========================================================
   LAZY SURAH
========================================================= */

const LazySurah = memo(function LazySurah({
  surah,
  item,
  selected,
  onToggleAyah,
}) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "500px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[180px]">
      {visible ? (
        <SurahCard
          surah={surah}
          item={item}
          selected={selected}
          onToggleAyah={onToggleAyah}
        />
      ) : (
        <div className="h-[180px] rounded-2xl sm:rounded-3xl border border-green-100 bg-white animate-pulse" />
      )}
    </div>
  );
});

/* =========================================================
   MAIN
========================================================= */

export default function QuranTracker() {
  const [data, setData] = useState(EMPTY_DATA);
  const [showSurahDropdown, setShowSurahDropdown] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchSurah, setSearchSurah] = useState("");
  const [toast, setToast] = useState(null);

  const refs = useRef({});
  const toastTimer = useRef(null);

  /* =======================================================
     LOAD DATA
  ======================================================= */

  useEffect(() => {
    const storedData = getHifzhData();

    setData({
      ...EMPTY_DATA,
      ...storedData,
      statistics: {
        ...EMPTY_DATA.statistics,
        ...(storedData?.statistics || {}),
      },
    });
  }, []);

  /* =======================================================
     TOAST
  ======================================================= */

  const showToast = useCallback((message) => {
    setToast(message);

    clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredSurahs = useMemo(() => {
    const search = searchSurah.trim().toLowerCase();

    if (!search) return surahs;

    return surahs.filter(
      (surah) =>
        surah.name.toLowerCase().includes(search) ||
        String(surah.id).includes(search)
    );
  }, [searchSurah]);

  /* =======================================================
     TOGGLE AYAH
  ======================================================= */

  const toggleAyah = useCallback(
    (surahId, ayah) => {
      setData((previous) => {
        const surah = surahs.find((item) => item.id === surahId);

        if (!surah) return previous;

        const current = previous.progress?.[surahId] || {
          completed: [],
          history: [],
        };

        const completed = current.completed || [];
        const isCompleted = completed.includes(ayah);

        const updatedCompleted = isCompleted
          ? completed.filter((item) => item !== ayah)
          : [...completed, ayah];

        let history = [...(current.history || [])];

        let totalAyahs = previous.statistics?.totalAyahsCompleted || 0;

        let totalSurahs = previous.statistics?.totalSurahsCompleted || 0;

        if (isCompleted) {
          totalAyahs = Math.max(0, totalAyahs - 1);
        } else {
          totalAyahs += 1;
        }

        let finalCompleted = updatedCompleted;

        if (updatedCompleted.length === surah.ayahs) {
          history.push({
            date: new Date().toISOString(),
            ayahs: surah.ayahs,
          });

          totalSurahs += 1;
          finalCompleted = [];

          setTimeout(() => {
            showToast(`${surah.name} completed!`);
          }, 0);
        }

        const newData = {
          ...previous,

          progress: {
            ...previous.progress,

            [surahId]: {
              completed: finalCompleted,
              history,
            },
          },

          statistics: {
            ...previous.statistics,
            totalAyahsCompleted: totalAyahs,
            totalSurahsCompleted: totalSurahs,
          },
        };

        saveHifzhData(newData);

        return newData;
      });
    },
    [showToast]
  );

  /* =======================================================
     SCROLL TO SURAH
  ======================================================= */

  const scrollToSurah = useCallback((surahId) => {
    setShowSurahDropdown(false);

    setSearchSurah("");

    setTimeout(() => {
      const element = refs.current[surahId];

      if (!element) {
        return;
      }

      setSelected(surahId);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        setSelected(null);
      }, 2000);
    }, 50);
  }, []);

  /* =======================================================
     RESET
  ======================================================= */

  const reset = () => {
    if (!window.confirm("Reset all Hifzh progress?")) {
      return;
    }

    localStorage.removeItem("hifzh-management");

    setData(EMPTY_DATA);

    showToast("All Hifzh progress has been reset.");
  };

  return (
    <div className="min-h-screen bg-green-50/50 p-3 sm:p-5 lg:p-8">
      {/* TOAST */}

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm">
          <div className="flex items-center gap-3 rounded-2xl bg-white border border-green-100 shadow-2xl px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
              <CheckCircle size={20} />
            </div>

            <p className="flex-1 text-sm font-medium text-slate-700">{toast}</p>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-green-100 shadow-sm mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h1 className="flex items-center gap-2.5 text-2xl sm:text-3xl font-bold text-green-900">
                <BookOpen size={30} />
                Hifzh Management
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Track Quran memorization and revision
              </p>
            </div>

            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-white border border-green-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-slate-500">Ayahs Completed</p>

            <p className="text-2xl font-bold text-green-700 mt-1">
              {data.statistics?.totalAyahsCompleted || 0}
            </p>
          </div>

          <div className="bg-white border border-green-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-slate-500">Surahs Completed</p>

            <p className="text-2xl font-bold text-green-700 mt-1">
              {data.statistics?.totalSurahsCompleted || 0}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white border border-green-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-slate-500">Total Surahs</p>

            <p className="text-2xl font-bold text-green-700 mt-1">
              {surahs.length}
            </p>
          </div>
        </section>

        {/* SURAH SELECTOR */}

        <section className="relative z-50 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-green-100 shadow-sm mb-5">
          <h3 className="font-bold text-green-900 mb-3">Jump To Surah</h3>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSurahDropdown((value) => !value)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-green-200 bg-white text-sm font-medium text-green-800"
            >
              <span className="truncate">{searchSurah || "Select Surah"}</span>

              <span>{showSurahDropdown ? "▲" : "▼"}</span>
            </button>

            {showSurahDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-green-100 rounded-2xl shadow-2xl p-3">
                <div className="relative mb-3">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    autoFocus
                    value={searchSurah}
                    onChange={(e) => setSearchSurah(e.target.value)}
                    placeholder="Search Surah or number..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-green-200 outline-none focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div className="max-h-[50vh] overflow-y-auto">
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {filteredSurahs.map((surah) => (
                      <button
                        key={surah.id}
                        type="button"
                        onClick={() => scrollToSurah(surah.id)}
                        className="rounded-xl bg-green-50 hover:bg-green-600 hover:text-white px-2 py-2 text-center text-green-700 transition"
                      >
                        <span className="block font-bold text-sm">
                          {surah.id}
                        </span>

                        <span className="block truncate text-[10px]">
                          {surah.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* LAZY SURAHS */}

        <section className="space-y-5">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.id}
              ref={(element) => {
                refs.current[surah.id] = element;
              }}
            >
              <LazySurah
                surah={surah}
                item={
                  data.progress?.[surah.id] || {
                    completed: [],
                    history: [],
                  }
                }
                selected={selected}
                onToggleAyah={toggleAyah}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
