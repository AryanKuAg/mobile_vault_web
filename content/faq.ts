import { site } from "@/lib/site";

export const homeFaq = [
  {
    q: `Is ${site.name} really free?`,
    a: "Yes. There are no ads, no subscriptions and no in-app purchases.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There's no sign-up, no email and no phone number. Your vault is tied to your pattern and your device, not to an identity.",
  },
  {
    q: "What happens if I forget my pattern?",
    a: "That vault can't be opened, by you or by us. There's no recovery phrase or reset, because anything that could reset it could also open it. Pick a pattern you'll remember.",
  },
  {
    q: "Can you see my photos?",
    a: `No. Files are encrypted on your device before they're saved, with a key derived from your pattern and a secret that never leaves the device. ${site.name} has no servers, so nothing is ever uploaded.`,
  },
  {
    q: "What if someone forces me to open the app?",
    a: "Each pattern opens its own vault and none are listed, so you can open a decoy with everyday photos in it. You can also arm a duress vault that erases every other vault when its pattern is drawn. See Decoy Vaults for details.",
  },
  {
    q: "What happens to my vaults when I get a new phone?",
    a: `They stay on the device they were made on. Vaults aren't included in iCloud or computer backups and can't be transferred, so before you switch, share out anything you want to keep and add it to ${site.name} on the new phone.`,
  },
  {
    q: "Does it work on iPad?",
    a: `Yes. ${site.name} runs on iPhone and iPad, and each device keeps its own vaults.`,
  },
];
