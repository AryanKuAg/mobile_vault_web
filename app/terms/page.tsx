import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

const body = `
## Agreement

By downloading or using ${site.name} you agree to these terms and to Apple's Licensed Application End User License Agreement. If you don't agree, please don't use the app.

## Your pattern and recovery phrase are the only keys

${site.name} is built so that only you can open your vaults. **We can't recover your pattern, your recovery phrase or your files.** You're responsible for remembering your pattern and keeping each vault's recovery phrase safe. Anyone who has your iPhone and a vault's recovery phrase can open that vault, so keep the phrase where other people won't find it. We aren't liable for data you can't access because a pattern and its recovery phrase were both lost.

## Your files live on one iPhone

Vaults are stored only on the iPhone where you created them. They aren't included in iCloud or computer backups, and they're gone if the iPhone is lost, erased or replaced, or if you delete the app. Keep a copy of anything irreplaceable somewhere else.

## Deleting data

Delete This Vault and Wipe Everything permanently erase data, and so does deleting the app. These can't be undone, and we have no copy to restore from.

## Acceptable use

Don't use ${site.name} to store or distribute illegal content, to harass others, or to infringe anyone's rights.

## Beta versions

Test versions distributed through TestFlight may contain bugs. Don't keep the only copy of anything important in a beta.

## No warranty

The app is provided "as is." We work hard to keep it secure and reliable, but we can't promise it'll be free of errors or interruptions.

## Limitation of liability

To the fullest extent permitted by law, ${site.company} isn't liable for indirect, incidental or consequential damages arising from your use of the app, including lost data.

## Changes

We may update these terms. Continued use after changes means you accept the new terms.

## Contact

${site.company} · ${site.supportEmail}
`;

export default function TermsPage() {
  return <LegalPage title="Terms of Use" updated="November 11, 2026" body={body} />;
}
