import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "recently-deleted-photos-iphone-explained",
  title: "Recently Deleted Photos on iPhone: What Happens, and When",
  description:
    "Where deleted photos go on iPhone, how long Recently Deleted keeps them, and the cases where a photo is gone sooner or can't be recovered.",
  category: "Explainer",
  published: "2026-10-27",
  author: "surya-narayanan",
  related: ["/blog/how-to-permanently-delete-photos-iphone", "/guides/where-do-hidden-photos-go-icloud", "/guides/how-to-hide-photos-on-iphone"],
  body: `
When you delete a photo on iPhone, it isn't deleted yet. It moves to the **Recently Deleted** album, where Apple says it stays for 30 days. After that it's permanently deleted, and you can't get it back.

That one rule explains most of the confusing cases: the photo you thought was gone but can still see, the one that vanished earlier than you expected, and the one you can't recover. Here's what Recently Deleted does, and when.

## What Recently Deleted actually is

Recently Deleted is a holding area inside the Photos app. A photo or video you delete leaves your library and your albums straight away, but Apple's page on [recovering deleted photos](https://support.apple.com/en-by/124460) says it stays in this album for 30 days, so you can change your mind.

To find it on iPhone, open **Photos**, swipe up to the bottom of the Collections screen and tap **Recently Deleted** under **Utilities**. Tap a photo, then tap **Recover** to put it back where it was.

## When is it really gone?

There are two moments.

1. **After 30 days.** Apple's page on [deleting photos](https://support.apple.com/104967) says items are permanently deleted automatically once the 30 days are up. You don't need to do anything.
2. **When you delete it from inside the album.** Tap **Select**, choose the photos, tap **More**, then **Delete**. Apple says anything you remove this way can't be recovered.

Nothing in between is a safety net. Once either has happened, Recently Deleted can't bring the photo back, and Apple's pages on this don't describe any other copy you could restore it from.

## Why you can still see a photo you deleted

If you deleted something because you didn't want anyone to see it, remember where it went. For up to 30 days it's still on the phone, in an album one tap away from the rest of your library.

The album is locked by default. Apple says that on iOS 16, iPadOS 16.1 and later, you need Face ID or Touch ID to view it. That helps against someone picking up your unlocked phone, though it's only as strong as whatever unlocks the album on your device.

There's also a setting that turns the lock off. Apple says you can go to **Settings → Apps → Photos** and turn off **Use Face ID**, and that this unlocks the Hidden album as well. If you ever switched it off, Recently Deleted is open to anyone holding your unlocked phone.

## When a photo is gone sooner than 30 days

Apple names a few cases where a deleted photo doesn't wait for the 30 days.

- **You ran out of iCloud storage.** Apple's page on [deleting photos](https://support.apple.com/en-us/108922) says that if you go over your iCloud storage limit, your device immediately removes deleted photos and videos, so they can't be recovered from Recently Deleted.
- **You deleted it on another device.** With iCloud Photos on, deleting a photo on one device deletes it on every other device signed in with the same Apple Account.
- **Someone else deleted it from a Shared Library.** In a Shared Photo Library (iOS 16.1 and later), up to five invited people can add, edit or delete items. If one of them deletes a photo, it disappears for you too. Apple says only the person who added it can permanently delete it or recover it from Recently Deleted.

The first case is the one that surprises people. If photos seem to have vanished with no 30-day wait, a full iCloud account is worth checking.

## Photos that never go to Recently Deleted

Some photos can't be deleted in the Photos app at all. Apple says photos synced from a computer can't be deleted directly on the iPhone. The Trash button may be gray, and you may need to stop syncing photos from your computer, or remove them there.

Merged duplicates are different. When you merge them, Apple keeps one copy and moves the extras to Recently Deleted, where they follow the same 30-day rule.

## What it means for each situation

| Situation | What happens |
| --- | --- |
| You deleted a photo yesterday | It's in Recently Deleted. Recover it any time in the next 30 days |
| You deleted it 31 days ago | Permanently deleted, can't be recovered |
| You deleted it from Recently Deleted | Gone now, can't be recovered |
| iCloud storage is over the limit | Deleted photos are removed straight away, not held for 30 days |
| iCloud Photos is on | Deleting on one device deletes it on all of them |
| Someone in your Shared Library deleted it | It's gone for you too, but the person who added it can recover it |

## Do you want it gone now, or back?

If you want a photo back, open Recently Deleted and tap **Recover** before the 30 days are up. If you're still searching, check the album on a Mac or on iCloud.com too: Apple lists both as places where you can recover items.

If you want a photo gone for good, the second delete is the step that does it. We've written the steps, including what happens on your other devices, in [how to permanently delete photos from iPhone and iCloud](/blog/how-to-permanently-delete-photos-iphone).

## If the real goal is privacy

Deleting is one way to keep a photo from being seen. Another is to keep the photo but take it out of the library where your passcode opens it. Our guide to [hiding photos on iPhone](/guides/how-to-hide-photos-on-iphone) covers what the Hidden album protects, and [where hidden photos go in iCloud](/guides/where-do-hidden-photos-go-icloud) explains how they travel between devices.

We make PrivateRoll for that second case: a vault that opens with a [pattern of its own](/features/pattern-key), apart from your passcode, with the files kept encrypted on your iPhone. It doesn't change how Photos deletes things, so a photo you move into a vault still has to be deleted from your library and from Recently Deleted.
`,
  faq: [
    {
      q: "How long do photos stay in Recently Deleted on iPhone?",
      a: "30 days. Apple says deleted photos and videos stay in the album for 30 days, then they're permanently deleted and can't be recovered.",
    },
    {
      q: "Why did my deleted photos disappear from Recently Deleted early?",
      a: "Apple says that if you go over your iCloud storage limit, your device immediately removes deleted photos and videos, so they can't be recovered. A deletion made on another device or by someone in a Shared Library can also remove a photo.",
    },
    {
      q: "Can you recover photos after they leave Recently Deleted?",
      a: "No. Apple says photos are permanently deleted after the 30 days, or when you delete them from the album, and they can't be recovered.",
    },
    {
      q: "Can someone see my Recently Deleted photos?",
      a: "Anyone who can unlock the album can. On iOS 16 and later it asks for Face ID or Touch ID by default, and turning off Use Face ID in Settings leaves it unlocked.",
    },
  ],
};
