import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

const body = `
## The short version

${site.name} doesn't collect personal data. There's no account, the app has no servers, and it contains no analytics, advertising or tracking code. Your vaults never leave your device.

## What the app does with your data

- **Your files stay on your device.** Photos, videos, files and notes you add are encrypted on your iPhone or iPad and stored only there. They're never uploaded, and they're excluded from iCloud and computer backups.
- **Your pattern is never stored.** It's turned into an encryption key on the device and then discarded.
- **We receive nothing.** The app makes no network requests of its own. It only goes online when you open a page of this website from inside it, such as this policy.

## Permissions the app asks for

- **Camera and microphone**, to take photos and videos straight into a vault. Nothing is saved to your photo library.
- **Photo library**, only when you choose to remove originals after importing them or to save an item from a vault to your library. ${site.name} never browses your library: imports use the system photo picker, which shares only what you select.

You can change these at any time in the Settings app.

## Data Apple handles

Apple processes App Store downloads, and, if you've agreed to share them, crash reports and usage data collected by iOS. Apple's privacy policy covers that. If you test a beta through TestFlight, Apple shares the feedback and crash reports you choose to send with us, together with the name and email address you were invited with, so we can fix problems. We use them only for that.

## Support emails

If you email us, we receive your email address and whatever you write. We use it only to reply.

## This website

This site has no advertising, analytics or tracking cookies. Our host, Vercel, processes standard request data such as IP addresses to serve the site and keep it secure. The site remembers your light or dark theme in your browser's local storage, which never leaves your device. The free tools run entirely in your browser, and the files you use with them aren't uploaded.

## Children

${site.name} isn't directed to children under 13, and we don't collect personal data from anyone, including children.

## Changes

If this policy changes, we'll update the date at the top and, for meaningful changes, note it in [What's New](/whats-new).

## Contact

${site.company} · ${site.supportEmail}
`;

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="October 23, 2026" body={body} />;
}
