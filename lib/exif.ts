// Minimal EXIF reader for JPEG files: enough to show what a photo reveals
// (camera, time, settings, GPS) without pulling in a dependency.

export type ExifResult = {
  fields: { label: string; value: string }[];
  gps: { lat: number; lon: number } | null;
};

const IFD0: Record<number, string> = {
  0x010f: "Camera make",
  0x0110: "Camera model",
  0x0131: "Software",
  0x0132: "Modified",
  0x013b: "Artist",
  0x8298: "Copyright",
};

const EXIF_IFD: Record<number, string> = {
  0x9003: "Taken",
  0x9010: "Time zone offset",
  0x829a: "Exposure time",
  0x829d: "Aperture",
  0x8827: "ISO",
  0x920a: "Focal length",
  0xa433: "Lens make",
  0xa434: "Lens model",
  0xa002: "Width (px)",
  0xa003: "Height (px)",
};

const TYPE_SIZE: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

export function readExif(buffer: ArrayBuffer): ExifResult | null {
  const view = new DataView(buffer);
  if (view.getUint16(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 4 < view.byteLength) {
    const marker = view.getUint16(offset);
    const size = view.getUint16(offset + 2);
    if (marker === 0xffe1 && view.getUint32(offset + 4) === 0x45786966) {
      return parseTiff(view, offset + 10);
    }
    if ((marker & 0xff00) !== 0xff00 || marker === 0xffda) break;
    offset += 2 + size;
  }
  return null;
}

function parseTiff(view: DataView, start: number): ExifResult {
  const little = view.getUint16(start) === 0x4949;
  const u16 = (o: number) => view.getUint16(start + o, little);
  const u32 = (o: number) => view.getUint32(start + o, little);
  const i32 = (o: number) => view.getInt32(start + o, little);

  function value(entry: number): number | string | number[] | undefined {
    const type = u16(entry + 2);
    const count = u32(entry + 4);
    const bytes = (TYPE_SIZE[type] ?? 1) * count;
    const at = bytes > 4 ? u32(entry + 8) : entry + 8;
    if (start + at + bytes > view.byteLength) return undefined;
    switch (type) {
      case 2: {
        let s = "";
        for (let i = 0; i < count - 1; i++) s += String.fromCharCode(view.getUint8(start + at + i));
        return s.trim();
      }
      case 3:
        return count === 1 ? u16(at) : Array.from({ length: count }, (_, i) => u16(at + i * 2));
      case 4:
        return count === 1 ? u32(at) : Array.from({ length: count }, (_, i) => u32(at + i * 4));
      case 5:
      case 10: {
        const read = type === 5 ? u32 : i32;
        const vals = Array.from({ length: count }, (_, i) => {
          const d = read(at + i * 8 + 4);
          return d ? read(at + i * 8) / d : 0;
        });
        return count === 1 ? vals[0] : vals;
      }
      default:
        return undefined;
    }
  }

  function ifd(o: number) {
    const map = new Map<number, ReturnType<typeof value>>();
    if (!o || start + o + 2 > view.byteLength) return map;
    const n = u16(o);
    for (let i = 0; i < n; i++) {
      const entry = o + 2 + i * 12;
      if (start + entry + 12 > view.byteLength) break;
      map.set(u16(entry), value(entry));
    }
    return map;
  }

  const ifd0 = ifd(u32(4));
  const exif = ifd(Number(ifd0.get(0x8769) ?? 0));
  const gpsIfd = ifd(Number(ifd0.get(0x8825) ?? 0));

  const fields: ExifResult["fields"] = [];
  for (const [tag, label] of Object.entries(IFD0)) {
    const v = ifd0.get(Number(tag));
    if (v !== undefined && v !== "") fields.push({ label, value: String(v) });
  }
  for (const [tag, label] of Object.entries(EXIF_IFD)) {
    const v = exif.get(Number(tag));
    if (v === undefined || v === "") continue;
    let text = String(v);
    if (label === "Exposure time" && typeof v === "number") text = v < 1 ? `1/${Math.round(1 / v)} s` : `${v} s`;
    if (label === "Aperture" && typeof v === "number") text = `ƒ/${v.toFixed(1)}`;
    if (label === "Focal length" && typeof v === "number") text = `${v.toFixed(1)} mm`;
    fields.push({ label, value: text });
  }

  let gps: ExifResult["gps"] = null;
  const lat = gpsIfd.get(2);
  const lon = gpsIfd.get(4);
  if (Array.isArray(lat) && Array.isArray(lon)) {
    const dms = (a: number[]) => a[0] + a[1] / 60 + a[2] / 3600;
    const la = dms(lat) * (gpsIfd.get(1) === "S" ? -1 : 1);
    const lo = dms(lon) * (gpsIfd.get(3) === "W" ? -1 : 1);
    if (la || lo) {
      gps = { lat: la, lon: lo };
      fields.unshift({ label: "GPS location", value: `${la.toFixed(5)}, ${lo.toFixed(5)}` });
      const alt = gpsIfd.get(6);
      if (typeof alt === "number") fields.splice(1, 0, { label: "Altitude", value: `${alt.toFixed(0)} m` });
    }
  }

  return { fields, gps };
}
