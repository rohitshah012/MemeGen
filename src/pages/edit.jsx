import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toJpeg } from "html-to-image";

import TextLayer from "../components/text";

const FONT_OPTIONS = [
  {
    label: "Impact",
    value: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  },
  {
    label: "Anton",
    value: "Anton, Impact, sans-serif",
  },
  {
    label: "System",
    value: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
  {
    label: "Serif",
    value: "Georgia, 'Times New Roman', serif",
  },
];

const createLayerId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createTextLayer = (value, x, y) => ({
  id: createLayerId(),
  value,
  x,
  y,
  width: 82,
  fontSize: 42,
  color: "#ffffff",
  strokeColor: "#111827",
  strokeWidth: 2,
  align: "center",
  uppercase: true,
  fontFamily: FONT_OPTIONS[0].value,
});

const createInitialLayers = () => [
  createTextLayer("TOP TEXT", 28, 28),
  createTextLayer("BOTTOM TEXT", 28, 190),
];

const waitForPaint = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "meme";

function Edit() {
  const memeRef = useRef(null);
  const [params] = useSearchParams();
  const imageUrl = params.get("url") || "";
  const templateName = params.get("name") || "Selected template";

  const [textLayers, setTextLayers] = useState(createInitialLayers);
  const [selectedId, setSelectedId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState("");

  useEffect(() => {
    const initialLayers = createInitialLayers();
    setTextLayers(initialLayers);
    setSelectedId(initialLayers[0].id);
    setImageLoaded(false);
    setImageError(false);
    setExportError("");
  }, [imageUrl]);

  const selectedLayer = useMemo(
    () => textLayers.find((layer) => layer.id === selectedId) || textLayers[0],
    [selectedId, textLayers],
  );

  const updateLayer = (id, updates) => {
    setTextLayers((currentLayers) =>
      currentLayers.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)),
    );
  };

  const updateSelectedLayer = (updates) => {
    if (!selectedLayer) {
      return;
    }

    updateLayer(selectedLayer.id, updates);
    setSelectedId(selectedLayer.id);
  };

  const addTextLayer = () => {
    const offset = Math.min(textLayers.length * 24, 120);
    const layer = createTextLayer("NEW TEXT", 34 + offset, 70 + offset);
    setTextLayers((currentLayers) => [...currentLayers, layer]);
    setSelectedId(layer.id);
  };

  const deleteSelectedLayer = () => {
    if (!selectedLayer) {
      return;
    }

    const remainingLayers = textLayers.filter((layer) => layer.id !== selectedLayer.id);
    setTextLayers(remainingLayers);
    setSelectedId(remainingLayers[0]?.id || null);
  };

  const resetLayers = () => {
    const initialLayers = createInitialLayers();
    setTextLayers(initialLayers);
    setSelectedId(initialLayers[0].id);
    setExportError("");
  };

  const handleSave = async () => {
    if (!memeRef.current || imageError || !imageLoaded) {
      return;
    }

    setIsExporting(true);
    setExportError("");

    try {
      await waitForPaint();
      await waitForPaint();

      const dataUrl = await toJpeg(memeRef.current, {
        quality: 0.96,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#111827",
      });

      const link = document.createElement("a");
      link.download = `${slugify(templateName)}-meme.jpeg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setExportError(
        "Download failed. The image host may have blocked browser export, so try another template.",
      );
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!imageUrl) {
    return (
      <section className="mx-auto grid min-h-[55vh] max-w-3xl place-items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase text-pink-600">Create meme</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            Choose a template first.
          </h1>
          <p className="mt-3 text-slate-600">
            Open the template gallery, pick a meme, and the editor will load with starter text
            layers.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Browse templates
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="text-sm font-bold text-pink-600 hover:text-pink-700">
            Back to templates
          </Link>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {templateName}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Select a text layer, edit its style, drag it on the image, then export.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addTextLayer}
            className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:border-pink-500 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Add text
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!imageLoaded || imageError || isExporting}
            className="rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isExporting ? "Preparing..." : "Download JPEG"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex min-h-[340px] items-center justify-center overflow-auto rounded-lg bg-slate-950 p-2 sm:p-4">
            <div
              ref={memeRef}
              className="meme-export-surface relative mx-auto w-fit max-w-full overflow-hidden rounded-lg bg-slate-950"
            >
              {!imageLoaded && !imageError ? (
                <div className="absolute inset-0 z-20 grid place-items-center bg-slate-950 text-sm font-bold text-white">
                  Loading image
                </div>
              ) : null}

              {imageError ? (
                <div className="grid min-h-80 w-[min(80vw,640px)] place-items-center p-8 text-center text-white">
                  <div>
                    <h2 className="text-xl font-black">Image could not load</h2>
                    <p className="mt-2 text-sm text-slate-300">
                      Go back and choose another template.
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt={templateName}
                  crossOrigin="anonymous"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className="block max-h-[72vh] max-w-full object-contain"
                />
              )}

              {imageLoaded && !imageError
                ? textLayers.map((layer) => (
                    <TextLayer
                      key={layer.id}
                      item={layer}
                      isSelected={layer.id === selectedLayer?.id}
                      isExporting={isExporting}
                      onSelect={setSelectedId}
                      onUpdate={updateLayer}
                    />
                  ))
                : null}
            </div>
          </div>

          {exportError ? (
            <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {exportError}
            </p>
          ) : null}
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24 lg:self-start">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-950">Text layers</h2>
                <p className="mt-1 text-sm text-slate-500">{textLayers.length} active layers</p>
              </div>
              <button
                type="button"
                onClick={resetLayers}
                className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-pink-500 hover:text-pink-600"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {textLayers.map((layer, index) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedId(layer.id)}
                  className={`rounded-md border px-3 py-2 text-left text-sm font-bold transition ${
                    layer.id === selectedLayer?.id
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  Layer {index + 1}: {layer.value || "Text"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5 p-5">
            {selectedLayer ? (
              <>
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Text</span>
                  <textarea
                    value={selectedLayer.value}
                    onChange={(event) => updateSelectedLayer({ value: event.target.value })}
                    rows={3}
                    className="mt-2 w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-950 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-100"
                  />
                </label>

                <label className="block">
                  <span className="flex items-center justify-between text-sm font-bold text-slate-700">
                    Font size <span>{selectedLayer.fontSize}px</span>
                  </span>
                  <input
                    type="range"
                    min="18"
                    max="86"
                    value={selectedLayer.fontSize}
                    onChange={(event) =>
                      updateSelectedLayer({ fontSize: event.target.valueAsNumber })
                    }
                    className="mt-2 w-full accent-pink-600"
                  />
                </label>

                <label className="block">
                  <span className="flex items-center justify-between text-sm font-bold text-slate-700">
                    Text width <span>{selectedLayer.width}%</span>
                  </span>
                  <input
                    type="range"
                    min="35"
                    max="95"
                    value={selectedLayer.width}
                    onChange={(event) =>
                      updateSelectedLayer({ width: event.target.valueAsNumber })
                    }
                    className="mt-2 w-full accent-cyan-600"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">Text color</span>
                    <input
                      type="color"
                      value={selectedLayer.color}
                      onChange={(event) => updateSelectedLayer({ color: event.target.value })}
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white p-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">Outline</span>
                    <input
                      type="color"
                      value={selectedLayer.strokeColor}
                      onChange={(event) =>
                        updateSelectedLayer({ strokeColor: event.target.value })
                      }
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white p-1"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="flex items-center justify-between text-sm font-bold text-slate-700">
                    Outline size <span>{selectedLayer.strokeWidth}px</span>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={selectedLayer.strokeWidth}
                    onChange={(event) =>
                      updateSelectedLayer({ strokeWidth: event.target.valueAsNumber })
                    }
                    className="mt-2 w-full accent-slate-950"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">Font</span>
                    <select
                      value={selectedLayer.fontFamily}
                      onChange={(event) =>
                        updateSelectedLayer({ fontFamily: event.target.value })
                      }
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font.label} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">Align</span>
                    <select
                      value={selectedLayer.align}
                      onChange={(event) => updateSelectedLayer({ align: event.target.value })}
                      className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </label>
                </div>

                <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedLayer.uppercase}
                    onChange={(event) =>
                      updateSelectedLayer({ uppercase: event.target.checked })
                    }
                    className="h-4 w-4 accent-pink-600"
                  />
                  Uppercase text
                </label>

                <button
                  type="button"
                  onClick={deleteSelectedLayer}
                  className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100"
                >
                  Delete selected layer
                </button>
              </>
            ) : (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Add a text layer to start editing.
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Edit;
