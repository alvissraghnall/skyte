import { createFileRoute, Link } from "@tanstack/react-router";
import { historyStorage, type MockupHistoryEntry } from "#/lib/storage";
import { useState, useEffect, useMemo } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

export const Route = createFileRoute("/_layout/history")({
  component: History,
});

function History() {
  const [history, setHistory] = useState<MockupHistoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // We use useEffect here because localStorage is only available on the client,
  // preventing hydration mismatches during potential SSR.
  useEffect(() => {
    setHistory(historyStorage.getAll());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this mockup?")) {
      historyStorage.remove(id);
      setHistory(historyStorage.getAll());
    }
  };

  const handleClear = () => {
    if (
      confirm(
        "Are you sure you want to clear all history? This cannot be undone.",
      )
    ) {
      historyStorage.clear();
      setHistory([]);
    }
  };

  // Filter and Group History
  const { today, thisWeek, older } = useMemo(() => {
    const filtered = history.filter(
      (entry) =>
        entry.metadata.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        entry.metadata.artist.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ).getTime();
    const weekStart = todayStart - 6 * 24 * 60 * 60 * 1000; // roughly 7 days ago

    return {
      today: filtered.filter((e) => e.timestamp >= todayStart),
      thisWeek: filtered.filter(
        (e) => e.timestamp >= weekStart && e.timestamp < todayStart,
      ),
      older: filtered.filter((e) => e.timestamp < weekStart),
    };
  }, [history, searchQuery]);

  return (
    <div className="flex flex-col relative overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header Area */}
        <div className="px-margin-page py-12 border-b border-white/5 z-10 bg-background/80 backdrop-blur-sm sticky top-0">
          <div className="max-w-350 mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display-lg text-display-lg text-white mb-2 tracking-tight">
                UI Library
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-2xl">
                Browse and manage your generated UI screenshots. Re-edit layers
                or start a new layout.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                  search
                </span>
                <Input
                  className="bg-surface-container text-on-surface font-body-md pl-10 pr-4 py-2 rounded-full border-white/10 focus:border-primary w-full md:w-72 transition-colors h-auto"
                  placeholder="Search screenshots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {history.length > 0 && (
                <Button
                  variant="destructive"
                  className="rounded-full h-auto py-2"
                  onClick={handleClear}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* History Grid Area */}
        <div className="flex-1 p-margin-page overflow-y-auto z-0 pb-24">
          <div className="max-w-350 mx-auto space-y-12">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-50 text-center animate-in fade-in duration-700">
                <span className="material-symbols-outlined text-6xl">
                  image_not_supported
                </span>
                <p className="text-xl">Your library is empty.</p>
                <Link to="/templates">
                  <Button variant="outline" className="mt-4 border-white/10">
                    Browse Presets to Start
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {today.length > 0 && (
                  <HistorySection
                    title="Today"
                    color="bg-primary/50"
                    entries={today}
                    onDelete={handleDelete}
                  />
                )}
                {thisWeek.length > 0 && (
                  <HistorySection
                    title="Earlier This Week"
                    color="bg-surface-variant"
                    entries={thisWeek}
                    onDelete={handleDelete}
                  />
                )}
                {older.length > 0 && (
                  <HistorySection
                    title="Older"
                    color="bg-surface-variant/50"
                    entries={older}
                    onDelete={handleDelete}
                  />
                )}

                {today.length === 0 &&
                  thisWeek.length === 0 &&
                  older.length === 0 && (
                    <div className="text-center py-20 text-on-surface-variant">
                      No results found for "{searchQuery}".
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function HistorySection({
  title,
  color,
  entries,
  onDelete,
}: {
  title: string;
  color: string;
  entries: MockupHistoryEntry[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="font-label-md text-on-surface-variant uppercase tracking-widest mb-6 flex items-center gap-3">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-surface-container rounded-[16px] border border-white/5 overflow-hidden group relative flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 hover:border-primary/20 duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-9/16 w-full bg-[#0a0a0a] overflow-hidden border-b border-white/5">
              <div className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent z-10 pointer-events-none"></div>
              <img
                src={entry.metadata.albumArt}
                alt={entry.metadata.title}
                className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
              />

              {/* Status Chip */}
              <div className="absolute top-3 right-3 z-20 bg-background/90 backdrop-blur-md px-2.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(83,224,118,0.5)]"></span>
                <span className="font-bold text-on-surface text-[10px] uppercase tracking-wider">
                  Saved
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-label-md text-white truncate mb-1">
                {entry.metadata.title}
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm mb-4 truncate">
                {entry.metadata.artist}
              </p>

              <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  to="/editor"
                  search={{ trackUrl: entry.trackUrl }}
                  className="flex-1"
                >
                  <Button
                    variant="secondary"
                    className="w-full h-auto py-2.5 bg-surface-container-highest hover:bg-primary/20 hover:text-primary transition-colors flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      edit
                    </span>{" "}
                    Edit UI
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  className="w-10 h-10 shrink-0"
                  onClick={() => onDelete(entry.id)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
