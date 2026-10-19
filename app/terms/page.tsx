import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use" };

const body = `
## Agreement

By downloading or using ${site.name} you agree to these terms and to Apple's Licensed Application End User License Agreement. If you don't agree, please don't use the app.

## Your responsibility for your keys

${site.name} is built so that only you can open your vault. **We can't recover your pattern, your recovery phrase or your files.** You're responsible for remembering your pattern and keeping your recovery phrase safe. We aren't liable for data you can't access because of a lost pattern or phrase.

## Destructive features

Features such as the Panic Pattern permanently erase data. Use them at your own risk. You're responsible for making sure your use of these features is lawful where you live and travel.

## Acceptable use

Don't use ${site.name} or Private Sharing to store or distribute illegal content, to harass others, or to infringe anyone's rights. We may disable sharing links that we're legally required to remove.

## Subscriptions

${site.name} Pro is sold through the App Store. Payment, renewal, cancellation and refunds are handled by Apple under its terms.

## No warranty

The app is provided "as is." We work hard to keep it secure and reliable, but we can't promise it'll be free of errors or interruptions.

## Limitation of liability

To the fullest extent permitted by law, ${site.company} isn't liable for indirect, incidental or consequential damages arising from your use of the app.

## Changes

We may update these terms. Continued use after changes means you accept the new terms.

## Contact

${site.company} · ${site.supportEmail}
`;

export default function TermsPage() {
  return <LegalPage title="Terms of Use" updated="October 1, 2026" body={body} />;
}
