import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

const body = `
## The short version

${site.name} is designed so that we don't collect personal data. We don't require an account, we can't read your vault, and we don't use advertising or analytics SDKs in the app.

## Data we never receive

- The contents of your vault: photos, videos, files, notes, album and vault names.
- Your pattern, recovery phrase, or any key derived from them.
- Your name, email address or phone number. No account exists.

## Data stored by Apple on your behalf

If you turn on **Encrypted Backup** or **Device Sync**, encrypted data is stored in your private iCloud container. Apple's privacy policy covers that storage. The data is encrypted on your device before upload and we can't read it.

Purchases and subscriptions are processed by Apple. We receive anonymous transaction information from Apple to unlock Pro features. It doesn't include your name or email.

## Private Sharing links

When you create a sharing link, an encrypted copy of the selected files is uploaded to our storage provider. The decryption key is kept in the link itself and never sent to us. Shared copies are deleted when they expire or when you revoke them. We keep minimal technical logs (such as the time of upload and download count) to enforce expiry and limits.

## Support emails

If you email us, we receive your email address and whatever you write. We use it only to reply, and delete support threads after 12 months.

## This website

This site doesn't use advertising cookies. If we use privacy-friendly, cookie-less analytics, it doesn't track you across sites or build a profile of you.

## Children

${site.name} isn't directed to children under 13, and we don't knowingly collect data from them.

## Changes

If we change this policy we'll update the date above and, for meaningful changes, note it in [What's New](/whats-new).

## Contact

${site.company} · ${site.supportEmail}
`;

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="October 1, 2026" body={body} />;
}
