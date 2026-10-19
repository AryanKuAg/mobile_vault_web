import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// A deliberately small Markdown subset for site content:
// ## / ### headings, paragraphs, - and 1. lists, > callouts, | tables |,
// and inline **bold**, *italic*, `code`, [links](/path).

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (tok.startsWith("**")) out.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("`")) out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    else if (tok.startsWith("[")) {
      const [, label, href] = tok.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      out.push(
        href.startsWith("/") ? (
          <Link key={key} href={href}>
            {label}
          </Link>
        ) : (
          <a key={key} href={href} rel="noopener noreferrer" target="_blank">
            {label}
          </a>
        ),
      );
    } else out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function headings(md: string) {
  return md
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => ({ id: slugify(l.slice(3)), text: l.slice(3) }));
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);

  return (
    <div className="prose-vault">
      {blocks.map((raw, b) => {
        const block = raw.trim();
        const lines = block.split("\n").map((l) => l.trim());
        const key = `b${b}`;

        if (block.startsWith("### ")) return <h3 key={key}>{inline(block.slice(4), key)}</h3>;
        if (block.startsWith("## "))
          return (
            <h2 key={key} id={slugify(block.slice(3))}>
              {inline(block.slice(3), key)}
            </h2>
          );
        if (lines.every((l) => l.startsWith("- ")))
          return (
            <ul key={key}>
              {lines.map((l, i) => (
                <li key={i}>{inline(l.slice(2), `${key}-${i}`)}</li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\d+\.\s/.test(l)))
          return (
            <ol key={key}>
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\d+\.\s/, ""), `${key}-${i}`)}</li>
              ))}
            </ol>
          );
        if (lines.every((l) => l.startsWith(">")))
          return (
            <blockquote key={key}>
              {inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "), key)}
            </blockquote>
          );
        if (lines.every((l) => l.startsWith("|"))) {
          const rows = lines
            .filter((l) => !/^\|(\s*:?-+:?\s*\|)+$/.test(l))
            .map((l) => l.slice(1, -1).split("|").map((c) => c.trim()));
          const [head, ...body] = rows;
          return (
            <table key={key}>
              <thead>
                <tr>
                  {head.map((c, i) => (
                    <th key={i}>{inline(c, `${key}-h${i}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((r, ri) => (
                  <tr key={ri}>
                    {r.map((c, ci) => (
                      <td key={ci}>{inline(c, `${key}-${ri}-${ci}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }
        return (
          <p key={key}>
            {lines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                {inline(l, `${key}-${i}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
