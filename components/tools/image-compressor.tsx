"use client";

import { useEffect, useState } from "react";
import { DropZone, FormatPicker, Panel, baseName, download, extFor, formatBytes, loadBitmap, renderToBlob, type OutType } from "./shared";

export function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [type, setType] = useState<OutType>("image/webp");
  const [out, setOut] = useState<{ blob: Blob; url: string } | null>(null);

  useEffect(() => {
    if (!bitmap) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      const blob = await renderToBlob(bitmap, bitmap.width, bitmap.height, type, quality);
      if (cancelled) return;
      setOut((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { blob, url: URL.createObjectURL(blob) };
      });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [bitmap, quality, type]);

  async function load([f]: File[]) {
    setFile(f);
    setBitmap(await loadBitmap(f));
  }

  if (!file) return <DropZone onFiles={load} />;

  const saved = out ? 1 - out.blob.size / file.size : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <Panel>
        {out && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={out.url} alt="Compressed preview" className="max-h-[460px] w-full rounded-2xl object-contain" />
        )}
      </Panel>
      <Panel className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-muted">Format</p>
          <FormatPicker value={type} onChange={setType} />
        </div>
        {type !== "image/png" && (
          <label className="block">
            <span className="mb-2 flex justify-between text-sm font-semibold text-muted">
              Quality <span className="text-ink">{Math.round(quality * 100)}%</span>
            </span>
            <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full accent-accent" />
          </label>
        )}
        <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-bg p-4 text-sm">
          <div>
            <dt className="text-faint">Original</dt>
            <dd className="font-display text-lg font-bold">{formatBytes(file.size)}</dd>
          </div>
          <div>
            <dt className="text-faint">Compressed</dt>
            <dd className="font-display text-lg font-bold">
              {out ? formatBytes(out.blob.size) : "…"}{" "}
              {out && (
                <span className={`text-sm ${saved > 0 ? "text-accent" : "text-highlight"}`}>
                  ({saved > 0 ? "−" : "+"}
                  {Math.abs(Math.round(saved * 100))}%)
                </span>
              )}
            </dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" disabled={!out} onClick={() => out && download(out.blob, `${baseName(file.name)}-compressed.${extFor(type)}`)}>
            Download
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => { setFile(null); setBitmap(null); setOut(null); }}>
            New image
          </button>
        </div>
      </Panel>
    </div>
  );
}
