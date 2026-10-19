export type Tool = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  body: string;
  faq: { q: string; a: string }[];
};

export const tools: Tool[] = [
  {
    slug: "photo-metadata",
    title: "Photo Metadata Viewer & Remover",
    icon: "pin",
    summary: "See the hidden details inside a photo, including GPS location, camera and time, and download a clean copy.",
    description: "Check a photo for GPS location, camera model and timestamps, then download a copy with all metadata removed. Runs entirely in your browser.",
    body: `
## What's hidden in a photo

JPEG photos from phones usually carry **EXIF** metadata: the camera make and model, the exact date and time, the lens and exposure settings, and often **GPS coordinates** accurate to a few metres.

## How the cleaning works

The tool draws your image onto a canvas and saves a new file from it. Only the pixels survive. All EXIF, GPS, and other embedded data is dropped. The file never leaves your device.
`,
    faq: [
      { q: "Does this upload my photo?", a: "No. Everything happens in your browser. You can turn off Wi-Fi after the page loads and it still works." },
      { q: "Why does the clean copy look slightly different?", a: "Some photos rely on an orientation tag. The tool applies rotation before saving, so the clean copy looks the same, just without the tag." },
      { q: "Does it read HEIC files?", a: "Browser support for HEIC varies. If yours can't open it, export the photo as JPEG from your iPhone first." },
    ],
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    icon: "compress",
    summary: "Shrink JPEG, PNG and WebP files with a live quality preview. Nothing is uploaded.",
    description: "Compress images in your browser with a quality slider and side-by-side size comparison. Private, fast, and free.",
    body: `
## Getting the balance right

For photos, a quality of **70–85%** usually cuts file size by half or more with no visible difference. Screenshots and graphics with sharp edges compress better as **PNG** or **WebP**.

## Private by design

Online compressors normally upload your image to their server. This one doesn't: your browser does the work.
`,
    faq: [
      { q: "What's the best format for small files?", a: "WebP usually gives the smallest files at the same visual quality, and every modern browser supports it." },
      { q: "Will compressing remove metadata?", a: "Yes. Re-encoding through the browser drops EXIF data, including location." },
    ],
  },
  {
    slug: "image-resizer",
    title: "Image Resizer",
    icon: "resize",
    summary: "Resize to exact pixel dimensions or a percentage, with the aspect ratio locked if you want.",
    description: "Resize images to exact dimensions or a percentage, right in your browser. Useful for profile pictures, forms and email.",
    body: `
## Common sizes

| Use | Size |
| --- | --- |
| Profile picture | 400 × 400 |
| Email attachment | 1600px longest side |
| Full HD wallpaper | 1920 × 1080 |
| Instagram portrait | 1080 × 1350 |
`,
    faq: [{ q: "Can I make an image bigger?", a: "You can, but enlarging can't add detail, so the result will look softer." }],
  },
  {
    slug: "image-converter",
    title: "Image Format Converter",
    icon: "convert",
    summary: "Convert between JPG, PNG and WebP in one click, for single images or a whole batch.",
    description: "Convert images between JPG, PNG and WebP locally in your browser. Batch-friendly, private and free.",
    body: `
## Which format should I pick?

- **JPG:** photos and wide compatibility. No transparency.
- **PNG:** screenshots, logos and transparency. Lossless, larger files.
- **WebP:** a modern format that's small and supports transparency. Great for the web.
`,
    faq: [{ q: "Is converting to PNG lossless?", a: "PNG itself is lossless, but if the source was a JPG, any quality already lost stays lost." }],
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    icon: "qr",
    summary: "Make QR codes for links, text or Wi-Fi networks. Download as PNG or SVG, with no tracking redirects.",
    description: "Generate QR codes for URLs, text and Wi-Fi in your browser. No tracking short-links, no expiry, PNG and SVG downloads.",
    body: `
## No middleman

Many QR generators wrap your link in their own short-link so they can track scans, or make the code stop working unless you pay. Codes made here contain your exact content and nothing else, so they never expire.

## Wi-Fi codes

Choose **Wi-Fi**, enter the network name and password, and guests can join by pointing their camera at the code.
`,
    faq: [
      { q: "Do these QR codes expire?", a: "No. The content is encoded directly in the image." },
      { q: "SVG or PNG?", a: "SVG for print, because it scales to any size without blurring. PNG for sharing on screens and in documents." },
    ],
  },
  {
    slug: "pixelate-image",
    title: "Pixelate & Redact",
    icon: "blur",
    summary: "Drag over faces, names or numbers to pixelate or black them out before you share a screenshot.",
    description: "Pixelate or black out parts of an image in your browser. Ideal for hiding faces, names and account numbers before sharing.",
    body: `
## Pixelate or black out?

Light pixelation can sometimes be partially reversed on text. For **account numbers, addresses and passwords**, use **solid black boxes**. Pixelation is fine for faces and backgrounds.
`,
    faq: [{ q: "Is the original kept anywhere?", a: "No. The image is only held in your browser tab and is discarded when you close it." }],
  },
  {
    slug: "password-generator",
    title: "Password & Passphrase Generator",
    icon: "key",
    summary: "Create strong random passwords or memorable passphrases, using your browser's secure random generator.",
    description: "Generate strong passwords and passphrases with your browser's cryptographic random number generator. Nothing is sent or stored.",
    body: `
## Password or passphrase?

A **random password** like \`t7#Qm!x2Vz9@pL\` is very strong but hard to remember. A **passphrase** of five or six random words is easier to remember and still strong, as long as the words are chosen randomly, not by you.

## Truly random

The generator uses \`crypto.getRandomValues\`, the same secure randomness source browsers use for encryption.
`,
    faq: [{ q: "Is the password saved anywhere?", a: "No. It exists only on the page until you copy it or close the tab." }],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
