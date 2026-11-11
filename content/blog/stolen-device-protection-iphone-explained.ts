import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "stolen-device-protection-iphone-explained",
  title: "Stolen Device Protection on iPhone, Explained",
  description:
    "What Stolen Device Protection does on iPhone, the one-hour security delay, how to turn it on or off, and what to check if the setting is greyed out.",
  category: "Security",
  published: "2026-10-29",
  author: "aryan-kumar",
  related: ["/guides/pattern-vs-pin-vs-face-id", "/scenarios/partner-knows-my-passcode", "/scenarios/selling-or-trading-in-my-iphone"],
  body: `
Stolen Device Protection is an iPhone setting that makes someone who has your passcode do more than type it. Away from familiar places like home or work, it asks for Face ID or Touch ID with no passcode fallback for sensitive actions, and it makes the most serious account changes wait an hour.

It needs iOS 17.3 or later and has to be on before your phone goes missing. Here is exactly what it covers, how to switch it on or off, and what to check if it won't turn on.

## What Stolen Device Protection does

Apple's page [About Stolen Device Protection for iPhone](https://support.apple.com/120340) describes two measures, and both apply when your iPhone is away from a familiar location such as home or work.

1. **Face ID or Touch ID, with no passcode fallback.** Some actions need your face or fingerprint, and the passcode alone won't do.
2. **A security delay.** Some changes make you authenticate, wait, and then authenticate again.

Neither measure applies in the same way at home. Apple says you can change that: you can set the protection to apply these measures even at familiar locations.

## Actions that need Face ID or Touch ID

Apple's list of actions that need biometrics, with no passcode fallback, away from familiar locations is:

- Using passwords or passkeys saved in Keychain
- Using payment methods saved in Safari AutoFill
- Turning off Lost Mode
- Opening a locked app
- Erasing all content and settings
- Applying for a new Apple Card
- Viewing your Apple Card or Apple Cash virtual card number
- Certain Apple Cash and Savings actions in Wallet
- Using your iPhone to set up a new device, for example with Quick Start
- Setting up or transferring an eSIM

Apple notes you can still use your passcode for Apple Pay purchases.

If you keep sensitive things behind an app lock, "opening a locked app" is the line to notice. It means that away from home, a passcode on its own no longer opens a locked app.

## The one-hour security delay

Some changes could lock you out of your account, or let someone else take it over. For those, Apple says you may be required to wait an hour. The steps are: authenticate with Face ID or Touch ID, wait out the delay, then authenticate again.

According to Apple, the delay can end early if your iPhone detects that it is in a familiar location. The changes that trigger it are:

- Changing your Apple Account password
- Signing out of your Apple Account
- Updating Apple Account security settings, such as trusted devices, a Recovery Key or a Recovery Contact
- Adding or removing Face ID or Touch ID
- Changing your passcode
- Using Reset All Settings
- Enrolling in Mobile Device Management
- Turning off Stolen Device Protection itself

That last item matters. If someone gets hold of your phone and your passcode, they can't quickly switch the protection off from somewhere unfamiliar, because turning it off starts the same delay.

## What you need for it to work

Apple's page lists these requirements:

- iOS 17.3 or later
- Two-factor authentication on your Apple Account
- A device passcode
- Face ID or Touch ID set up
- Significant Locations switched on, under Settings, Privacy & Security, Location Services, System Services
- Find My on

Apple says Find My can't be turned off while Stolen Device Protection is enabled. It also says the setting might be turned on by default, so it is worth checking rather than assuming it is off.

## How to turn it on or off

1. Open **Settings** and tap **Face ID & Passcode**, or **Touch ID & Passcode** on an iPhone with Touch ID.
2. Enter your passcode.
3. Tap **Stolen Device Protection** and turn it on or off.

To make the extra measures apply everywhere, including home, open the same screen and choose **Always** under **Require Security Delay**.

If you turn the protection off while away from a familiar location, the one-hour delay starts first. Apple recommends turning it off before you sell, give away or trade in your iPhone. Our guide for [selling or trading in your iPhone](/scenarios/selling-or-trading-in-my-iphone) covers the rest of that checklist.

## If the setting is greyed out or won't turn on

Apple's page doesn't give a reason for a greyed-out toggle, so the honest answer is to work through its requirements:

1. Check you are on iOS 17.3 or later in **Settings**, **General**, **Software Update**.
2. Check two-factor authentication is on for your Apple Account.
3. Check a passcode and Face ID or Touch ID are set up.
4. Check Significant Locations is on under System Services in Location Services.
5. Check Find My is on.

If it still won't switch on, contact Apple Support, since the page names no other cause.

## What it doesn't do

Stolen Device Protection is a layer on top of your passcode, and it has limits worth knowing:

- **It must be on beforehand.** Apple's page says it needs to be turned on before your device is lost or stolen.
- **It doesn't lock the Photos app.** It protects the account and a list of sensitive actions. Photos you can see on an unlocked phone are still visible to whoever holds it.
- **It depends on familiar locations.** At home, with the default setting, you have the same behaviour as before. If the person you worry about lives with you, choose **Always**.
- **It doesn't replace a strong passcode.** Our look at [pattern, PIN and Face ID](/guides/pattern-vs-pin-vs-face-id) explains how much each one protects.

If the person you are worried about already knows your passcode, read our scenario on a [partner who knows your passcode](/scenarios/partner-knows-my-passcode) as well. Stolen Device Protection was built around a thief, and a person you live with is a different problem.

## Where PrivateRoll fits

We make PrivateRoll, so weigh this accordingly. Stolen Device Protection stops someone changing your account in a hurry. It doesn't protect what's inside your photo library. PrivateRoll keeps photos and videos in a vault that opens with a [pattern you draw](/features/pattern-key) instead of your phone's passcode, and encrypts what's inside it on your iPhone. The app isn't on the App Store yet, and it is no replacement for turning this setting on.
`,
  faq: [
    {
      q: "What is Stolen Device Protection on iPhone?",
      a: "It is a setting that, away from familiar places like home or work, requires Face ID or Touch ID for sensitive actions and adds a one-hour wait to changes such as your Apple Account password.",
    },
    {
      q: "How do I turn Stolen Device Protection on or off?",
      a: "Open Settings, tap Face ID & Passcode, enter your passcode, then tap Stolen Device Protection. Turning it off away from a familiar location starts a one-hour security delay first.",
    },
    {
      q: "Why is Stolen Device Protection greyed out?",
      a: "Apple's page doesn't say, but it lists what you need: iOS 17.3 or later, two-factor authentication, a passcode, Face ID or Touch ID, Significant Locations and Find My all switched on.",
    },
    {
      q: "Does Stolen Device Protection work at home?",
      a: "Not by default, since the extra measures apply away from familiar locations. Choose Always under Require Security Delay to apply them everywhere.",
    },
  ],
};
