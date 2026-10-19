export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string; // ISO date
  readMinutes: number;
  body: string;
  related?: string[]; // slugs within the same collection
};

export const guides: Article[] = [
  {
    slug: "how-to-hide-photos-on-iphone",
    title: "How to Hide Photos on iPhone: Every Method, Ranked",
    description: "From the built-in Hidden album to a fully encrypted vault, here's every way to hide photos on iPhone and what each one really protects against.",
    category: "How-to",
    updated: "2026-10-01",
    readMinutes: 8,
    related: ["hidden-album-vs-photo-vault", "is-a-locked-note-safe-enough", "remove-location-from-photos"],
    body: `
"Hidden" means different things depending on who you're hiding from. A photo that's out of sight in the grid is not the same as a photo nobody else can open. Below are the main options, from weakest to strongest, with an honest note on what each one stops.

## 1. Archive it in a shared album you don't share

Some people move photos into an album with a boring name. It takes seconds, and it stops nobody who scrolls through Albums. It's fine for decluttering, but it isn't privacy.

## 2. Use the Hidden album

Select the photos, tap the **⋯** menu, and choose **Hide**. They disappear from Library, Memories, and widgets and move to **Albums → Utilities → Hidden**, which is locked with Face ID or your passcode.

**Stops:** someone glancing at your camera roll or a photo popping up in a widget.
**Doesn't stop:** anyone who knows your passcode. The photos also still sync to every device on your iCloud account.

## 3. Put them in a locked note

In Notes, create a note, add the images, then tap **⋯ → Lock**. You can choose a separate Notes password instead of your device passcode. Locked notes are end-to-end encrypted.

**Stops:** people who know your phone passcode (if you set a separate password).
**Doesn't stop:** much, really. It's good protection, but it gets slow and awkward beyond a handful of images. See [Is a locked note safe enough?](/guides/is-a-locked-note-safe-enough).

## 4. Use an encrypted vault app

A proper vault encrypts each file with a key derived from a secret that's separate from your phone's passcode. Look for one that:

- explains its encryption in writing, not just "military-grade,"
- doesn't need an account or email,
- can't reset your password for you, because a vault that can reset it can also open it.

**Stops:** people who know your passcode, people who get your phone unlocked, and people who copy your backups.
**Doesn't stop:** someone watching you unlock it, or spyware running while the vault is open.

## Which should you use?

| You're hiding from | Good enough |
| --- | --- |
| Someone glancing at your screen | Hidden album |
| Your photos showing up in Memories | Hidden album |
| A family member who knows your passcode | Encrypted vault |
| Someone who might pressure you to unlock | Vault with [deniable vaults](/features/deniable-vaults) |

## Don't forget the leftovers

Whichever method you use, check **Recently Deleted**, your iCloud Photos on other devices, and messaging apps where the photo was sent or received. A photo moved into a vault is only private if no other copy is left behind.
`,
  },
  {
    slug: "hidden-album-vs-photo-vault",
    title: "Hidden Album vs. a Photo Vault App: What's the Real Difference?",
    description: "Apple's Hidden album and a dedicated vault both keep photos out of sight. Only one keeps them away from people who know your passcode.",
    category: "Explainer",
    updated: "2026-09-18",
    readMinutes: 6,
    related: ["how-to-hide-photos-on-iphone", "what-is-zero-knowledge-encryption"],
    body: `
Both options take photos out of your main library. The difference is what happens when someone has your phone in their hands, unlocked.

## What the Hidden album does well

- It's free and already on your phone.
- It keeps photos out of Memories, Featured Photos, and widgets.
- Since iOS 16 it requires Face ID or your passcode to open.

For keeping a surprise gift idea away from a curious kid, that's often enough.

## Where it falls short

**It uses your phone passcode.** Partners, family members, and coworkers often know it, or have watched you type it. Anyone who does can open the Hidden album in two taps.

**It's still part of Photos.** Hidden items sync through iCloud Photos to every device on your account, including a shared iPad or family Mac, where they're protected only by that device's lock.

**It's easy to find.** Everyone knows where the Hidden album lives, so having one is not a secret.

## What a vault adds

A vault like Veilbox uses a separate secret (in our case, a [pattern](/features/pattern-key)) and encrypts files with a key derived from it. Knowing your phone passcode doesn't help. Copying your phone's backup doesn't help. And with [deniable vaults](/features/deniable-vaults), even being forced to open the app doesn't reveal everything.

## A quick test

Ask yourself: *if someone I live with picked up my unlocked phone, could they see these photos?* If the answer must be no, use a vault.
`,
  },
  {
    slug: "what-is-zero-knowledge-encryption",
    title: "What Is Zero-Knowledge Encryption? A Plain-English Guide",
    description: "Zero-knowledge means the company storing your data can't read it. Here's how that works, why it matters, and what it costs you.",
    category: "Explainer",
    updated: "2026-08-30",
    readMinutes: 7,
    related: ["pattern-vs-pin-vs-face-id", "hidden-album-vs-photo-vault"],
    body: `
"Zero-knowledge" is a promise about who can read your data: only you. The service storing it has zero knowledge of what's inside, not because it promises not to look, but because it has no way to.

## The locksmith analogy

Imagine a storage company that rents you a safe. In the usual setup, the company keeps a master key in case you lose yours. That's handy, but it means an employee, a hacker who breaks in, or anyone with a court order can open your safe.

In a zero-knowledge setup, you buy the lock yourself and never hand over a copy of the key. The company stores the safe and moves it around, but it can't open it.

## How it works in practice

1. Your secret (a password, passphrase, or pattern) is turned into an encryption key **on your device**.
2. Files are encrypted on your device before they go anywhere.
3. Only encrypted data is uploaded or stored.
4. The key is never sent to the service in any form.

## The trade-off: no "Forgot password?"

If the company can't open your safe, it can't help you open it either. Lose your secret and your backup method, and the data is gone for good. That's why zero-knowledge apps usually give you a [recovery phrase](/features/recovery-phrase) at setup. Write it down.

## How to tell if an app is really zero-knowledge

- **Can support reset your password?** If yes, it isn't zero-knowledge.
- **Does it need an email to work?** Not proof either way, but worth asking why.
- **Does it explain its key derivation?** Look for named algorithms like Argon2, scrypt, or PBKDF2, and file encryption like AES-GCM or ChaCha20-Poly1305.
- **Are thumbnails and file names encrypted too?** Metadata can say a lot.

## What it doesn't protect

Zero-knowledge stops the service and anyone who breaches it. It doesn't stop someone looking over your shoulder, malware on your unlocked phone, or copies you've exported elsewhere. It's one strong layer, not the whole picture.
`,
  },
  {
    slug: "pattern-vs-pin-vs-face-id",
    title: "Pattern vs. PIN vs. Face ID: Which Unlock Is Safest?",
    description: "Each unlock method fails in a different way. Here's how patterns, PINs, passwords and biometrics compare, and how to make each one stronger.",
    category: "Security",
    updated: "2026-09-05",
    readMinutes: 6,
    related: ["what-is-zero-knowledge-encryption"],
    body: `
There's no single "safest" unlock method. Each one is strong against some threats and weak against others. What matters is matching the method to the person you're worried about.

## The main threats

- **Guessing:** someone tries likely combinations.
- **Shoulder-surfing:** someone watches you unlock.
- **Smudges:** the screen shows where your finger has been.
- **Coercion:** someone makes you unlock it.

## How each method holds up

| Method | Guessing | Shoulder-surfing | Smudges | Coercion |
| --- | --- | --- | --- | --- |
| 4-digit PIN | Weak | Weak | Medium | Weak |
| 6+ digit PIN | Medium | Weak | Medium | Weak |
| Long password | Strong | Medium | Strong | Weak |
| Pattern (6+ dots, irregular) | Medium–Strong | Weak | Weak | Weak |
| Face ID / Touch ID | Strong | Strong | Strong | Very weak |

## The biometric catch

Face ID is excellent against strangers and terrible against anyone who can point your phone at your face. In many places you can also be legally required to unlock with a biometric when you couldn't be forced to reveal a code. Biometrics are a convenience layer, not a vault key.

## Making a pattern strong

- Use **six or more dots**.
- **Don't start in a corner.** Most people do, and attackers try those first.
- Change direction at least twice. Avoid letters and simple shapes.
- **Wipe your screen** now and then, since smudge trails are real.
- Draw with your hand angled to cover the screen when others are near.

## Why Veilbox uses a pattern anyway

A pattern is fast and easy to remember, and in Veilbox it's not compared against anything. It's turned straight into an encryption key ([how that works](/features/pattern-key)). Combined with [deniable vaults](/features/deniable-vaults), even coercion has limits: you can open a vault without revealing that others exist.
`,
  },
  {
    slug: "is-a-locked-note-safe-enough",
    title: "Is a Locked Note Safe Enough for Private Photos?",
    description: "Apple Notes can lock notes with end-to-end encryption. It's a solid tool, with some limits you should know about before trusting it with photos.",
    category: "Explainer",
    updated: "2026-07-22",
    readMinutes: 5,
    related: ["how-to-hide-photos-on-iphone", "hidden-album-vs-photo-vault"],
    body: `
Locked notes are one of the most underrated privacy features on the iPhone. They're also easy to set up in a way that quietly weakens them.

## What's good about locked notes

- Locked notes are end-to-end encrypted when stored in iCloud.
- You can attach photos, scans, and PDFs.
- They're free and already installed.

## The setting that matters most

When you first lock a note, iOS asks whether to use your **device passcode** or a **separate password**. Many people pick the passcode because it's easier. Unfortunately that puts locked notes in the same position as the Hidden album: anyone who knows your passcode can open them.

To change it: **Settings → Apps → Notes → Password**, then choose a custom password.

## Where it gets awkward

- **No gallery.** Photos sit inside the note in a long scroll.
- **Videos make notes heavy** and slow to open.
- **Previews:** the note title is visible in the list even when locked, so name it carefully.
- **Forgotten password:** you can reset it for *future* notes, but notes locked with the old password still need the old one.

## The verdict

For a few images alongside account numbers or codes, a locked note with its own password is perfectly reasonable. For a real photo library, or anything you'd need to deny exists, use a dedicated vault.
`,
  },
  {
    slug: "spot-a-weak-calculator-vault",
    title: "How to Spot a Weak Calculator Vault App",
    description: "Calculator vault apps promise disguise. Some deliver real encryption; others just move files to a hidden folder. Here are the warning signs.",
    category: "Security",
    updated: "2026-08-12",
    readMinutes: 5,
    related: ["what-is-zero-knowledge-encryption"],
    body: `
The disguise is the selling point: an app that looks like a calculator until you type the secret code. But a disguise only works until someone sees through it, and then everything depends on what's underneath.

## Red flags

- **"Hidden," not "encrypted."** If the listing never mentions encryption, assume files are just stored in a private folder.
- **Email or phone recovery.** If the developer can reset your code, the developer can get in.
- **Full-screen ads.** Ad networks run third-party code inside the app and often collect device identifiers.
- **Huge permission requests.** A vault doesn't need your contacts or your location.
- **A brand-new developer with copied screenshots.** Clones of popular vault apps appear and disappear regularly.

## Green flags

- A named encryption scheme (AES-256-GCM, ChaCha20-Poly1305) and a named key derivation function.
- A clear statement that the developer **can't** recover your files.
- No account required, no ads in the vault itself.
- A privacy label on the App Store that says "Data Not Collected," or close to it.

## A quick test you can run

Install the app, add a test photo, then delete and reinstall the app *without* restoring a backup. If your photo comes back without you entering any secret, it was stored somewhere with a way back in.

## A better disguise

If you like the idea, look for an app that offers a [disguised icon](/features/disguised-icons) on top of real encryption, rather than a fake calculator on top of nothing.
`,
  },
  {
    slug: "move-photos-between-vault-apps",
    title: "How to Move Photos Between Vault Apps Without Leaving Copies",
    description: "Switching vault apps means exporting your most private photos. Here's how to do it without leaving copies in Photos, Files or iCloud.",
    category: "How-to",
    updated: "2026-09-27",
    readMinutes: 6,
    related: ["remove-location-from-photos"],
    body: `
Moving between vault apps is the moment your private photos are most exposed: for a few minutes they exist outside of either vault. A bit of planning keeps that window small.

## Before you start

- **Pause iCloud Photos** (Settings → [your name] → iCloud → Photos) so exported files don't sync to other devices.
- Make sure you have space: you'll briefly need roughly twice the vault's size.
- Charge your phone and stay on Wi-Fi.

## Step by step

1. In your old vault, select a batch of items and export them to **Files → On My iPhone** in a new folder. Avoid exporting to Photos if you can.
2. Open Veilbox and use **Import → Files**, then pick that folder.
3. Wait for the import to finish. Spot-check a few photos and videos.
4. Delete the folder from Files, then open **Files → Browse → Recently Deleted** and delete it from there too.
5. Repeat in batches until done.

## If the old app can only export to Photos

Export a batch, import it into Veilbox with **Delete originals after import** turned on, then empty **Photos → Recently Deleted**. Keep iCloud Photos paused until you've finished and emptied it.

## Afterwards

- Delete the old vault app's data from inside the app if it offers that, then delete the app itself.
- If the old app had a cloud backup, log in and delete that too.
- Turn iCloud Photos back on.
`,
  },
  {
    slug: "remove-location-from-photos",
    title: "How to Remove Location Data from iPhone Photos",
    description: "Every photo can carry GPS coordinates that reveal where you live. Here's how to strip them before sharing, and stop them being saved at all.",
    category: "How-to",
    updated: "2026-10-10",
    readMinutes: 5,
    related: ["move-photos-between-vault-apps"],
    body: `
Your iPhone saves the exact location where each photo was taken. Share the original file and you may be sharing your home address with it.

## Check a photo's location

Open the photo in Photos and swipe up. If there's a map, the location is saved in the file. You can also drop the image into our free [photo metadata tool](/tools/photo-metadata), which runs entirely in your browser.

## Remove location from one photo

In Photos, swipe up on the image, tap **Adjust** next to the location, then **No Location**.

## Remove location when sharing

In the share sheet, tap **Options** at the top and switch off **Location**. This only affects that share. The original keeps its location.

## Stop saving location from now on

**Settings → Privacy & Security → Location Services → Camera → Never.**

You lose the "Places" map in Photos, but your photos no longer record where you were.

## Other hidden details

Location isn't the only metadata. Files can also include the device model, the exact time, and sometimes editing software details. Our [metadata tool](/tools/photo-metadata) shows everything and can export a clean copy.

> Veilbox's [Vault Camera](/features/vault-camera) doesn't save location by default, and exports from Veilbox strip it automatically.
`,
  },
  {
    slug: "protect-photos-before-iphone-repair",
    title: "How to Protect Your Photos Before an iPhone Repair",
    description: "Repair shops may ask for your passcode. Here's how to hand over your phone without handing over your private photos.",
    category: "How-to",
    updated: "2026-08-20",
    readMinutes: 5,
    related: ["hidden-album-vs-photo-vault"],
    body: `
A repair technician may need your passcode to test that the phone works. That passcode also opens your Photos, Messages, and the Hidden album.

## Best option: back up and erase

1. Make a fresh backup to iCloud or your computer.
2. Turn off **Find My** (Apple requires this for most repairs anyway).
3. **Settings → General → Transfer or Reset iPhone → Erase All Content and Settings.**
4. Hand over the phone with nothing on it. Restore when you get it back.

This is the only way to be sure, but it takes time.

## If you can't erase

- **Use Repair Mode** if your device supports it. It limits what the technician can access.
- **Move private photos into an encrypted vault** that uses its own secret, so your passcode doesn't open it.
- **Empty Recently Deleted** in Photos.
- **Sign out of messaging apps** that show photo history.
- **Temporarily change your passcode** to one you'll never reuse, then change it back afterwards.

## When you get it back

Change your passcode, check **Settings → Face ID & Passcode** for any added appearance, and review **Settings → General → VPN & Device Management** for any profiles you didn't install.
`,
  },
  {
    slug: "where-do-hidden-photos-go-icloud",
    title: "Where Do Hidden Photos Go in iCloud, and Who Can See Them?",
    description: "Hidden photos still sync. Here's which devices they appear on, how they're protected, and how to keep them off a shared iPad or Mac.",
    category: "Explainer",
    updated: "2026-09-12",
    readMinutes: 5,
    related: ["hidden-album-vs-photo-vault", "how-to-hide-photos-on-iphone"],
    body: `
Hiding a photo on your iPhone doesn't keep it on your iPhone. If iCloud Photos is on, the Hidden album syncs too.

## Devices that get your hidden photos

Every device signed in to your Apple account with iCloud Photos turned on: your iPad, your Mac, an old iPhone in a drawer, and the family computer if you're signed in there. On each, the Hidden album is protected by *that device's* lock.

## How it's encrypted in iCloud

With **Standard Data Protection**, iCloud Photos is encrypted, but Apple holds the keys. With **Advanced Data Protection** turned on, Photos becomes end-to-end encrypted and only your devices hold the keys. To turn it on, go to **Settings → [your name] → iCloud → Advanced Data Protection**.

## Keeping hidden photos off shared devices

- On the shared device, turn off iCloud Photos or sign out of your Apple account.
- Use **Settings → Photos → Use Face ID** on each device so the Hidden album stays locked.
- For photos that should exist on only one device, store them in an encrypted vault and leave [backup](/features/encrypted-backup) off.

## Check your device list

**Settings → [your name]**, then scroll down. Every device listed can potentially show your hidden photos. Remove any you no longer use.
`,
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
