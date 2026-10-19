import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, CtaBand, Faq, InlineCta, PageHero, Related } from "@/components/page-parts";
import { ImageCompressorTool } from "@/components/tools/image-compressor";
import { ImageConverterTool } from "@/components/tools/image-converter";
import { ImageResizerTool } from "@/components/tools/image-resizer";
import { PasswordGeneratorTool } from "@/components/tools/password-generator";
import { PhotoMetadataTool } from "@/components/tools/photo-metadata";
import { PixelateTool } from "@/components/tools/pixelate";
import { QrGeneratorTool } from "@/components/tools/qr-generator";
import { getTool, tools } from "@/content/tools";
import { Markdown } from "@/lib/markdown";

const widgets: Record<string, React.ReactNode> = {
  "photo-metadata": <PhotoMetadataTool />,
  "image-compressor": <ImageCompressorTool />,
  "image-resizer": <ImageResizerTool />,
  "image-converter": <ImageConverterTool />,
  "qr-code-generator": <QrGeneratorTool />,
  "pixelate-image": <PixelateTool />,
  "password-generator": <PasswordGeneratorTool />,
};

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tools/[slug]">): Promise<Metadata> {
  const t = getTool((await params).slug);
  if (!t) return {};
  return { title: t.title, description: t.description };
}

export default async function ToolPage({ params }: PageProps<"/tools/[slug]">) {
  const tool = getTool((await params).slug);
  const widget = tool && widgets[tool.slug];
  if (!tool || !widget) notFound();

  return (
    <>
      <PageHero
        eyebrow="Free tool · Runs on your device"
        title={tool.title}
        lede={tool.summary}
        crumbs={[{ href: "/tools", label: "Tools" }, { label: tool.title }]}
      />
      <section className="py-14">
        <Container>
          {widget}
          <div className="mt-16 max-w-3xl">
            <Markdown source={tool.body} />
            {tool.faq.length > 0 && (
              <div className="mt-14">
                <h2 className="mb-6 font-display text-2xl font-bold">FAQ</h2>
                <Faq items={tool.faq} />
              </div>
            )}
            <InlineCta />
            <Related
              title="More free tools"
              links={tools.filter((t) => t.slug !== tool.slug).map((t) => ({ href: `/tools/${t.slug}`, label: t.title }))}
            />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
