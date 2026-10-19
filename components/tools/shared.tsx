"use client";

import { useRef, useState } from "react";

export type OutType = "image/jpeg" | "image/png" | "image/webp";

export const FORMATS: { type: OutType; label: string; ext: string }[] = [
  { type: "image/jpeg", label: "JPG", ext: "jpg" },
  { type: "image/png", label: "PNG", ext: "png" },
  { type: "image/webp", label: "WebP", ext: "webp" },
];

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export function extFor(type: OutType) {
  return FORMATS.find((f) => f.type === type)!.ext;
}

export function baseName(name: string) {
  return name.replace(/\.[^.]+$/, "");
}

// createImageBitmap applies EXIF orientation, so the output looks the same
// as the original even after metadata is dropped.
export async function loadBitmap(file: Blob) {
  return createImageBitmap(file, { imageOrientation: "from-image" });
}

export function renderToBlob(
  source: CanvasImageSource,
  width: number,
  height: number,
  type: OutType,
  quality = 0.9,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  if (type === "image/jpeg") {
    // JPEG has no alpha; paint white so transparent areas don't turn black.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(source, 0, 0, width, height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encoding failed"))), type, quality),
  );
}

export function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function DropZone({
  onFiles,
  multiple = false,
  accept = "image/*",
  label = "Choose an image",
}: {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const files = [...e.dataTransfer.files].filter((f) => f.type.startsWith("image/"));
        if (files.length) onFiles(multiple ? files : files.slice(0, 1));
      }}
      className={`flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition ${
        over ? "border-accent bg-surface-2" : "border-line bg-surface"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-9 9" />
      </svg>
      <p className="font-display text-lg font-bold">Drop {multiple ? "images" : "an image"} here</p>
      <p className="text-sm text-faint">or</p>
      <button type="button" className="btn btn-primary" onClick={() => input.current?.click()}>
        {label}
      </button>
      <input
        ref={input}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const files = [...(e.target.files ?? [])];
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
      <p className="mt-2 flex items-center gap-1.5 text-xs text-faint">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2.5" />
          <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
        </svg>
        Processed on your device. Nothing is uploaded.
      </p>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-line bg-surface p-6 ${className}`}>{children}</div>;
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-muted">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-ink outline-none transition focus:border-accent";

export function FormatPicker({ value, onChange }: { value: OutType; onChange: (t: OutType) => void }) {
  return (
    <div className="inline-flex rounded-full border border-line bg-bg p-1" role="radiogroup" aria-label="Output format">
      {FORMATS.map((f) => (
        <button
          key={f.type}
          type="button"
          role="radio"
          aria-checked={value === f.type}
          onClick={() => onChange(f.type)}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            value === f.type ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
