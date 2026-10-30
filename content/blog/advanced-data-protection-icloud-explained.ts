import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "advanced-data-protection-icloud-explained",
  title: "Advanced Data Protection for iCloud: Turn It On?",
  description:
    "What Advanced Data Protection changes in iCloud, what it still leaves unencrypted, the recovery risk, and who should turn it on or leave it off.",
  category: "Security",
  published: "2026-10-30",
  author: "surya-narayanan",
  related: ["/guides/what-is-zero-knowledge-encryption", "/guides/where-do-hidden-photos-go-icloud", "/scenarios/selling-or-trading-in-my-iphone"],
  body: `
Advanced Data Protection (ADP) is an optional iCloud setting that moves most of your iCloud data to end-to-end encryption, so Apple no longer holds the keys. Turn it on if you want your photos, backups and notes out of reach of anyone who gets into Apple's servers, and you're ready to be responsible for your own recovery. Leave it off if you'd rather Apple be able to help you back in.

Here is exactly what it changes, what it doesn't, and how to decide.

## What Advanced Data Protection does

Apple describes it as [an optional setting that offers its highest level of cloud data security](https://support.apple.com/en-us/108756). By default, iCloud uses what Apple calls Standard Data Protection. Under that setting, Apple's [iCloud data security overview](https://support.apple.com/en-us/102651) says 15 data categories, including Health and passwords in iCloud Keychain, are end-to-end encrypted. Turn on ADP and the number rises to 25.

The practical difference is who holds the keys. Under Standard Data Protection, Apple holds the encryption keys for many categories, so it can decrypt your data on your behalf, for example when you sign in on a new device or restore a backup. Under ADP, your trusted devices hold the keys for most of your data, and Apple has no way to read it.

## What moves to end-to-end encryption

Apple's overview lists the categories that change. With ADP on, these are end-to-end encrypted, and with it off they are not:

- iCloud Backup
- Photos
- Notes
- iCloud Drive
- Reminders
- Safari bookmarks
- Shortcuts
- Voice Memos
- Wallet passes
- Freeform

Messages in iCloud is a special case. Under Standard Data Protection it is end-to-end encrypted only while iCloud Backup is turned off, because a backup includes a copy of the Messages key. With ADP, it is always end-to-end encrypted.

Some things are already end-to-end encrypted either way, including passwords and Keychain, Health, Journal, Home, payment information and Screen Time, so ADP changes nothing for them.

## What ADP still doesn't encrypt end to end

ADP is not a total lock, and Apple is clear about the gaps.

- **iCloud Mail.** Apple says it does not use end-to-end encryption because of the need to interoperate with the global email system.
- **Contacts and Calendars.** Apple says they're built on industry standards (CalDAV and CardDAV) that don't provide built-in support for end-to-end encryption.
- **Shared content.** On Apple's [ADP page](https://support.apple.com/en-us/108756), iWork collaboration, the Shared Albums feature in Photos and sharing with anyone who has the link don't support ADP.

If your worry is a particular email thread or a shared album, ADP is not the answer to it.

## The catch: recovery is on you

This is the part to read before you tap anything. Apple says that if you lose access to your account, it will not have the encryption keys to help you recover ADP-protected data. Recovery then depends on your device passcode or password, a recovery contact, or a recovery key.

Before you can turn ADP on, you're prompted to set up at least one alternative recovery method:

1. **A recovery contact:** someone you trust who can help you regain access.
2. **A recovery key:** a 28-character code you keep yourself. Apple says it's used together with a trusted phone number and an Apple device.

If you pick a recovery key, treat it like the key to a safe. Print it, store it somewhere you won't lose it, and don't keep the only copy in the iCloud account it protects. It's the same trade-off we describe in our plain-English guide to [zero-knowledge encryption](/guides/what-is-zero-knowledge-encryption): nobody can help you back in, including the company.

## What you need before you turn it on

Per Apple's [requirements](https://support.apple.com/en-us/108756):

- An Apple Account with two-factor authentication, and a passcode or password set on your device.
- Software at least iOS 16.2, iPadOS 16.2 or macOS 13.1 on every device signed in to your account.
- At least one recovery method, as above.

That device rule has a side effect. While ADP is on, you can only sign in to your Apple Account on devices that meet the requirements, so an old iPad you never updated can get in the way. Apple suggests removing a device that blocks activation from your device list and trying again. Managed Apple Accounts and child accounts aren't eligible.

To turn it on, open **Settings → [your name] → iCloud → Advanced Data Protection → Turn On**. Turning it on for one device turns it on for the whole account.

## Can you turn it off again?

Yes, at any time. Apple says your device uploads the keys that are needed to Apple, and your account goes back to Standard Data Protection. So the choice isn't permanent, which is a good reason to try it if you're unsure.

## It might not be available where you live

In the United Kingdom, Apple says in its [support notice](https://support.apple.com/122234) that it can no longer offer ADP to new users: people there who haven't already enabled it no longer have the option. Apple adds that it can't disable the setting automatically for existing UK users, who will be given a period of time to turn it off themselves to keep using iCloud. If you're in the UK, check Apple's page for the latest.

## Should you turn it on?

It's a good fit if:

- you keep sensitive photos, documents or notes in iCloud, and you don't want Apple or a data breach at Apple to be able to expose them
- you're comfortable keeping a recovery key or naming a recovery contact
- every device on your account runs current software

Leave it off, or think twice, if:

- you often lose passcodes and would rather Apple could help you recover your account
- you rely on an old device that can't update
- what you need protected is mostly email, contacts or shared albums, which ADP doesn't cover

ADP protects your data in the cloud. It does nothing about the person holding your unlocked phone: your photos, Notes and anything else on screen are visible once the phone is open. For that, the lock on your device matters more, as our guide to [where hidden photos go in iCloud](/guides/where-do-hidden-photos-go-icloud) explains.

## Where PrivateRoll fits

We make PrivateRoll, and it takes a different approach: instead of encrypting a cloud copy, it keeps nothing in the cloud. Per our [security architecture](/features/security-architecture), vaults are excluded from iCloud and computer backups, and PrivateRoll has no servers, so those files exist on one device only. That also means they can't be restored if the device is lost, reset or replaced. ADP covers what you choose to sync, while a vault covers the photos you decide should never leave your phone. Many people sensibly use both.
`,
  faq: [
    {
      q: "Is Advanced Data Protection worth turning on?",
      a: "It is if you keep sensitive photos, backups or notes in iCloud and you're comfortable managing your own recovery with a recovery contact or recovery key. If you'd rather Apple could help you regain access, Standard Data Protection suits you better.",
    },
    {
      q: "What happens if I lose access with Advanced Data Protection on?",
      a: "Apple doesn't hold the keys, so it can't recover your end-to-end encrypted data. Recovery depends on your device passcode or password, a recovery contact or your recovery key.",
    },
    {
      q: "Does Advanced Data Protection encrypt iCloud Mail, Contacts and Calendars?",
      a: "No. Apple says iCloud Mail needs to interoperate with the global email system, and Contacts and Calendars use standards without built-in end-to-end encryption.",
    },
    {
      q: "Can I turn Advanced Data Protection off?",
      a: "Yes, at any time. Your device uploads the keys that are needed to Apple and your account returns to Standard Data Protection.",
    },
  ],
};
