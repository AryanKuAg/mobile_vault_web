import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

const body = `
## Agreement

By downloading or using ${site.name} you agree to these terms and to Apple's [Licensed Application End User License Agreement](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/). If you don't agree, please don't use the app.

## Your pattern and recovery phrase are the only keys

${site.name} is built so that only you can open your vaults. **We can't recover your pattern, your recovery phrase or your files.** You're responsible for remembering your pattern and keeping each vault's recovery phrase safe. Anyone who has your iPhone and a vault's recovery phrase can open that vault, so keep the phrase where other people won't find it. An iCloud backup can only be restored with its vault's recovery phrase. We aren't liable for data you can't access because a pattern and its recovery phrase were both lost.

## Where your files are

Vaults are stored on the iPhone where you made them, and they aren't included in iCloud or computer backups of the iPhone. Without Encrypted Backup, they're gone if the iPhone is lost, erased or replaced, or if you delete the app. With Encrypted Backup (${site.name} 2.0 and later, free), an encrypted copy of a vault is kept in your iCloud, and you can restore it with the vault's recovery phrase. Keep a copy of anything irreplaceable somewhere else too.

## ${site.name} Pro

${site.name} is free to download. ${site.name} Pro, from version 2.0, is optional. It unlocks unlimited photos, videos and vaults, vault sharing, the panic vault, disguised app icons and slideshow. Encrypted Backup is free for everyone. The free plan holds up to 100 photos, 10 videos and 3 vaults; files and notes have no limit.

- **Plans.** Pro is sold as a weekly or a yearly auto-renewing subscription, or as a one-time lifetime purchase. The app shows each plan's price and length before you buy. The yearly plan may start with a free trial if you haven't had one.
- **Payment and renewal.** Payment is charged to your Apple Account when you confirm the purchase. A subscription renews automatically, at the same price and for the same length, unless you cancel it at least 24 hours before the current period ends. Your account is charged for the renewal within the 24 hours before the period ends. If you buy a subscription during a free trial, the rest of the trial ends.
- **Cancelling.** Manage or cancel subscriptions in iPhone Settings › your name › Subscriptions. Cancelling stops the next renewal, and Pro stays on until the end of the period you've paid for.
- **Refunds.** Apple handles payments and refunds. To ask for a refund, visit [reportaproblem.apple.com](https://reportaproblem.apple.com).
- **When Pro ends.** You keep everything you've added, but adding photos, videos or vaults beyond the free plan's limits needs Pro again. Things you set up while you had Pro, such as your app icon, a panic vault and earlier shares, keep working, and so do your backups.
- **Restoring purchases.** On another iPhone with the same Apple Account, tap Restore on the ${site.name} Pro screen.

## Shared vaults

Share only what you have the right to share. Never share intimate images of anyone without their consent, or anything illegal. A vault shared with you is view-only, and you can leave it at any time. If something in a vault shared with you shouldn't be there, tap Report a Problem in that vault's settings, or email us. Shared vaults are end-to-end encrypted, so we can't see what's in them, but we read every report and reply.

## Deleting data

Delete This Vault and Wipe Everything permanently erase data, including the vaults' iCloud backups, and stop their shares. Deleting the app erases the vaults on the iPhone. None of this can be undone, and we have no copy to restore from.

## Acceptable use

Don't use ${site.name} to store or share illegal content, to share intimate images of anyone without their consent, to harass others, or to infringe anyone's rights.

## Beta versions

Test versions distributed through TestFlight may contain bugs. Don't keep the only copy of anything important in a beta.

## No warranty

The app is provided "as is." We work hard to keep it secure and reliable, but we can't promise it'll be free of errors or interruptions.

## Limitation of liability

To the fullest extent permitted by law, ${site.company} isn't liable for indirect, incidental or consequential damages arising from your use of the app, including lost data. Nothing in these terms limits rights you have under consumer protection laws that can't be changed by agreement.

## Changes

We may update these terms. Continued use after changes means you accept the new terms.

## Contact

${site.company} · ${site.supportEmail}
`;

export default function TermsPage() {
  return <LegalPage title="Terms of Use" updated="November 27, 2026" body={body} />;
}
