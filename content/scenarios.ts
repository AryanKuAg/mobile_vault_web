import type { Article } from "@/content/guides";

export type Scenario = Article & { group: "Everyday boundaries" | "Travel and devices" | "Safety and evidence" };

export const scenarios: Scenario[] = [
  {
    slug: "partner-knows-my-passcode",
    group: "Everyday boundaries",
    title: "My partner knows my iPhone passcode. How do I keep some things private?",
    description: "Sharing a passcode is normal in many relationships. Keeping a few things to yourself can be too. Here's how to do it calmly.",
    category: "Scenario",
    updated: "2026-09-20",
    readMinutes: 4,
    body: `
Many couples share passcodes for practical reasons: answering a call while the other drives, or finding a photo. That doesn't mean everything on your phone has to be shared.

## What your passcode opens

Photos (including the Hidden album), Messages, Notes locked with the device passcode, Files, and most apps that use Face ID with a passcode fallback.

## A low-drama approach

1. **Decide what actually needs protecting.** Usually it's a small set of things: medical records, a surprise, or photos from before the relationship.
2. **Move those into a vault with its own secret.** Your passcode won't open it. See how a [pattern key](/features/pattern-key) works.
3. **Keep the app out of sight.** Move it off the Home Screen into the App Library, or use iOS's own **Hide and Require Face ID** for it, so it draws fewer questions.
4. **Empty Recently Deleted** after you move things.

## If you feel unsafe

If you're keeping things private because you're afraid of how your partner will react, that matters more than any app. Our [safety planning scenario](/scenarios/controlling-relationship-phone-safety) has resources and steps for that situation.
`,
  },
  {
    slug: "show-one-photo-without-scrolling",
    group: "Everyday boundaries",
    title: "How to show someone one photo without them swiping through the rest",
    description: "You hand over your phone to show one picture, and they swipe. Here's how to prevent that.",
    category: "Scenario",
    updated: "2026-08-14",
    readMinutes: 3,
    body: `
It happens constantly: "Look at this," and their thumb is already swiping left.

## Use Guided Access

1. **Settings → Accessibility → Guided Access**, turn it on and set a passcode.
2. Open the photo, then triple-click the side button.
3. Circle the area where swipes would happen to disable touch there, or turn off Touch entirely.
4. Tap **Start**. Triple-click again and enter the code to exit.

## Share instead of hand over

AirDrop or message the single photo. Their phone, their screen, no swiping. If AirDrop won't find them, see [AirDrop: Contacts Only vs Everyone for 10 Minutes](/blog/airdrop-contacts-only-vs-everyone).

## Keep the camera roll boring

If the photos you're worried about live in a [vault](/features/pattern-key) instead of your camera roll, there's nothing interesting to swipe to.
`,
  },
  {
    slug: "kid-found-photos-on-my-phone",
    group: "Everyday boundaries",
    title: "My kid uses my phone. How do I keep adult content and documents out of reach?",
    description: "Kids borrow phones for games and videos, and they swipe everywhere. Here's how to set up a phone that's safe to hand over.",
    category: "Scenario",
    updated: "2026-07-30",
    readMinutes: 4,
    body: `
Children are very good at finding things. A phone that's handed over for a game will be explored.

## Quick protections

- **Guided Access** locks the phone into one app (see [how to show one photo](/scenarios/show-one-photo-without-scrolling)).
- **Screen Time → Content & Privacy Restrictions** can block explicit content and app installs.
- **Turn off Featured Photos and Memories widgets** so private images don't appear on the home screen.

## Move sensitive items out of Photos

IDs, medical photos, and anything private belongs in an encrypted vault with its own pattern, not in the camera roll and not in the Hidden album your passcode opens.

## Consider a kids' profile device

An old iPhone or iPad with no personal accounts signed in is the simplest solution of all.
`,
  },
  {
    slug: "crossing-a-border-with-my-phone",
    group: "Travel and devices",
    title: "Can border officers search my phone photos?",
    description: "In many countries officers can inspect devices at the border. Here's how to prepare, and what not to do.",
    category: "Scenario",
    updated: "2026-09-02",
    readMinutes: 5,
    body: `
Rules differ widely between countries and change over time. In many places, border officers can ask to inspect your phone, and refusing can mean delays, a seized device, or being denied entry if you're not a citizen.

> This isn't legal advice. If you have specific concerns, speak to a lawyer who knows the destination country's rules before you travel.

## Before you travel

- **Bring less.** The safest data is data that isn't on the device. Consider a travel phone or a freshly restored one.
- **Back up and remove.** Move sensitive files to a backup you can restore after arrival, then delete them from the phone. PrivateRoll vaults aren't part of iPhone backups, so copy out anything you need first.
- **Turn off Face ID** before the checkpoint, or press the side and volume buttons together to temporarily require your passcode.
- **Update iOS** before you go.

## About decoy vaults

[A vault for each pattern](/features/decoy-vaults) lets you open the app without revealing everything in it. But lying to border officials or hiding data during an inspection can be a crime in some countries. Know the rules where you're going, and don't put yourself at legal risk because of an app feature.

## After you arrive

Restore what you need from your encrypted backup, and change any passcodes you gave out.
`,
  },
  {
    slug: "selling-or-trading-in-my-iphone",
    group: "Travel and devices",
    title: "I'm selling my iPhone. How do I make sure my private photos are really gone?",
    description: "A proper erase is fast and reliable, but a few steps around it are easy to miss.",
    category: "Scenario",
    updated: "2026-10-29",
    readMinutes: 3,
    body: `
Modern iPhones encrypt storage, so **Erase All Content and Settings** destroys the key and makes old data unrecoverable within seconds. The risks are mostly in what's left *around* the phone.

## Checklist

1. Back up the phone. PrivateRoll vaults aren't included in backups and can't move to another phone, so first share out anything in them you want to keep.
2. Sign out of iCloud: **Settings → [your name] → Sign Out**. This also turns off Find My.
3. **Settings → General → Transfer or Reset iPhone → Erase All Content and Settings.**
4. Remove the SIM or delete the eSIM.
5. On another device, remove the old iPhone from your Apple account's device list.

## Don't forget

Shared albums you created, photos you've sent in messages, and other devices still synced to iCloud Photos aren't affected by erasing one phone. To remove single photos for good, see [how to permanently delete photos from iPhone and iCloud](/blog/how-to-permanently-delete-photos-iphone). If Stolen Device Protection is on, turn it off first; [here's how it works](/blog/stolen-device-protection-iphone-explained).
`,
  },
  {
    slug: "photos-synced-to-family-ipad",
    group: "Travel and devices",
    title: "My private photos showed up on the family iPad",
    description: "iCloud Photos syncs everything, including hidden photos, to every device on your account. Here's how to untangle it.",
    category: "Scenario",
    updated: "2026-09-25",
    readMinutes: 4,
    body: `
It's a common shock: you hide a photo on your phone, and it appears on the iPad everyone in the house uses.

## Why it happened

The iPad is signed in to your Apple account with iCloud Photos turned on. Hidden photos sync too ([details](/guides/where-do-hidden-photos-go-icloud)).

## Fix it today

1. On the iPad: **Settings → Photos → Use Face ID** (or Passcode) so the Hidden album is locked.
2. Better: sign the shared iPad into a separate Apple account, or turn off iCloud Photos on it.
3. Set up **Family Sharing** so family members have their own accounts and can still share purchases.

## Long term

Keep truly private photos in an encrypted vault on your own phone and nowhere else. PrivateRoll vaults never sync, so they stay on the device where you made them.
`,
  },
  {
    slug: "controlling-relationship-phone-safety",
    group: "Safety and evidence",
    title: "I'm in a controlling relationship and my phone gets checked",
    description: "If someone monitors your phone, privacy tools can help, but your safety comes first. Here's a careful approach.",
    category: "Scenario",
    updated: "2026-10-05",
    readMinutes: 6,
    body: `
If someone regularly checks your phone, demands passcodes, or reacts with anger to what they find, that's a recognised form of abuse. You deserve support.

> If you're in immediate danger, contact local emergency services. In the US you can reach the National Domestic Violence Hotline at 1-800-799-7233 or text START to 88788. Elsewhere, search for your country's domestic abuse helpline from a device the other person can't access.

## Be careful about sudden changes

A new app, a changed passcode, or deleted history can raise suspicion and make things more dangerous. Advocates often recommend **keeping the phone looking normal** while you plan.

## Check for monitoring

- **Settings → Privacy & Security → Safety Check** shows who you share location and data with, and can reset access quickly. Our [Safety Check explainer](/blog/safety-check-iphone-explained) covers what it changes and who might notice.
- Review **Find My → People** and **Settings → [your name] → Devices** for unknown devices.
- Check **VPN & Device Management** for profiles you didn't install.

## Where a vault can help

A vault app with [a vault for each pattern](/features/decoy-vaults) can hold evidence, documents, and contacts without looking unusual. If the app is opened, a decoy vault appears normal. Keeping the app in the App Library, off the Home Screen, means fewer questions about it.

## Keep a copy elsewhere

Evidence on a phone that can be taken or broken isn't safe evidence. An advocate can help you store copies somewhere you control.
`,
  },
  {
    slug: "keeping-evidence-of-harassment",
    group: "Safety and evidence",
    title: "How to keep screenshots and evidence of harassment safely",
    description: "Evidence is only useful if it survives and stays credible. Here's how to collect and store it.",
    category: "Scenario",
    updated: "2026-09-08",
    readMinutes: 5,
    body: `
Whether it's online harassment, a landlord dispute, or threats from an ex, good records can make all the difference later.

## Capture well

- **Screenshot the whole screen**, including the sender's name or handle and the timestamp.
- **Save links** and profile URLs as well as screenshots, since accounts can be renamed.
- **Keep originals.** Don't crop or edit; make edited copies separately if needed.

## Store safely

- Keep evidence in [a vault of its own](/features/decoy-vaults) so it's separate from everyday photos and not visible in Photos.
- Keep a second copy somewhere you control, such as a computer or a trusted person's device. A vault on one phone disappears with that phone.
- Add an encrypted note to each item: what happened, when, and who was involved.

## Keep a log

A simple timeline (date, what happened, which file shows it) is often more useful to police, lawyers, and platforms than a folder of images.

## Get support

Many countries have dedicated harassment and cyber-abuse helplines, and platforms have reporting tools. A lawyer or advocate can tell you how evidence should be presented where you live.
`,
  },
];

export const scenarioGroups = ["Everyday boundaries", "Travel and devices", "Safety and evidence"] as const;

export const getScenario = (slug: string) => scenarios.find((s) => s.slug === slug);
