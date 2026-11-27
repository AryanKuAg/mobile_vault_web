import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

const body = `
## The short version

${site.name} doesn't collect personal data. There's no account, we have no servers, and the app contains no analytics, advertising or tracking code. Everything in your vaults is encrypted on your iPhone, and only you hold the keys. If you turn on Encrypted Backup or share a vault (${site.name} 2.0 and later), an encrypted copy goes to your own iCloud account, where neither we nor Apple can read it.

## What the app does with your data

- **Your files are encrypted on your iPhone.** Photos, videos, notes and files you add are encrypted on the device with AES-256-GCM and stored there. They're excluded from iCloud and computer backups of the iPhone.
- **Your pattern is never stored.** It's turned into an encryption key on the device and then discarded.
- **Your recovery phrase stays with you.** It's shown only on your iPhone. From version 2.0, a vault keeps a copy of its phrase inside itself, encrypted with the vault's own key, so you can turn on Encrypted Backup without typing it again. It's never sent anywhere, and we never see it.
- **Encrypted Backup (optional, ${site.name} Pro).** When you turn it on for a vault, the vault is encrypted on your iPhone with keys made from its recovery phrase, then saved in your own private iCloud database, as part of your iCloud storage. Neither we nor Apple can read it. Turning backup off, Delete This Vault and Wipe Everything delete the vault's backups.
- **Vault sharing (optional, ${site.name} Pro).** When you share a vault, an encrypted copy of it is kept in your iCloud and shared, through iCloud, with the person who types the share phrase you give them. The invitation waits in ${site.name}'s public iCloud database, sealed with that phrase, and works only once. We can't read shared vaults. You can stop sharing at any time, and the other person can leave the vault or report a problem to us.
- **Purchases.** ${site.name} Pro is bought through Apple. Apple handles the payment, and we don't receive your payment details or your Apple Account details. The app asks the App Store whether Pro is active for your Apple Account.
- **We receive nothing.** We have no servers, so the app sends nothing to us. It goes online only to use Apple's services: iCloud for backup and sharing, if you use them, and the App Store for purchases. It also opens pages and emails when you choose to: this policy or our support page from Settings, Rate ${site.name} (which opens the App Store), and Contact Support or Report a Problem (which open an email for you to send).

## Permissions the app asks for

${site.name} asks for a permission only when you first use the feature that needs it:

- **Camera and microphone** (${site.name} 2.0 and later), to take photos and videos straight into a vault. They never go to your photo library.
- **Adding to your photo library**, to save a photo or video from a vault back to Photos, and, from version 2.0, to save the picture for a disguised Home Screen icon.
- **Full access to your photo library** (${site.name} 2.0 and later), only if you choose to delete the originals after an import. ${site.name} uses it only to delete the items you imported.

Imports don't need any permission: photos and videos come through the system photo picker, and files through the system file picker, which share only what you select. ${site.name} never browses your library, and it doesn't use your location or contacts.

You can change permissions at any time in the Settings app.

## Data Apple handles

Apple processes App Store downloads and purchases, stores your encrypted backups and shared vaults in iCloud if you use them, and, if you've agreed to share them, collects crash reports and usage data through iOS. Apple's privacy policy covers that. If you test a beta through TestFlight, Apple shares the feedback and crash reports you choose to send with us, together with the name and email address you were invited with, so we can fix problems. We use them only for that.

## Support emails

If you email us, we receive your email address and whatever you write. Contact Support and Report a Problem in the app start the email with the app's version, the iOS version and the type of device, which you can delete before sending. We use emails only to reply and to fix problems.

## Deleting your data

Delete This Vault and Wipe Everything permanently delete vaults, along with their iCloud backups, and stop their shares. Turning off Encrypted Backup deletes that vault's backups. Deleting the app deletes the vaults on the iPhone but not backups in your iCloud, so turn off Encrypted Backup first if you want those gone too.

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
  return <LegalPage title="Privacy Policy" updated="November 27, 2026" body={body} />;
}
