import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "how-to-hide-apps-on-iphone",
  title: "How to Hide Apps on iPhone, and What Each Way Hides",
  description:
    "Four ways to hide an app on iPhone, from the App Library to iOS 18's Hidden folder, and the places a hidden app still shows up.",
  category: "How-to",
  published: "2026-10-24",
  author: "aryan-kumar",
  related: ["/guides/how-to-hide-photos-on-iphone", "/features/decoy-vaults", "/scenarios/partner-knows-my-passcode"],
  body: `
Hiding an app can mean three different things: getting the icon off your Home Screen, making the app ask for Face ID before it opens, or keeping people from knowing it's installed at all. iPhone can do the first two well. The third is harder than it looks, and it's worth knowing why before you rely on it.

Here are the four ways, from the lightest to the strongest, with what each one actually stops.

## 1. Take it off the Home Screen

Touch and hold the app's icon, tap **Remove App**, then **Remove from Home Screen**. The app stays installed and keeps its data; it just moves to the **App Library**, the last page you reach by swiping left.

**Stops:** someone glancing at your Home Screen.
**Doesn't stop:** anyone who swipes to the App Library or types the app's name into search. Both show it straight away.

## 2. Hide a whole Home Screen page

If you'd rather tuck away a group of apps, put them on one page, then touch and hold an empty spot until the icons jiggle. Tap the row of dots above the Dock and untick that page. The apps stay put, the page just stops showing.

**Stops:** casual scrolling.
**Doesn't stop:** search, or anyone who knows the trick. It's the same two weaknesses as the first method.

## 3. Lock it with Face ID

Since iOS 18, you can lock any app you downloaded from the App Store. Touch and hold its icon, tap **Require Face ID** (or Touch ID, or Passcode, depending on your iPhone), and confirm. From then on, the app asks for Face ID every time it opens.

Locking does more than guard the door. Apple says that content inside a locked app stays out of notification previews, search, Siri suggestions and your call history, so the text of a message from it won't show on your Lock Screen.

**Stops:** someone picking up your unlocked phone and opening the app.
**Doesn't stop:** anyone who knows your passcode. If Face ID fails, the iPhone offers the passcode instead, and that opens the app.

## 4. Hide it in the Hidden folder

The strongest built-in option is a step past locking. Touch and hold the icon, tap **Require Face ID**, then choose **Hide and Require Face ID**. The app leaves the Home Screen and search, and moves to a **Hidden** folder at the bottom of the App Library. The folder only opens with Face ID, Touch ID or your passcode.

There are limits, from Apple's own [guide to locking and hiding apps](https://support.apple.com/guide/iphone/iph00f208d05/ios):

- Only apps from the App Store can be hidden. Built-in apps like Photos and Messages can't, and some, like Camera and Settings, can't even be locked. For texts, see how to [hide text messages on iPhone](/blog/how-to-hide-text-messages-on-iphone) instead.
- Hiding works on one device. It doesn't sync to your iPad or carry over through iCloud.
- Children under 13 in a Family Sharing group can't lock or hide apps, and parents can still see what teens download and how much they use it.

## Where a hidden app still shows up

Hiding takes an app out of the obvious places, not every place. Apple lists where it can still appear:

- **Settings → Apps → Hidden Apps**, which lists it by name
- Screen Time reports
- Battery usage in Settings
- Your App Store purchase history

So hiding works against someone flicking through your phone. It won't fool someone who goes looking, and it does nothing against anyone who has your passcode, because the passcode opens the Hidden folder too.

## Which way to use

| Method | Icon off the Home Screen | Needs Face ID to open | Stops someone with your passcode |
| --- | --- | --- | --- |
| Remove from Home Screen | Yes | No | No |
| Hide a Home Screen page | Yes | No | No |
| Require Face ID | No | Yes | No |
| Hide and Require Face ID | Yes | Yes | No |

The last column is the one that matters if the person you're worried about knows your code, and none of iPhone's options cover it. They all come back to the passcode.

## When the app holds photos or files

If what you're really protecting is the photos, videos or documents inside an app, hiding the app is the outer layer at best. What protects the files themselves is a separate lock that your passcode doesn't open.

That's what we built PrivateRoll to be: a vault that opens with a pattern of its own and keeps its files encrypted on your iPhone. If someone asks you to open it, a second pattern can open a [decoy vault](/features/decoy-vaults) of everyday photos instead. You can still hide the app itself in the Hidden folder on top of that. For photos already in your library, our guide to [hiding photos on iPhone](/guides/how-to-hide-photos-on-iphone) ranks every method by what it really protects against.
`,
  faq: [
    {
      q: "Can you hide apps on iPhone without deleting them?",
      a: "Yes. Remove the app from your Home Screen and it moves to the App Library with its data intact, or, on iOS 18 and later, use Hide and Require Face ID to move it to the Hidden folder.",
    },
    {
      q: "Where do hidden apps go on iPhone?",
      a: "Into the Hidden folder at the bottom of the App Library, which opens with Face ID, Touch ID or your passcode. They're still listed by name in Settings under Apps, then Hidden Apps.",
    },
    {
      q: "Can someone see my hidden apps if they know my passcode?",
      a: "Yes. If Face ID fails, your iPhone falls back to the passcode, and the passcode opens the Hidden folder and any locked app. To keep something from a person who knows your code, it needs a separate lock of its own.",
    },
    {
      q: "Can you hide built-in apps like Photos or Messages?",
      a: "No. Only apps you download from the App Store can be hidden. Some built-in apps can be locked with Face ID, but not hidden, and a few, like Camera, Clock and Settings, can't be locked at all.",
    },
  ],
};
