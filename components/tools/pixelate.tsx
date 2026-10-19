"use client";

import { useEffect, useRef, useState } from "react";
import { DropZone, Panel, baseName, download, loadBitmap } from "./shared";

type Rect = { x: number; y: number; w: number; h: number; mode: "pixel" | "black" };

function paint(canvas: HTMLCanvasElement, bmp: ImageBitmap, rects: Rect[], draft?: Rect | null) {
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(bmp, 0, 0);
  const block = Math.max(8, Math.round(Math.max(bmp.width, bmp.height) / 60));
  for (const r of draft ? [...rects, draft] : rects) {
    const x = Math.round(Math.min(r.x, r.x + r.w));
    const y = Math.round(Math.min(r.y, r.y + r.h));
    const w = Math.round(Math.abs(r.w));
    const h = Math.round(Math.abs(r.h));
    if (w < 2 || h < 2) continue;
    if (r.mode === "black") {
      ctx.fillStyle = "#000";
      ctx.fillRect(x, y, w, h);
      continue;
    }
    // Downscale then upscale without smoothing for a blocky mosaic.
    const tmp = document.createElement("canvas");
    tmp.width = Math.max(1, Math.ceil(w / block));
    tmp.height = Math.max(1, Math.ceil(h / block));
    tmp.getContext("2d")!.drawImage(canvas, x, y, w, h, 0, 0, tmp.width, tmp.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, x, y, w, h);
    ctx.imageSmoothingEnabled = true;
  }
}

export function PixelateTool() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [bmp, setBmp] = useState<ImageBitmap | null>(null);
  const [rects, setRects] = useState<Rect[]>([]);
  const [draft, setDraft] = useState<Rect | null>(null);
  const [mode, setMode] = useState<Rect["mode"]>("pixel");

  useEffect(() => {
    const c = canvas.current;
    if (!c || !bmp) return;
    c.width = bmp.width;
    c.height = bmp.height;
  }, [bmp]);

  useEffect(() => {
    if (canvas.current && bmp) paint(canvas.current, bmp, rects, draft);
  }, [bmp, rects, draft]);

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = e.currentTarget.width / r.width;
    const sy = e.currentTarget.height / r.height;
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  }

  async function load([f]: File[]) {
    setFile(f);
    setRects([]);
    setBmp(await loadBitmap(f));
  }

  function save() {
    canvas.current?.toBlob((b) => b && file && download(b, `${baseName(file.name)}-redacted.png`), "image/png");
  }

  if (!file) return <DropZone onFiles={load} />;

  return (
    <Panel className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-line bg-bg p-1">
          {(["pixel", "black"] as const).map((m) => (
            <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${mode === m ? "bg-accent text-accent-ink" : "text-muted"}`}>
              {m === "pixel" ? "Pixelate" : "Black box"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-ghost" disabled={!rects.length} onClick={() => setRects((r) => r.slice(0, -1))}>Undo</button>
          <button type="button" className="btn btn-ghost" onClick={() => { setFile(null); setBmp(null); }}>New image</button>
          <button type="button" className="btn btn-primary" onClick={save}>Download</button>
        </div>
      </div>
      <p className="text-sm text-faint">Drag across the parts you want to hide.</p>
      <canvas
        ref={canvas}
        className="mx-auto block max-h-[70vh] max-w-full cursor-crosshair touch-none rounded-2xl"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          const p = point(e);
          setDraft({ ...p, w: 0, h: 0, mode });
        }}
        onPointerMove={(e) => {
          if (!draft) return;
          const p = point(e);
          setDraft({ ...draft, w: p.x - draft.x, h: p.y - draft.y });
        }}
        onPointerUp={() => {
          if (draft && Math.abs(draft.w) > 3 && Math.abs(draft.h) > 3) setRects((r) => [...r, draft]);
          setDraft(null);
        }}
      />
    </Panel>
  );
}
