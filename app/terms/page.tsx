import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

const body = `
## Agreement

By downloading or using ${site.name} you agree to these terms and to Apple's Licensed Application End User License Agreement. If you don't agree, please don't use the app.

## Your pattern is the only key

${site.name} is built so that only you can open your vaults. **We can't recover your pattern or your files.** You're responsible for remembering your pattern. We aren't liable for data you can't access because a pattern was forgotten.

## Your files live on one device

Vaults are stored only on the device where you created them. They aren't included in iCloud or computer backups, and they're gone if the device is lost, erased or replaced, or if you delete the app. Keep a copy of anything irreplaceable somewhere else.

## Destructive features

Features such as the duress vault permanently erase data. Use them at your own risk. You're responsible for making sure your use of these features is lawful where you live and travel.

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
  return <LegalPage title="Terms of Use" updated="October 23, 2026" body={body} />;
}
