import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "how-to-see-hidden-photos-on-iphone",
  title: "How to See Hidden Photos on iPhone (Where They Went)",
  description:
    "Hidden photos on iPhone live in the Hidden album under Utilities in Photos. Here is how to open it, unhide a photo, and fix a missing album.",
  category: "How-to",
  published: "2026-10-25",
  author: "aryan-kumar",
  related: ["/guides/how-to-hide-photos-on-iphone", "/guides/hidden-album-vs-photo-vault", "/guides/where-do-hidden-photos-go-icloud"],
  body: `
Hidden photos on an iPhone are in the **Hidden** album: open Photos, scroll down to **Utilities**, and tap **Hidden**. On iOS 16 and later you unlock it with Face ID or Touch ID before anything shows.

If the album isn't where it should be, or it opens but looks empty, one of a few settings is usually the reason. The steps below are from Apple's own support page, [Hide photos on your iPhone, iPad, Mac or Apple Vision Pro with the Hidden album](https://support.apple.com/en-au/104987).

## How to open the Hidden album

1. Open the **Photos** app.
2. Scroll to the bottom of the Collections view, to **Utilities**.
3. Tap **Hidden**.
4. Tap **View Album**, then unlock it with Face ID or Touch ID.

Your hidden photos and videos appear as a normal grid. On iPad, you may need to tap the sidebar button first to see the list of albums.

## Why a hidden photo isn't in your library

Hiding a photo doesn't delete it. It moves the photo out of the main view. Apple says hidden items don't appear in the Library, in other albums, or in the Photos widget on your Home Screen. That's why a photo you hid last month seems to have vanished when you scroll through your camera roll.

The only place it shows up is the Hidden album. If you hid something by accident, that is where to look first.

## How to unhide a photo

Once you're inside the Hidden album:

1. Touch and hold the photo or video.
2. Tap **Unhide**.

It goes back to your Library, in the place its date puts it.

## If you can't find the Hidden album

When Utilities has no Hidden album, a setting has switched it off. Go to **Settings → Apps → Photos**, scroll down, and turn **Show Hidden Album** on. Apple notes that on iPhone and iPad the album is shown by default, and that you can choose not to show it, which hides the photos from the Photos app too. The setting has been there since iOS 14.

That means two different people can have very different views of the same phone. With **Show Hidden Album** off, someone browsing Photos won't see an album at all, and won't know anything was hidden. If you've borrowed or been handed an iPhone and the Hidden album is missing, this is the first place to check.

## If it asks for Face ID and won't open

On iOS 16, iPadOS 16.1 and macOS Ventura and later, Apple says the Hidden album is locked by default and needs authentication to open in Photos. On iPhone and iPad that means Face ID or Touch ID. On a Mac, it's Touch ID or your login password.

If it won't open, check that Face ID is set up and turned on for Photos. Apple's page doesn't describe a separate way in, so I won't guess at one here.

## Hidden on one device, hidden on all of them

If you use iCloud Photos, Apple says items you hide on one device are hidden on your other devices too. So hiding a photo on your iPhone also hides it on your iPad and Mac, and you unhide it from any of them. It also means the Hidden album is only as private as every device signed in to your Apple Account. Our guide to [where hidden photos go in iCloud](/guides/where-do-hidden-photos-go-icloud) covers how to check which devices those are.

## On a Mac

The Hidden album is off by default on a Mac. Choose **View → Show Hidden Photo Album**, then pick **Hidden** under **Utilities** in the sidebar. Click **View Album**, unlock it with Touch ID or your login password, then Control-click a photo and choose **Unhide Photo**.

## What the Hidden album does and doesn't protect

The album is a tidy way to keep photos out of sight. It isn't a separate lock. It opens with the same Face ID or Touch ID that opens your phone, so anyone whose face or finger is registered on the device can open it. Anyone you've handed an unlocked phone to can also get as far as the Photos app and look for the album.

That's fine for keeping a gift idea away from a curious kid. It's a weaker fit when the person you're keeping photos from lives with you. We lay out the difference in [hidden album vs. a photo vault](/guides/hidden-album-vs-photo-vault).

## If the photos are in a vault app instead

Photos you put in a vault app won't be in the Hidden album at all. The vault keeps its own copies, and you open them in that app. If you used a different app than the one you're looking in, open it directly. PrivateRoll works this way: its files live inside the app, encrypted on your iPhone, and open with a pattern of its own. Our guide to [hiding photos on iPhone](/guides/how-to-hide-photos-on-iphone) compares every method by what it really stops.
`,
  faq: [
    {
      q: "Where is the Hidden album on iPhone?",
      a: "Open Photos, scroll to the bottom to Utilities, and tap Hidden. On iOS 16 and later you unlock it with Face ID or Touch ID.",
    },
    {
      q: "Why is the Hidden album missing from my Photos app?",
      a: "Show Hidden Album is probably switched off. Go to Settings, then Apps, then Photos, and turn Show Hidden Album on.",
    },
    {
      q: "How do I unhide a photo on iPhone?",
      a: "Open the Hidden album, unlock it, touch and hold the photo, and tap Unhide. It returns to your main Library.",
    },
    {
      q: "Do hidden photos show up in the main Library?",
      a: "No. Apple says hidden items don't appear in the Library, other albums or the Photos widget. They only show in the Hidden album.",
    },
    {
      q: "If I hide a photo on my iPhone, is it hidden on my iPad too?",
      a: "Yes, if you use iCloud Photos. Apple says items hidden on one device are hidden on your other devices as well.",
    },
  ],
};
