import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "safety-check-iphone-explained",
  title: "Safety Check on iPhone: What It Does and Doesn't Do",
  description:
    "Safety Check shows who and which apps can see your location and data, and can stop it fast. What Emergency Reset changes, what it misses, and who might notice.",
  category: "Security",
  published: "2026-11-01",
  author: "surya-narayanan",
  related: ["/scenarios/controlling-relationship-phone-safety", "/scenarios/partner-knows-my-passcode", "/blog/stolen-device-protection-iphone-explained"],
  body: `
Safety Check is a tool in iPhone Settings that lets you review which people and apps can see your information and stop that sharing. It has two modes: Emergency Reset, which stops everything at once, and Manage Sharing & Access, which lets you go one person or app at a time. It is one useful step. It is not a safety plan, and changes you make with it may be noticed.

This piece explains what it covers and where it stops. If you are worried about someone's behaviour rather than just your settings, read the section on safety before you change anything.

> If you are in immediate danger, call your local emergency number. In the US, the National Domestic Violence Hotline is 800-799-7233, or text START to 88788 (see [thehotline.org](https://www.thehotline.org/)). Elsewhere, search for your country's helpline, using a device the other person can't access.

## Where to find Safety Check

Open **Settings**, then **Privacy & Security**, then **Safety Check**. According to [Apple's Safety Check guide](https://support.apple.com/guide/personal-safety/ips2aad835e1), you need an iPhone with iOS 16 or later and an Apple Account that uses two-factor authentication, and you need to be signed in. On an iPad, a Mac, or an older iPhone, Apple points to three manual checklists instead: limiting device and account access, managing location information, and managing content.

## Emergency Reset or Manage Sharing & Access?

**Emergency Reset** immediately stops sharing with all people and apps. Apple's page says it also lets you review your emergency contacts, the devices connected to your Apple Account and the phone numbers used to verify your identity, and change your Apple Account password.

**Manage Sharing & Access** is slower and more selective. You can:

- **Review people:** pick someone, see what you share with them, and stop what you choose.
- **Review apps:** pick an app, see what it can reach, and stop what you choose.
- **Review by type of information:** browse by what is shared rather than by who gets it.
- **Check account and security:** review and remove connected devices, update phone numbers, your Apple Account password, emergency contacts and your device passcode or Face ID and Touch ID.

Changes are saved as you go. Once you finish, Apple suggests going back and checking the People and Apps views to confirm that nothing is still shared.

## What it changes

Per the same Apple page, Safety Check can affect:

- Sharing with people and apps
- Devices connected to your Apple Account
- Phone numbers used to verify your identity
- Emergency contacts
- Your Apple Account password and iPhone passcode
- System privacy permissions for apps

That is a wide list, which is why Emergency Reset is a big step. It is meant for when you want everything stopped now, not for tidying up.

## What it doesn't cover

Apple is clear about the limits. Safety Check doesn't cover:

- Non-Apple accounts and their passwords
- Social media sharing
- Devices signed in to a different Apple Account
- iPads or Macs that have sharing turned on for other apps

If a screen-time restriction or a device management profile is installed, it still works, but some options may be unavailable. And if Stolen Device Protection is on, Apple says Safety Check may work a little differently. Our explainer on [Stolen Device Protection](/blog/stolen-device-protection-iphone-explained) covers what that setting does.

Nothing in Safety Check checks your phone for hidden monitoring software, and Apple's pages don't describe it as doing so. It shows what is shared through Apple's own features. Software installed by someone else is a different question, and an advocate is better placed to help with it.

## Quick Exit

Every Safety Check screen has a **Quick Exit** button in the top-right corner. Apple's guide says it closes Settings and returns you to the Home Screen, and that changes you've made before using it are saved. Apple's FAQ explains the reason: people in abusive situations may need to rapidly hide their use of Safety Check.

Quick Exit hides the screen, not the fact that you changed something.

## Who might notice

This is the part to think about first. Apple's [overview of the Personal Safety guide](https://support.apple.com/en-nz/guide/personal-safety/overview-ips1c3310dd2/web) says: "Changes you make to sharing or access may be noticed by others." The page doesn't spell out exactly what another person would see. Apple's Safety Check page adds that some apps and services notify people when you resume sharing with them.

In practice, that means you should assume stopping location sharing, removing a device or changing a password could be noticed, even if you can't be sure how. If anyone checks your phone, controls who you talk to, or reacts badly to boundaries, a sudden change can raise suspicion and make things more dangerous.

Advocates often suggest talking to a trained person before changing settings, and keeping the phone looking normal in the meantime. Our scenario on [a controlling relationship and phone checking](/scenarios/controlling-relationship-phone-safety) goes through that calmly, and [when a partner knows your passcode](/scenarios/partner-knows-my-passcode) covers a related situation.

## When Safety Check is a good fit

- You are ending a relationship or friendship and want to remove old location, photo and calendar sharing.
- You gave an app or family member access years ago and want to see what is still shared.
- You are selling or handing down a phone and want to check what is connected to your account.
- You are worried about your own account security and want to see every device and phone number tied to it.

In those cases, **Manage Sharing & Access** is usually the better start, because you can see each item before you stop it.

## A note on keeping private things on your phone

Safety Check controls what is shared with other people and apps. It does not hide what is on your own phone. PrivateRoll, which we make, is a separate kind of tool: an encrypted vault for photos, videos and files, where [each pattern opens its own vault](/features/decoy-vaults). It does not review sharing, detect monitoring or replace advice from a helpline.

## Related reading from Apple

Apple's Personal Safety User Guide also has "Get safe" and "Stay safe" sections, and a list of organisations that can help. The Safety Check pages are the right place to confirm the current steps, because the wording changes between iOS versions.
`,
  faq: [
    {
      q: "Where is Safety Check on iPhone?",
      a: "Open Settings, tap Privacy & Security, then Safety Check. It needs iOS 16 or later and an Apple Account that uses two-factor authentication.",
    },
    {
      q: "What does Emergency Reset do?",
      a: "It immediately stops sharing with all people and apps, and lets you review your emergency contacts, connected devices and verification phone numbers, and change your Apple Account password.",
    },
    {
      q: "Will the other person know if I use Safety Check?",
      a: "Apple says changes you make to sharing or access may be noticed by others, and some apps notify people when you resume sharing. Its pages don't say exactly what they would see, so assume a change could be noticed.",
    },
    {
      q: "Does Safety Check find spyware on my iPhone?",
      a: "No. It reviews what you share through Apple's own features and your account security. It doesn't cover non-Apple accounts, social media sharing or devices signed in to a different Apple Account.",
    },
    {
      q: "What does the Quick Exit button do?",
      a: "It closes Settings and returns you to the Home Screen right away, and keeps the changes you've already made.",
    },
  ],
};
