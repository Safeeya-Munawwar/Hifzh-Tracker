import {
  BookOpen,
  CheckCircle,
  CalendarDays,
  RotateCcw,
  Search,
  Trophy,
  Clock3,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { surahs } from "../../data/surahs";

const KEY = "hifzh-revision";

export default function Revision() {
  const [revision, setRevision] = useState({});
  const [search, setSearch] = useState("");
  const [showSurahDropdown, setShowSurahDropdown] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    const saved = localStorage.getItem(KEY);

    if (saved) {
      setRevision(JSON.parse(saved));
    }
  }, []);

  const updateRevision = (id) => {
    const updated = {
      ...revision,

      [id]: {
        count: (revision[id]?.count || 0) + 1,

        last: new Date().toISOString(),
      },
    };

    setRevision(updated);

    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  const reset = () => {
    localStorage.removeItem(KEY);

    setRevision({});
  };

  const filtered = surahs.filter((surah) =>
    surah.name.toLowerCase().includes(search.toLowerCase())
  );

  const completed = Object.keys(revision).length;

  const scrollToSurah = (id) => {
    const element = refs.current[id];

    if (element) {
      setSelectedSurah(id);

      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });

      setTimeout(() => {
        setSelectedSurah(null);
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-green-50/50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-green-100 shadow-sm mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h1 className="flex items-center gap-2.5 text-2xl sm:text-3xl font-bold text-green-900">
                <BookOpen size={30} />
                Muraja'ah Tracker
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Track your Quran revision progress
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

        {/* Stats */}
        <section className="grid md:grid-cols-3 gap-5 mb-8">
          <StatCard
            icon={<BookOpen />}
            title="Revised Surahs"
            value={completed}
          />

          <StatCard
            icon={<Trophy />}
            title="Total Revision"
            value={Object.values(revision).reduce((a, b) => a + b.count, 0)}
          />

          <StatCard
            icon={<Clock3 />}
            title="Today"
            value={
              Object.values(revision).filter(
                (item) =>
                  new Date(item.last).toDateString() ===
                  new Date().toDateString()
              ).length
            }
          />
        </section>

        {/* Search */}

        <section className="bg-white rounded-3xl p-6 border border-green-100 shadow-sm mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-green-700"
              size={20}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Surah..."
              className="theme-input w-full rounded-xl px-12 py-3"
            />
          </div>
        </section>

        {/* Jump To Surah */}

        <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-green-100 shadow-sm mb-8">
          <h3 className="font-bold text-green-900 mb-3">Jump To Surah</h3>

          <div className="relative">
            <button
              onClick={() => setShowSurahDropdown(!showSurahDropdown)}
              className="
    w-full
    px-4
    py-3
    rounded-xl
    border
    border-green-200
    bg-white
    text-left
    flex
    justify-between
    items-center
    text-green-800
    font-medium
    "
            >
              Select Surah
              <span>{showSurahDropdown ? "▲" : "▼"}</span>
            </button>

            {showSurahDropdown && (
              <div
                className="
      absolute
      z-30
      mt-2
      w-full
      bg-white
      rounded-2xl
      shadow-xl
      border
      border-green-100
      p-4
      "
              >
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Surah..."
                  className="
        theme-input
        w-full
        px-4
        py-2
        rounded-xl
        mb-4
        "
                />

                <div
                  className="
        grid
        grid-cols-10
        gap-2
        max-h-60
        overflow-y-auto
        "
                >
                  {surahs
                    .filter((surah) =>
                      surah.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((surah) => (
                      <button
                        key={surah.id}
                        onClick={() => {
                          scrollToSurah(surah.id);

                          setShowSurahDropdown(false);

                          setSearch("");
                        }}
                        className="
        px-2
        py-2
        rounded-lg
        bg-green-50
        text-green-700
        hover:bg-green-600
        hover:text-white
        text-xs
        font-medium
        transition
        "
                      >
                        {surah.id}

                        <span className="block text-[10px]">{surah.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Surah Cards */}

        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((surah) => {
            const item = revision[surah.id];

            return (
              <div
                key={surah.id}
                ref={(el) => (refs.current[surah.id] = el)}
                className={`
                theme-card-hover
                rounded-3xl
                p-6
                transition-all
                duration-300
              
                ${selectedSurah === surah.id ? "ring-4 ring-green-300" : ""}
              
                hover:-translate-y-1
                `}
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-lg text-green-950">
                      {surah.id}. {surah.name}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {surah.ayahs} Ayahs
                    </p>
                  </div>

                  {item && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Revised
                    </span>
                  )}
                </div>

                <div className="mt-5 bg-green-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <CalendarDays size={16} />
                    Last Revision
                  </div>

                  <p className="text-sm text-slate-600 mt-2">
                    {item
                      ? new Date(item.last).toLocaleDateString()
                      : "Not revised yet"}
                  </p>
                </div>

                <div className="mt-4 text-sm text-slate-500">
                  Revision Count:
                  <span className="font-bold text-green-700 ml-1">
                    {item?.count || 0}
                  </span>
                </div>

                <button
                  onClick={() => updateRevision(surah.id)}
                  className="mt-6 w-full rounded-xl py-3 btn-primary flex justify-center items-center gap-2 font-semibold"
                >
                  <CheckCircle size={18} />
                  Mark Revised
                </button>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="theme-card rounded-3xl p-5 flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-green-100 text-green-700">{icon}</div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <h3 className="text-2xl font-bold text-green-950">{value}</h3>
      </div>
    </div>
  );
}
