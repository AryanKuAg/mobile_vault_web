import type { BlogPost } from "./index";

export const post: BlogPost = {
  slug: "how-to-hide-text-messages-on-iphone",
  title: "How to Hide Text Messages on iPhone Without Deleting Them",
  description:
    "iPhone can't hide a single conversation, but it can keep texts off your Lock Screen, silence one thread and filter unknown senders. What each one does.",
  category: "How-to",
  published: "2026-10-31",
  author: "aryan-kumar",
  related: ["/blog/how-to-hide-apps-on-iphone", "/scenarios/partner-knows-my-passcode", "/guides/pattern-vs-pin-vs-face-id"],
  body: `
iPhone has no setting that hides one conversation inside Messages while keeping it. What it can do is keep texts off your Lock Screen, silence a single thread, and send messages from people you don't know to a separate list. Those cover the most common worry, someone seeing a text pop up, but not someone opening Messages.

Here's what each option does, and where it stops.

## Keep message text off the Lock Screen

This is the one most people are looking for. Apple's guide to [changing notification settings](https://support.apple.com/guide/iphone/iph7c3d96bab/ios) says previews can include text from Messages and Mail, and that you can set them per app:

1. Open **Settings** and tap **Notifications**.
2. Tap **Messages**, then tap **Show Previews**.
3. Choose **Always**, **When Unlocked** or **Never**.

**Never** is the strictest of the three, and **When Unlocked** only shows the text once the phone is unlocked. Pick whichever you'd be comfortable with if the phone were face-up on a table.

**Stops:** a glance at your Lock Screen, or at the phone face-up on a table.
**Doesn't stop:** anyone who opens Messages. The conversation is all there.

## Silence one conversation with Hide Alerts

Open the conversation, tap the contact's name or icon at the top, and turn on **Hide Alerts**. You can also swipe left on the conversation in the list. Per [Apple's guide](https://support.apple.com/guide/iphone/iph62faab6a4/ios), you stop getting notifications for that conversation but keep receiving its messages.

One detail matters a lot here. The same page says: "Senders receive a note indicating that you have notifications silenced." In iMessage, the other person can see that you've done this. If you need the conversation quiet without the other person noticing, Hide Alerts is not the tool.

**Stops:** banners, sounds and Lock Screen entries for that thread.
**Doesn't stop:** the thread appearing in your list, or the other person finding out.

## Filter texts from unknown senders

If the messages you want out of sight are from numbers you don't know, [Apple's page on unknown senders](https://support.apple.com/en-gb/125068) explains the filter. In iOS 26 the setting is called **Screen Unknown Senders** and it's off by default. Turn it on under **Settings → Apps → Messages**, scrolling to **Unknown Senders**.

With it on, messages from people who aren't in your contacts, and who you haven't dealt with before, go to an **Unknown Senders** filter instead of your main list. Apple lists two exceptions: a sender you've replied to three times or more isn't filtered, and replying to an unknown sender doesn't move the conversation. Time Sensitive messages, such as verification codes, still notify you by default.

**Stops:** a main list cluttered with strangers and spam.
**Doesn't stop:** anyone seeing a conversation with a known contact.

## Delete a conversation, with a 30-day safety net

If you're willing to remove a conversation, deleting is the only way to take it out of your list. Apple says [deleted messages stay in Recently Deleted for 30 days](https://support.apple.com/guide/iphone/iph2c9c4bfcb/ios), after which they're gone. Two things catch people out:

- **Recently Deleted is a place anyone with your unlocked phone can look.** In Messages, tap the filter button, then **Recently Deleted**. You can remove items from there early, and Apple warns that this can't be undone.
- **With Messages in iCloud on, deleting on your iPhone deletes everywhere.** Apple says the message goes from all your devices where Messages in iCloud is turned on. It only affects your own Apple devices, never the other person's phone.

[Apple's guide to recovering deleted messages](https://support.apple.com/guide/iphone/iph16ecebf48/ios) confirms you can recover texts for up to 30 days, so a deleted message is recoverable by you, or by someone using your phone, until you empty that folder.

A related setting is **Keep Messages**, under **Settings → Apps → Messages**. Choosing 30 days or a year removes older conversations and their attachments automatically, so it isn't a way to hide anything. It permanently removes it.

## Why you can't hide the Messages app

For apps in general, iOS 18 and later let you lock or hide an app. But [Apple's guide to locking and hiding apps](https://support.apple.com/guide/iphone/iph00f208d05/ios) says apps that come installed can't be hidden, only apps you download from the App Store. Messages comes with the iPhone, so it can't go into the Hidden folder. Our guide to [hiding apps on iPhone](/blog/how-to-hide-apps-on-iphone) covers what that feature can and can't do.

## Which option for which worry

| Worry | What to use | Does the other person find out? |
| --- | --- | --- |
| A text showing on my Lock Screen | Show Previews → Never | No |
| One thread buzzing at bad times | Hide Alerts | Yes, in iMessage |
| Spam and strangers in my list | Screen Unknown Senders | No |
| A conversation I'd rather not keep | Delete, then empty Recently Deleted | No |
| Someone opening Messages | None of these | Not applicable |

The last row is the honest limit. If the person you're thinking of knows your passcode, they can open Messages and read everything the settings above leave in place. Our piece on [when a partner knows your passcode](/scenarios/partner-knows-my-passcode) talks through that situation calmly.

## If the sensitive part is a photo or a file

Texts themselves stay in Messages. PrivateRoll doesn't hide or lock conversations, and we make it, so we'll say plainly that it can't help with the texts. What it can hold is the photos, videos and files that arrive in them. Save an attachment out of Messages, then add it to a vault that opens only with its own pattern, as described on our [vault features page](/features/pattern-key). Anything you import is encrypted on your iPhone. You can then remove the original, and Photos keeps it in Recently Deleted for 30 days before it's gone for good.

If you're keeping messages as a record of harassment or threats, don't delete them. Our scenario on [keeping evidence of harassment](/scenarios/keeping-evidence-of-harassment) covers how to preserve them safely.
`,
  faq: [
    {
      q: "Can you hide a text conversation on iPhone without deleting it?",
      a: "Not inside Messages. iPhone can keep message text off your Lock Screen, silence a thread with Hide Alerts, or move unknown senders to a separate filter, but a conversation with a known contact stays in your list.",
    },
    {
      q: "How do I stop text messages showing on my iPhone Lock Screen?",
      a: "Go to Settings, Notifications, Messages, then Show Previews, and choose Never. Notifications still arrive, but they don't show the message text.",
    },
    {
      q: "Does the other person know if I use Hide Alerts?",
      a: "In iMessage, yes. Apple's guide says senders receive a note that you have notifications silenced.",
    },
    {
      q: "Can I recover a text message I deleted?",
      a: "Yes, for up to 30 days. Open Messages, tap the filter button, choose Recently Deleted, select the conversation and tap Recover.",
    },
    {
      q: "Can I put Messages in the Hidden folder?",
      a: "No. Apple says apps that come installed on the iPhone can't be hidden. Only apps you download from the App Store can go in the Hidden folder.",
    },
  ],
};
