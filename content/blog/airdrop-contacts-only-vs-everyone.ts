import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "airdrop-contacts-only-vs-everyone",
  title: "AirDrop: Contacts Only vs Everyone for 10 Minutes",
  description:
    "What AirDrop's Contacts Only and Everyone for 10 Minutes settings mean, who can send you things in each, and why Contacts Only sometimes finds no one.",
  category: "Explainer",
  published: "2026-11-02",
  author: "surya-narayanan",
  related: ["/scenarios/show-one-photo-without-scrolling", "/guides/remove-location-from-photos", "/blog/safety-check-iphone-explained"],
  body: `
**Contacts Only** lets people in your contacts send you things over AirDrop. **Everyone for 10 Minutes** lets anyone nearby send you a request for ten minutes, then your iPhone switches itself back. Either way, you accept or decline each transfer as it arrives.

The setting decides who can reach you. It doesn't decide what you send, and it doesn't protect photos once they're on someone else's phone. Here is what each option does, why Contacts Only sometimes fails, and which to leave on.

## What each setting means

On iPhone, open Control Center, touch and hold the top-left group of controls, tap the AirDrop icon, and choose **Contacts Only** or **Everyone for 10 Minutes**. Apple's page on [using AirDrop](https://support.apple.com/en-us/102538) describes the choice as picking who you want to receive items from.

- **Contacts Only:** only people in your contacts can see your device as a place to send things.
- **Everyone for 10 Minutes:** anyone nearby can send you a request, for ten minutes.
- **Receiving Off:** nothing reaches you. Apple names this setting in its notes on the 10-minute change.

## Why the 10 minutes matters

Apple's guide to [AirDrop on iPhone and iPad](https://support.apple.com/en-us/119857) says that in iOS 16.2 and later, Everyone for 10 Minutes changes after 10 minutes. If you're signed in to your Apple Account, it goes back to Contacts Only. If you aren't, it goes back to Receiving Off.

So you can't leave the open setting on by mistake for long. It's a window you open when a stranger or a new friend needs to send you something, and it closes without you doing anything.

## Why Contacts Only finds no one

This is the most common reason the setting seems broken. Apple says that to receive from someone in Contacts Only mode, you must be in their contacts list, and they need to have your Apple Account email address or phone number in your contact card.

That means two things must be true:

1. The sender has a contact card for you.
2. That card includes the email address or phone number your Apple Account uses.

If you saved someone under a different number than the one their Apple Account uses, AirDrop can't match them, and they won't see you. Adding the right number or email to their card is the fix. Asking them to switch to Everyone for 10 Minutes also works.

## Sending to someone who isn't a contact

Apple's page says that if the other person isn't in your contacts, they can set AirDrop to Everyone for 10 Minutes. On iOS 26.2, iPadOS 26.2 and macOS 26.2 or later, Apple also describes an **AirDrop code**: the receiver sees a code on their device and the sender enters it on theirs. After that, Apple says you can keep sharing with that person for 30 days without needing another code. To end it sooner, find them in the Other Known list in Contacts and choose Forget This Person.

## Which setting to leave on

For most people, Contacts Only is the right everyday choice: strangers can't send you requests, and you open the wider window only when you have a reason. It's the setting to prefer in crowds, on trains and at events, where lots of people are within range.

Open it for ten minutes when you're swapping a photo with someone new, then let it close. If the person is a friend, add their number or email to their contact card instead and stay on Contacts Only.

## What AirDrop doesn't protect

AirDrop is a way to hand something over, not a way to keep it private afterwards.

- Once a photo lands on another phone, it's theirs to keep, forward or back up. Nothing you set on your side takes it back.
- A photo can carry details such as where it was taken. Our guide to [removing location from photos](/guides/remove-location-from-photos) covers checking that before you send.
- If you only want to show a photo, you may not need to send it. Our scenario on [showing one photo without scrolling](/scenarios/show-one-photo-without-scrolling) covers handing someone your screen instead.

If your worry is someone controlling what's on your phone, not stray AirDrop requests, see our explainer on [Safety Check on iPhone](/blog/safety-check-iphone-explained).

## Where PrivateRoll fits

We make PrivateRoll, a vault for photos and videos on iPhone. It doesn't change how AirDrop works, and it can't tell you who is nearby. What it adds is a place for private photos that is separate from your main library, encrypted on your iPhone and opened with a pattern of its own. You can read how that works on our [pattern key](/features/pattern-key) page.
`,
  faq: [
    {
      q: "What does AirDrop Contacts Only mean?",
      a: "It means only people in your contacts can send you items over AirDrop. For a match, you must be in their contacts, and their card for you needs your Apple Account email address or phone number.",
    },
    {
      q: "What does Everyone for 10 Minutes do?",
      a: "It lets anyone nearby send you an AirDrop request for ten minutes. Apple says it then reverts to Contacts Only if you're signed in to your Apple Account, or to Receiving Off if you aren't.",
    },
    {
      q: "Why can't I see someone in AirDrop with Contacts Only on?",
      a: "Usually the contact card is missing the email or phone number tied to your Apple Account. Add it, or ask them to choose Everyone for 10 Minutes.",
    },
    {
      q: "Can someone AirDrop me without my permission?",
      a: "With Contacts Only, only people in your contacts can send you requests. With Everyone for 10 Minutes, anyone nearby can send one, but you accept or decline each transfer as it arrives.",
    },
  ],
};
