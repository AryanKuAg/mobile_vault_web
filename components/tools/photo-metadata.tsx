"use client";

import { useState } from "react";
import { readExif, type ExifResult } from "@/lib/exif";
import { DropZone, Panel, baseName, download, formatBytes, loadBitmap, renderToBlob } from "./shared";

type Loaded = { file: File; url: string; exif: ExifResult | null };

export function PhotoMetadataTool() {
  const [item, setItem] = useState<Loaded | null>(null);
  const [busy, setBusy] = useState(false);

  async function load([file]: File[]) {
    if (item) URL.revokeObjectURL(item.url);
    const exif = readExif(await file.arrayBuffer());
    setItem({ file, url: URL.createObjectURL(file), exif });
  }

  async function clean() {
    if (!item) return;
    setBusy(true);
    try {
      const bmp = await loadBitmap(item.file);
      const type = item.file.type === "image/png" ? "image/png" : "image/jpeg";
      const blob = await renderToBlob(bmp, bmp.width, bmp.height, type, 0.95);
      download(blob, `${baseName(item.file.name)}-clean.${type === "image/png" ? "png" : "jpg"}`);
    } finally {
      setBusy(false);
    }
  }

  if (!item) return <DropZone onFiles={load} accept="image/jpeg,image/png,image/webp,image/heic" />;

  const fields = item.exif?.fields ?? [];
  const gps = item.exif?.gps;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <Panel>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.url} alt="Selected photo" className="max-h-[420px] w-full rounded-2xl object-contain" />
        <p className="mt-4 truncate text-sm text-faint">
          {item.file.name} · {formatBytes(item.file.size)}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={clean} disabled={busy}>
            {busy ? "Cleaning…" : "Download clean copy"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setItem(null)}>
            Choose another
          </button>
        </div>
      </Panel>
      <Panel>
        <h2 className="font-display text-xl font-bold">What this photo reveals</h2>
        {gps && (
          <div className="mt-4 rounded-2xl border border-highlight/40 bg-highlight/10 p-4">
            <p className="font-bold text-highlight">This photo contains its GPS location.</p>
            <p className="mt-1 text-sm text-muted">
              Anyone you send the original file to can see where it was taken.{" "}
              <a
                className="font-semibold text-accent underline"
                href={`https://www.openstreetmap.org/?mlat=${gps.lat}&mlon=${gps.lon}#map=16/${gps.lat}/${gps.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on map
              </a>
            </p>
          </div>
        )}
        {fields.length ? (
          <dl className="mt-5 divide-y divide-line text-sm">
            {fields.map((f) => (
              <div key={f.label} className="grid grid-cols-[140px_1fr] gap-4 py-2.5">
                <dt className="font-semibold text-muted">{f.label}</dt>
                <dd className="break-words">{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-4 text-muted">
            No EXIF metadata found. {item.file.type !== "image/jpeg" && "This tool reads EXIF from JPEG files; other formats may still hold metadata, and the clean copy removes it either way."}
          </p>
        )}
      </Panel>
    </div>
  );
}
