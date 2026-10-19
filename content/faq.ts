import { site } from "@/lib/site";

export const homeFaq = [
  {
    q: `Is ${site.name} really free?`,
    a: `Yes. The main vault, pattern encryption, Vault Camera and backup of your main vault are free with no ads. ${site.name} Pro adds hidden vaults, the panic pattern, sync, sharing and more icons.`,
  },
  {
    q: "Do I need to create an account?",
    a: "No. There's no sign-up, no email and no phone number. Your vault is tied to your pattern, not to an identity.",
  },
  {
    q: "What happens if I forget my pattern?",
    a: "Use the recovery phrase you wrote down when you created the vault. Without the pattern or the phrase, nobody can open the vault, including us.",
  },
  {
    q: "Can you see my photos?",
    a: "No. Files are encrypted on your iPhone before they're saved or backed up, using a key derived from your pattern. We never receive that key.",
  },
  {
    q: "What if someone forces me to open the app?",
    a: "Every pattern opens a vault, so you can open a decoy without showing anything else. With Pro you can also set a panic pattern. See Deniable Vaults for details.",
  },
  {
    q: "Does it work on iPad?",
    a: "Yes. Veilbox runs on iPhone and iPad, and Pro can keep them in sync.",
  },
];
