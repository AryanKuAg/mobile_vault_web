import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "how-to-lock-an-album-on-iphone",
  title: "How to Lock an Album on iPhone (and What You Can't)",
  description:
    "You can't put a password on an ordinary iPhone album. Here is what you can lock, how to check the Hidden album lock, and what to do for the rest.",
  category: "How-to",
  published: "2026-10-28",
  author: "aryan-kumar",
  related: ["/guides/hidden-album-vs-photo-vault", "/blog/how-to-see-hidden-photos-on-iphone", "/guides/how-to-hide-photos-on-iphone"],
  body: `
You can't lock an ordinary album in the iPhone's Photos app. The Photos app has no password or Face ID setting for an album you made, or for a shared one. What you can lock is the **Hidden** album, and the **Recently Deleted** album with it, by moving the photos you want protected into Hidden.

That's less than the question suggests, but it covers most of what people want. Here is how it works, how to check it's switched on, and where it stops.

## What iPhone can lock

Apple's page on [hiding photos with the Hidden album](https://support.apple.com/en-au/104987) says that on iOS 16 and later the Hidden album is locked by default, and you need to authenticate to open it. On an iPhone, that means Face ID or Touch ID.

Apple's page on [deleting photos](https://support.apple.com/en-us/104967) says the same of the Recently Deleted album. Both are locked together, and one setting controls both.

So the only albums with a lock are those two. Every other album, whether you made it or Apple did, opens as soon as the phone is unlocked.

## How to lock photos with the Hidden album

1. Open **Photos** and find the photo or video. To pick several, tap **Select** first.
2. Tap the **More** button (three dots) and choose **Hide**, then confirm.
3. To see them again, scroll to **Utilities** and tap **Hidden**. It asks for Face ID or Touch ID before showing anything.

If you use iCloud Photos, Apple says hiding a photo on one device hides it on your other devices too. Our guide to [seeing hidden photos](/blog/how-to-see-hidden-photos-on-iphone) goes through the Hidden album step by step, including what to do if it won't open.

## How to check the lock is on

Apple says the lock is on by default, but it's quick to confirm, and worth doing if your phone has been set up for a while.

1. Open **Settings**, tap **Apps**, then **Photos**.
2. Find **Use Face ID** and make sure it's on.

Apple's deleting-photos page says that turning **Use Face ID** off also unlocks the Recently Deleted album, and that turning it off unlocks the Hidden album as well. If you ever wonder why anyone can open Hidden, that is the first place to look.

## How to hide the Hidden album itself

The lock stops people opening the album, but anyone swiping through Utilities can still see that a Hidden album exists. Apple's Hidden album page describes a second setting for that. In **Settings**, tap **Apps**, then **Photos**, and turn off **Show Hidden Album**.

Apple says that with it off, the album disappears from the Photos app, and so do the hidden photos. It's a handy extra layer for a casual look at your phone.

## What you can't lock

**Albums you made.** If you've built an album of, say, a trip or a project, there is no way to put a lock on it. The usual workaround is to hide the photos in it. Hiding takes them out of the Library and every album, including the ones you made, so the album will look empty or smaller.

**Shared albums.** Apple's page on [Shared Albums](https://support.apple.com/en-us/108314) doesn't offer a lock at all. It describes the owner deciding who can join: only people they invite or approve, or anyone with the link. Apple says the website option in iOS 26 and earlier publishes the photos to a page anyone can view. If privacy matters, a shared album is close to the opposite of a locked one.

**The Photos app itself.** Locking the Hidden album doesn't lock the rest of Photos. Someone holding your unlocked phone can open the Library and every other album.

## The limit of the Hidden album lock

The lock uses Face ID or Touch ID, and that is only as private as your phone's own unlock. Our comparison of the [Hidden album and a photo vault app](/guides/hidden-album-vs-photo-vault) explains the gap: the lock belongs to your phone, so anyone who can unlock your phone as you can, or who gets past Face ID, is a short step from the album. And everyone knows where Hidden lives.

That makes it a good lock against someone picking up your phone while you're not looking. It's a weaker one against a person you share a home with, or someone who knows your code.

## Ways to lock more than the Hidden album

If you need a stronger lock, there are three routes, each with a trade-off:

- **Hide the photos and turn off Show Hidden Album.** Free, but still guarded by your phone's own passcode.
- **Keep them in a locked note.** A note is a poor home for a large photo collection. See our look at [whether a locked note is safe enough](/guides/is-a-locked-note-safe-enough).
- **Use a separate vault.** A vault app that has its own unlock gives you a lock your phone's unlock doesn't open.

## Where PrivateRoll fits

We make PrivateRoll, so weigh this accordingly. It keeps photos and videos in a vault that opens with a [pattern you draw](/features/pattern-key) instead of your phone's passcode, and encrypts what's inside it on your iPhone. It can also show a [decoy vault](/features/decoy-vaults) of everyday photos if someone insists you open it. It isn't a way to lock an album inside Photos: the photos live in the vault instead. For anything already in your library, our guide to [hiding photos on iPhone](/guides/how-to-hide-photos-on-iphone) ranks every method by what it really protects against.
`,
  faq: [
    {
      q: "Can you put a password on a photo album on iPhone?",
      a: "No. Photos has no password option for an album you create or for a shared album. The only albums with a lock are Hidden and Recently Deleted, which open with Face ID or Touch ID.",
    },
    {
      q: "How do I lock the Hidden album on iPhone?",
      a: "On iOS 16 and later it's locked by default. To check, open Settings, tap Apps, then Photos, and make sure Use Face ID is on.",
    },
    {
      q: "Can I lock a shared album on iPhone?",
      a: "No. Apple's page on Shared Albums offers no lock. The owner chooses who can join, either invited people only or anyone with the link.",
    },
    {
      q: "How do I stop people seeing that I have a Hidden album?",
      a: "Open Settings, tap Apps, then Photos, and turn off Show Hidden Album. The album and the hidden photos then no longer appear in the Photos app.",
    },
  ],
};
