"use client";

import { useState } from "react";
import { DropZone, FormatPicker, Panel, baseName, download, extFor, formatBytes, loadBitmap, renderToBlob, type OutType } from "./shared";

type Row = { file: File; status: "ready" | "working" | "done" | "error"; out?: Blob };

export function ImageConverterTool() {
  const [rows, setRows] = useState<Row[]>([]);
  const [type, setType] = useState<OutType>("image/png");

  const update = (i: number, patch: Partial<Row>) =>
    setRows((r) => r.map((row, j) => (j === i ? { ...row, ...patch } : row)));

  async function convertAll() {
    for (let i = 0; i < rows.length; i++) {
      update(i, { status: "working" });
      try {
        const bmp = await loadBitmap(rows[i].file);
        const out = await renderToBlob(bmp, bmp.width, bmp.height, type, 0.92);
        update(i, { status: "done", out });
        download(out, `${baseName(rows[i].file.name)}.${extFor(type)}`);
      } catch {
        update(i, { status: "error" });
      }
    }
  }

  if (!rows.length)
    return <DropZone multiple label="Choose images" onFiles={(files) => setRows(files.map((file) => ({ file, status: "ready" })))} />;

  return (
    <Panel className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted">Convert to</span>
          <FormatPicker value={type} onChange={setType} />
        </div>
        <div className="flex gap-3">
          <button type="button" className="btn btn-primary" onClick={convertAll}>
            Convert {rows.length} {rows.length === 1 ? "file" : "files"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setRows([])}>Clear</button>
        </div>
      </div>
      <ul className="divide-y divide-line rounded-2xl border border-line bg-bg">
        {rows.map((r, i) => (
          <li key={i} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <span className="min-w-0 truncate font-medium">{r.file.name}</span>
            <span className="shrink-0 text-faint">
              {formatBytes(r.file.size)}
              {r.out && ` → ${formatBytes(r.out.size)}`}
              <span className={`ml-3 font-bold ${r.status === "error" ? "text-highlight" : r.status === "done" ? "text-accent" : ""}`}>
                {{ ready: "Ready", working: "Converting…", done: "Done", error: "Failed" }[r.status]}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
