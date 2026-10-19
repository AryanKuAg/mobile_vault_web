"use client";

import { useState } from "react";
import { DropZone, Field, FormatPicker, Panel, baseName, download, extFor, inputClass, loadBitmap, renderToBlob, type OutType } from "./shared";

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [preview, setPreview] = useState("");
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [type, setType] = useState<OutType>("image/jpeg");

  async function load([f]: File[]) {
    const bmp = await loadBitmap(f);
    setFile(f);
    setBitmap(bmp);
    setW(bmp.width);
    setH(bmp.height);
    setPreview(URL.createObjectURL(f));
  }

  const ratio = bitmap ? bitmap.width / bitmap.height : 1;

  function setWidth(v: number) {
    setW(v);
    if (lock) setH(Math.max(1, Math.round(v / ratio)));
  }
  function setHeight(v: number) {
    setH(v);
    if (lock) setW(Math.max(1, Math.round(v * ratio)));
  }
  function scale(pct: number) {
    if (!bitmap) return;
    setW(Math.round(bitmap.width * pct));
    setH(Math.round(bitmap.height * pct));
  }

  async function save() {
    if (!bitmap || !file || w < 1 || h < 1) return;
    const blob = await renderToBlob(bitmap, w, h, type, 0.92);
    download(blob, `${baseName(file.name)}-${w}x${h}.${extFor(type)}`);
  }

  if (!file || !bitmap) return <DropZone onFiles={load} />;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <Panel>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Selected" className="max-h-[440px] w-full rounded-2xl object-contain" />
        <p className="mt-3 text-sm text-faint">Original: {bitmap.width} × {bitmap.height}px</p>
      </Panel>
      <Panel className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Width (px)">
            <input type="number" min={1} value={w} onChange={(e) => setWidth(+e.target.value)} className={inputClass} />
          </Field>
          <Field label="Height (px)">
            <input type="number" min={1} value={h} onChange={(e) => setHeight(+e.target.value)} className={inputClass} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-muted">
          <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} className="h-4 w-4 accent-accent" />
          Keep aspect ratio
        </label>
        <div className="flex flex-wrap gap-2">
          {[0.25, 0.5, 0.75].map((p) => (
            <button key={p} type="button" onClick={() => scale(p)} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-bold text-muted hover:border-accent hover:text-accent">
              {p * 100}%
            </button>
          ))}
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-muted">Format</p>
          <FormatPicker value={type} onChange={setType} />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={save}>Download {w} × {h}</button>
          <button type="button" className="btn btn-ghost" onClick={() => { setFile(null); setBitmap(null); }}>New image</button>
        </div>
      </Panel>
    </div>
  );
}
