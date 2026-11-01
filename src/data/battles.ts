// Food battle pairs. There's no server, so there are no real votes: `pollA` is a
// fixed, made-up share for dish A, always labelled as a fun poll in the UI.

export type Battle = { a: string; b: string; pollA: number };

export const BATTLES: Battle[] = [
  { a: "kacchi", b: "chicken-tehari", pollA: 58 },
  { a: "fuchka", b: "chotpoti", pollA: 64 },
  { a: "khichuri-dim", b: "bhaat-maach", pollA: 47 },
  { a: "pizza", b: "beef-burger", pollA: 52 },
  { a: "roshogolla", b: "mishti-doi", pollA: 44 },
  { a: "cha-singara", b: "jhalmuri", pollA: 61 },
  { a: "morog-polao", b: "chicken-biryani", pollA: 39 },
  { a: "ice-cream", b: "falooda", pollA: 55 },
  { a: "mogoj-bhuna", b: "nalli-nihari", pollA: 36 },
  { a: "velpuri", b: "fuchka", pollA: 31 },
  { a: "chomchom", b: "roshogolla", pollA: 49 },
  { a: "borhani", b: "lassi", pollA: 57 },
  { a: "beef-chaap", b: "naan-chaap", pollA: 53 },
  { a: "daber-pani", b: "akher-rosh", pollA: 62 },
  { a: "momo", b: "chicken-shawarma", pollA: 45 },
];
