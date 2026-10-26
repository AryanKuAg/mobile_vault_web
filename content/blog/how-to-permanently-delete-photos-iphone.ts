import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "how-to-permanently-delete-photos-iphone",
  title: "How to Permanently Delete Photos from iPhone and iCloud",
  description:
    "Deleting a photo on iPhone only moves it to Recently Deleted for 30 days. Here's how to remove it for good, and what iCloud Photos does to your other devices.",
  category: "How-to",
  published: "2026-10-26",
  author: "aryan-kumar",
  related: ["/scenarios/selling-or-trading-in-my-iphone", "/guides/where-do-hidden-photos-go-icloud", "/guides/how-to-hide-photos-on-iphone"],
  body: `
Deleting a photo on your iPhone doesn't delete it yet. It moves to the **Recently Deleted** album, where Apple says it stays for 30 days before it's removed for good. To get rid of it now, you delete it a second time, from inside that album.

If you use iCloud Photos, the deletion also reaches your other devices. Here are the steps, and the cases where a photo takes more than one tap to remove.

## Step 1: Delete the photo

Open **Photos**, open the photo or video, tap the Trash button, then tap **Delete Photo**. To delete several, tap **Select**, choose them, tap the Trash button and confirm. These are the steps from Apple's page on [deleting photos on iPhone or iPad](https://support.apple.com/104967).

At this point the photo is out of your library and your albums, but it hasn't gone anywhere. It sits in Recently Deleted.

## Step 2: Delete it from Recently Deleted

This is the step that makes it permanent.

1. In **Photos**, scroll to the bottom of the Collections screen and tap **Recently Deleted**, under **Utilities**.
2. Unlock the album with Face ID or Touch ID. On iOS 16 and later it's locked by default, according to [Apple](https://support.apple.com/104967).
3. Tap **Select**, then choose the photos, or tap **Select All**.
4. Tap **More**, then **Delete** (or **Delete All**).
5. Confirm. If you use iCloud Photos, the choice is **Delete from All Devices**.

Apple's warning is plain: when you delete a photo or video from this album, you can't get it back. So check before you confirm.

## What happens if you do nothing

Nothing you need to do. Apple's guide to [recovering deleted photos](https://support.apple.com/en-by/124460) says anything in Recently Deleted stays for 30 days, and after that it's permanently deleted and can't be brought back.

That's the useful side of the 30 days: if you deleted something by mistake, you can open the album, tap the photo and tap **Recover**. It also means that if you're deleting something because you don't want anyone to see it, the photo is still on your phone, and anyone who can unlock Recently Deleted can see it until you empty the album.

## How to delete from iPhone and iCloud

With **iCloud Photos** turned on, your library is one library on every device signed in to the same Apple Account. Apple says that when you delete a photo or video on one device, it's deleted on all the others too.

So you don't delete from the iPhone and then separately from iCloud. One deletion does both, as long as iCloud Photos is on. Then:

- The photo leaves your iPad and your Mac as well. If other people use those devices, they'll see it vanish.
- Recently Deleted also exists on iCloud.com and on the Mac, so during the 30 days a photo you deleted on the iPhone can be recovered from there too. Apple's recovery page describes [Recently Deleted on iCloud.com](https://support.apple.com/en-by/124460) and on Mac.
- If iCloud Photos is off, the photo is only on that iPhone, and deleting it there is all there is to do. Anything you uploaded or sent somewhere else is a separate copy.

## Photos that don't delete the usual way

A few photos take extra care.

- **Photos synced from a computer.** Apple says you can't delete these directly in the Photos app on your device. They have to be removed from the computer they were synced from.
- **Duplicates.** When you merge duplicates under **Collections → Duplicates**, Apple keeps one copy and moves the rest to Recently Deleted, so they need the same second delete.
- **A Shared Library.** In an iCloud Shared Photo Library, which can have up to five other people, anyone can delete items. Apple says only the person who added a photo can permanently delete or recover it. If you want one of your photos gone from the shared library for good, you're the one to do it.

## Before you delete: keep what you want

Apple suggests backing up anything you want to keep before you delete, because the delete from Recently Deleted can't be undone. If you're clearing out photos for privacy rather than space, the safer question is often whether to delete or to move them somewhere private. Our guide to [hiding photos on iPhone](/guides/how-to-hide-photos-on-iphone) covers what the built-in Hidden album does and doesn't protect, and [where hidden photos go in iCloud](/guides/where-do-hidden-photos-go-icloud) explains how they travel between devices.

## Selling or handing over the phone

Emptying Recently Deleted is not the same as wiping a phone. If the iPhone is going to someone else, the steps are different: sign out of iCloud and erase the device. We cover them in [selling or trading in your iPhone](/scenarios/selling-or-trading-in-my-iphone).

## If the photos are ones you want to keep private

Some photos you want to keep, but you don't want them in the library where anyone with your passcode can scroll to them. That's what we built PrivateRoll for: a vault that opens with a [pattern of its own](/features/pattern-key), apart from your passcode, with the files kept encrypted on your iPhone. It doesn't change how Photos deletes things, so you still need to empty Recently Deleted after moving a photo out of your library.
`,
  faq: [
    {
      q: "How do I permanently delete photos from my iPhone?",
      a: "Delete them in Photos, then open Recently Deleted under Utilities, unlock it with Face ID or Touch ID, tap Select, choose the photos and tap More, then Delete. Otherwise Apple removes them automatically after 30 days.",
    },
    {
      q: "How do I permanently delete photos from iPhone and iCloud?",
      a: "If iCloud Photos is on, delete the photo on your iPhone and then delete it from Recently Deleted, choosing Delete from All Devices. Apple says a deletion on one device applies to every device signed in with the same Apple Account.",
    },
    {
      q: "How long do deleted photos stay on iPhone?",
      a: "30 days. Apple says anything in the Recently Deleted album stays there for 30 days, then it's permanently deleted and can't be recovered.",
    },
    {
      q: "Can I get a photo back after deleting it from Recently Deleted?",
      a: "No. Apple's guide says that when you delete a photo or video from the Recently Deleted album, you can't get it back. Recovery is only possible while it's still in the album.",
    },
  ],
};
