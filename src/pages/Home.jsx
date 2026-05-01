import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllMemes } from "../api/Memeapi";
import Card from "../components/Card";

const TEMPLATE_LIMIT = 60;

function Home() {
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const refreshMemes = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const templates = await getAllMemes();
      setMemes(templates);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    let shouldIgnore = false;

    async function loadInitialMemes() {
      try {
        const templates = await getAllMemes();

        if (shouldIgnore) {
          return;
        }

        setMemes(templates);
        setStatus("success");
      } catch (err) {
        if (shouldIgnore) {
          return;
        }

        setError(err instanceof Error ? err.message : "Something went wrong.");
        setStatus("error");
      }
    }

    loadInitialMemes();

    return () => {
      shouldIgnore = true;
    };
  }, []);

  const filteredMemes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return memes.slice(0, TEMPLATE_LIMIT);
    }

    return memes.filter((meme) => meme.name.toLowerCase().includes(normalizedQuery));
  }, [memes, query]);

  const openRandomTemplate = () => {
    const pool = filteredMemes.length ? filteredMemes : memes;
    const meme = pool[Math.floor(Math.random() * pool.length)];

    if (!meme) {
      return;
    }

    navigate(
      `/edit?url=${encodeURIComponent(meme.url)}&name=${encodeURIComponent(meme.name)}`,
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-black uppercase text-pink-600">Meme templates</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Pick a template and make it yours.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Browse popular Imgflip templates, search by name, then open the editor to add
            draggable text and export your finished meme.
          </p>
        </div>

        <button
          type="button"
          onClick={openRandomTemplate}
          disabled={!memes.length}
          className="inline-flex h-12 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Random template
        </button>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="sr-only" htmlFor="template-search">
            Search templates
          </label>
          <input
            id="template-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search templates"
            className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-100 sm:max-w-md"
          />

          <p className="text-sm font-semibold text-slate-500">
            {status === "success" ? `${filteredMemes.length} templates found` : "Loading templates"}
          </p>
        </div>
      </div>

      {status === "loading" ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="h-48 rounded-md bg-slate-200" />
              <div className="mt-5 h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-4 h-10 rounded-md bg-slate-200" />
            </div>
          ))}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-black text-red-950">Templates could not load</h2>
          <p className="mt-2 text-sm leading-6 text-red-800">{error}</p>
          <button
            type="button"
            onClick={refreshMemes}
            className="mt-4 rounded-md bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      ) : null}

      {status === "success" && filteredMemes.length ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMemes.map((meme) => (
            <Card
              key={meme.id}
              image={meme.url}
              title={meme.name}
              boxCount={meme.box_count}
            />
          ))}
        </div>
      ) : null}

      {status === "success" && !filteredMemes.length ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-black text-slate-950">No templates found</h2>
          <p className="mt-2 text-slate-600">Try a different search term.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-pink-600"
          >
            Clear search
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default Home;
