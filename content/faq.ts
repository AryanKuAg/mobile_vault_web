import { site } from "@/lib/site";

export const homeFaq = [
  {
    q: `Is ${site.name} really free?`,
    a: "Yes. There are no ads, no subscriptions, no in-app purchases and no limits on what you add.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There's no sign-up, no email and no phone number. Your vault is tied to your pattern and your iPhone, not to an identity.",
  },
  {
    q: "What happens if I forget my pattern?",
    a: `Use the recovery phrase you saved when you made that vault: tap "Use recovery phrase" on the lock screen, type it, and choose a new pattern. The phrase only works on the iPhone where you made the vault.`,
  },
  {
    q: "Can you see my photos?",
    a: `No. Files are encrypted on your iPhone before they're saved, with a key derived from your pattern and a secret that never leaves the device. ${site.name} has no servers, so nothing is ever uploaded.`,
  },
  {
    q: "What if someone makes me open the app?",
    a: "Each pattern opens its own vault and none are listed, so you can open a vault of everyday photos instead of the one that matters. See A Vault for Each Pattern for details.",
  },
  {
    q: "What happens to my vaults when I get a new phone?",
    a: `They stay on the iPhone they were made on. Vaults aren't included in iCloud or computer backups and can't be transferred, so before you switch, share out anything you want to keep and add it to ${site.name} on the new phone.`,
  },
  {
    q: "Does it work on iPad?",
    a: `Not yet. ${site.name} is for iPhone, with iOS 17 or later. iPad is on the roadmap.`,
  },
];
