import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

const body = `
## The short version

${site.name} doesn't collect personal data. There's no account, the app has no servers, and it contains no analytics, advertising or tracking code. Your vaults never leave your iPhone.

## What the app does with your data

- **Your files stay on your iPhone.** Photos, videos and files you add are encrypted on your iPhone and stored only there. They're never uploaded, and they're excluded from iCloud and computer backups.
- **Your pattern is never stored.** It's turned into an encryption key on the device and then discarded.
- **Your recovery phrase is never stored.** Each vault's recovery phrase is shown only on your iPhone, when the vault is made. ${site.name} never keeps it or sends it anywhere, and it can only open that vault on that iPhone.
- **We receive nothing.** The app makes no network requests of its own. It only goes online when you choose to: opening this policy or our support page from Settings, tapping Rate ${site.name} (which opens the App Store), or tapping Contact Support (which opens an email for you to send).

## Permissions the app asks for

- **Adding to your photo library**, only if you choose to save a photo or video from a vault back to Photos with Save in the share sheet.

Imports don't need any permission: photos and videos come through the system photo picker, and files through the system file picker, which share only what you select. ${site.name} never browses your library, and it doesn't use the camera, microphone, location or contacts.

You can change permissions at any time in the Settings app.

## Data Apple handles

Apple processes App Store downloads, and, if you've agreed to share them, crash reports and usage data collected by iOS. Apple's privacy policy covers that. If you test a beta through TestFlight, Apple shares the feedback and crash reports you choose to send with us, together with the name and email address you were invited with, so we can fix problems. We use them only for that.

## Support emails

If you email us, we receive your email address and whatever you write. We use it only to reply.

## This website

This site has no advertising, analytics or tracking cookies. Our host, Vercel, processes standard request data such as IP addresses to serve the site and keep it secure. The site's fonts are served from this site, not from a third party. The free tools run entirely in your browser, and the files you use with them aren't uploaded.

## Children

${site.name} isn't directed to children under 13, and we don't collect personal data from anyone, including children.

## Changes

If this policy changes, we'll update the date at the top and, for meaningful changes, note it in [What's New](/whats-new).

## Contact

${site.company} · ${site.supportEmail}
`;

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="November 11, 2026" body={body} />;
}
