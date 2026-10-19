"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { Field, Panel, download, inputClass } from "./shared";

type Mode = "url" | "text" | "wifi";

function wifiPayload(ssid: string, pass: string, sec: string, hidden: boolean) {
  const esc = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
  return `WIFI:T:${sec};S:${esc(ssid)};${sec === "nopass" ? "" : `P:${esc(pass)};`}${hidden ? "H:true;" : ""};`;
}

export function QrGeneratorTool() {
  const [mode, setMode] = useState<Mode>("url");
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [ssid, setSsid] = useState("");
  const [pass, setPass] = useState("");
  const [sec, setSec] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  const [fg, setFg] = useState("#23242f");
  const [bg, setBg] = useState("#ffffff");
  const [svg, setSvg] = useState("");

  const payload = mode === "url" ? url : mode === "text" ? text : ssid ? wifiPayload(ssid, pass, sec, hidden) : "";
  const valid = payload.trim().length > 0 && payload !== "https://";

  useEffect(() => {
    if (!valid) return;
    let live = true;
    QRCode.toString(payload, { type: "svg", margin: 2, errorCorrectionLevel: "M", color: { dark: fg, light: bg } })
      .then((s) => live && setSvg(s))
      .catch(() => live && setSvg(""));
    return () => {
      live = false;
    };
  }, [payload, fg, bg, valid]);

  async function savePng() {
    const dataUrl = await QRCode.toDataURL(payload, { width: 1024, margin: 2, color: { dark: fg, light: bg } });
    download(await (await fetch(dataUrl)).blob(), "qr-code.png");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <Panel className="space-y-5">
        <div className="inline-flex rounded-full border border-line bg-bg p-1" role="tablist">
          {(["url", "text", "wifi"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold ${mode === m ? "bg-accent text-accent-ink" : "text-muted"}`}
            >
              {m === "url" ? "Link" : m === "text" ? "Text" : "Wi-Fi"}
            </button>
          ))}
        </div>
        {mode === "url" && (
          <Field label="Website address">
            <input value={url} onChange={(e) => setUrl(e.target.value)} className={inputClass} inputMode="url" />
          </Field>
        )}
        {mode === "text" && (
          <Field label="Text">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className={inputClass} />
          </Field>
        )}
        {mode === "wifi" && (
          <>
            <Field label="Network name (SSID)">
              <input value={ssid} onChange={(e) => setSsid(e.target.value)} className={inputClass} />
            </Field>
            <Field label="Security">
              <select value={sec} onChange={(e) => setSec(e.target.value)} className={inputClass}>
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </Field>
            {sec !== "nopass" && (
              <Field label="Password">
                <input value={pass} onChange={(e) => setPass(e.target.value)} className={inputClass} />
              </Field>
            )}
            <label className="flex items-center gap-2 text-sm font-semibold text-muted">
              <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="h-4 w-4 accent-accent" />
              Hidden network
            </label>
          </>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Code colour">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-11 w-full cursor-pointer rounded-xl border border-line bg-bg" />
          </Field>
          <Field label="Background">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-11 w-full cursor-pointer rounded-xl border border-line bg-bg" />
          </Field>
        </div>
      </Panel>
      <Panel className="flex flex-col items-center justify-center gap-6">
        {valid && svg ? (
          <div className="w-full max-w-[300px] overflow-hidden rounded-2xl [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="grid aspect-square w-full max-w-[300px] place-items-center rounded-2xl border-2 border-dashed border-line text-center text-sm text-faint">
            Your QR code will appear here
          </div>
        )}
        <div className="flex gap-3">
          <button type="button" className="btn btn-primary" disabled={!valid} onClick={savePng}>PNG</button>
          <button type="button" className="btn btn-ghost" disabled={!valid || !svg} onClick={() => download(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg")}>
            SVG
          </button>
        </div>
      </Panel>
    </div>
  );
}
