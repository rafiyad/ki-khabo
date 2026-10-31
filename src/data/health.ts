// Funny health notes for every dish: a cigarette-pack style warning plus a 1–3
// "পেট-শান্তি মিটার" (oil, spice, heaviness). Kept apart from foods.ts so the
// engine data stays focused on matching.
//
// Humor rule (docs/brief.md): joke about the food and the situation (sleep, oil,
// sugar, hygiene, water), never about the person's body, age, gender or money.

export type Level = 1 | 2 | 3;

export type Health = {
  warning: string;
  oil: Level;
  spice: Level;
  /** How heavy it sits: 3 = afternoon nap guaranteed. */
  heavy: Level;
};

export const HEALTH: Record<string, Health> = {
  // ---------- Biryani / polao ----------
  "chicken-tehari": { oil: 2, spice: 2, heavy: 3, warning: "খাওয়ার পর ভাতঘুম আসতে পারে। ড্রাইভিং বা মিটিংয়ের আগে সাবধান।" },
  kacchi: { oil: 3, spice: 2, heavy: 3, warning: "খাওয়ার পর ২ ঘণ্টা ঘুম অনিবার্য। বিকেলে মিটিং থাকলে বস-কে আগেই জানিয়ে রাখুন।" },
  "beef-tehari": { oil: 3, spice: 2, heavy: 3, warning: "তেলে ভাসা সুখ। খাওয়ার পর ১০ মিনিট হাঁটলে পেট ধন্যবাদ দেবে।" },
  "morog-polao": { oil: 2, spice: 1, heavy: 3, warning: "ঘি-এর ঘ্রাণে মন গলে যাবে, কিন্তু প্লেট দুইবার ভরলে পেট বিদ্রোহ করবে।" },
  "chicken-biryani": { oil: 2, spice: 2, heavy: 3, warning: "আলুটা নিয়ে ঝগড়া করবেন না। বিরিয়ানি শেয়ার করুন, শান্তি বজায় রাখুন।" },

  // ---------- Home style ----------
  "khichuri-dim": { oil: 2, spice: 1, heavy: 2, warning: "খিচুড়ি খেলে ঘুম আসবেই। এটা বিজ্ঞান না, এটা আবেগ।" },
  "shobji-khichuri": { oil: 1, spice: 1, heavy: 2, warning: "এতো স্বাস্থ্যকর খাবারে আপনার পেট অবাক হয়ে যেতে পারে। 😇" },
  "bhaat-maach": { oil: 1, spice: 1, heavy: 1, warning: "কাঁটা সাবধানে বাছুন। তাড়াহুড়া করলে মাছ জিতে যাবে।" },
  "shorshe-ilish": { oil: 2, spice: 2, heavy: 2, warning: "কাঁটা বাছতে বাছতে দুপুর বিকেল হয়ে যেতে পারে। ধৈর্য রাখুন, ইলিশ এর যোগ্য।" },
  "beef-kalabhuna": { oil: 3, spice: 3, heavy: 3, warning: "এক প্লেট = সুখ। দুই প্লেট = ডাক্তার আঙ্কেলের সুখ।" },
  "chingri-malaikari": { oil: 2, spice: 1, heavy: 2, warning: "চিংড়িতে অ্যালার্জি থাকলে এটা প্রেম না, বিপদ। নিশ্চিত হয়ে খান।" },
  "bhorta-bhaat": { oil: 1, spice: 3, heavy: 1, warning: "শুকনা মরিচের ঝালে চোখে পানি আসতে পারে। আবেগ না, ঝাল।" },
  "daal-bhaat-dim": { oil: 1, spice: 1, heavy: 1, warning: "এই খাবারে কোনো ঝুঁকি নাই। শুধু বাসার রান্নার কথা মনে পড়তে পারে।" },
  "murgir-jhol": { oil: 1, spice: 2, heavy: 1, warning: "ঝোল বেশি নিলে ভাতও বেশি লাগবে। এই চক্র থেকে আজ পর্যন্ত কেউ বের হতে পারেনি।" },
  nihari: { oil: 3, spice: 2, heavy: 3, warning: "সকালে নেহারি খেলে বাকি দিন সোফার সাথে গভীর সম্পর্ক হতে পারে।" },
  "khashir-rezala": { oil: 3, spice: 1, heavy: 3, warning: "রিচ খাবার। খাওয়ার পর একটু হাঁটুন, পেটকে হজমের সুযোগ দিন।" },
  "panta-ilish": { oil: 1, spice: 2, heavy: 2, warning: "পান্তা ঠান্ডা, কিন্তু খাওয়ার পর ঘুম আসবে গরম গরম। অফিসে সাবধান।" },
  "paratha-daal": { oil: 2, spice: 1, heavy: 1, warning: "পরোটার তেল টিস্যু দিয়ে একটু চেপে নিলে কেউ কিছু বলবে না। কথা দিলাম।" },
  "paratha-dim": { oil: 2, spice: 1, heavy: 2, warning: "দুই পরোটার পর থামতে শিখুন। তৃতীয়টা পেটের সিলেবাসের বাইরে।" },
  "luchi-alur-dom": { oil: 3, spice: 1, heavy: 2, warning: "লুচি গোনা নিষেধ না, কিন্তু ছয়টার পর পেট নিজেই গুনতে শুরু করবে।" },
  "ruti-shobji": { oil: 1, spice: 1, heavy: 1, warning: "এতো হেলদি খাবার খেলে নিজেকে নিয়ে গর্ব হতে পারে। সাবধান! 😇" },
  "doi-chira": { oil: 1, spice: 1, heavy: 1, warning: "পেট ঠান্ডা, মন ঠান্ডা। শুধু দইটা টাটকা কিনা দেখে নিন।" },

  // ---------- Street food ----------
  fuchka: { oil: 2, spice: 3, heavy: 1, warning: "টক পানির দোকানটা পরিষ্কার তো? পেট আপনার, রিস্কও আপনার।" },
  chotpoti: { oil: 2, spice: 3, heavy: 2, warning: "ঝাল বেশি চাইবেন না। পরে পানি খুঁজতে দেখে দোকানদার মামাও হাসবে।" },
  jhalmuri: { oil: 1, spice: 3, heavy: 1, warning: "মরিচ কম দিতে বলুন, নইলে ঝালমুড়ি না, আগুনমুড়ি খাবেন। 🔥" },
  "cha-singara": { oil: 3, spice: 2, heavy: 1, warning: "দিনে চার কাপ চা পার হলে রাতের ঘুম আপনাকে ব্লক করে দিতে পারে।" },
  "beguni-piyaju": { oil: 3, spice: 2, heavy: 1, warning: "কয়দিনের পুরানো তেলে ভাজা, খেয়াল করুন। পেট সব মনে রাখে।" },
  "dim-chop": { oil: 3, spice: 2, heavy: 2, warning: "দুইটার বেশি ডিম চপ খেলে পেটে 'সার্ভার ডাউন' দেখাতে পারে।" },
  "cha-biscuit": { oil: 1, spice: 1, heavy: 1, warning: "চিনি এক চামচ কম নিন, আর বিস্কুট বেশিক্ষণ চায়ে ডুবাবেন না। হারিয়ে যাবে।" },
  haleem: { oil: 2, spice: 3, heavy: 3, warning: "এক বাটিতেই পেট ভরে যায়। দ্বিতীয় বাটি নিজ দায়িত্বে।" },
  "kebab-paratha": { oil: 3, spice: 3, heavy: 2, warning: "কাবাব ভেতর পর্যন্ত সেদ্ধ হয়েছে তো? কাঁচা কাবাব = পেটের ঝামেলা।" },

  // ---------- Fast food ----------
  "chicken-shawarma": { oil: 2, spice: 2, heavy: 2, warning: "মেয়োনিজটা টাটকা কিনা জিজ্ঞেস করুন। পেট পরে প্রশ্ন করবে না, সরাসরি শাস্তি দেবে।" },
  "beef-burger": { oil: 3, spice: 1, heavy: 3, warning: "সাথে কোক নিলে চিনির ডাবল ডোজ। এক গ্লাস পানি নিন, পেট খুশি থাকবে।" },
  "chicken-burger": { oil: 3, spice: 1, heavy: 2, warning: "ফ্রাই-কোক কম্বো সবসময় 'ডিল' না। মাঝে মাঝে শুধু বার্গারই যথেষ্ট।" },
  pizza: { oil: 3, spice: 1, heavy: 3, warning: "শেষ স্লাইস নিয়ে বন্ধুত্ব ভাঙবেন না। ভাগ করে খান।" },
  "fried-chicken": { oil: 3, spice: 2, heavy: 3, warning: "চামড়াটাই আসল মজা, আবার আসল তেলও ওখানেই। মাসে কয়েকবারই যথেষ্ট।" },
  "naan-chaap": { oil: 3, spice: 2, heavy: 3, warning: "চাপ খেয়েই শুয়ে পড়লে বুকজ্বালা ফ্রি পাবেন। একটু হেঁটে নিন।" },
  chowmein: { oil: 2, spice: 2, heavy: 2, warning: "সস বেশি মানে নুনও বেশি। পাশে এক গ্লাস পানি রাখুন।" },
  "fried-rice": { oil: 2, spice: 1, heavy: 2, warning: "ফ্রাইড রাইস আর চিলি চিকেন একসাথে নিলে পরের এক ঘণ্টা আপনি অফলাইন।" },
  "thai-soup": { oil: 1, spice: 2, heavy: 1, warning: "গরম স্যুপে জিভ পুড়লে তিন দিন কোনো খাবারের স্বাদ পাবেন না। ফুঁ দিন!" },

  // ---------- Sweets ----------
  roshogolla: { oil: 1, spice: 1, heavy: 1, warning: "একটা রসগোল্লা ঠিক আছে। পুরো হাঁড়ি হলে চিনিও লজ্জা পাবে।" },
  "mishti-doi": { oil: 1, spice: 1, heavy: 1, warning: "চিনির পরিমাণ জানলে দই নিজেই লজ্জা পাবে। ছোট বাটিই যথেষ্ট।" },
  "ice-cream": { oil: 1, spice: 1, heavy: 1, warning: "তাড়াহুড়া করে খেলে ব্রেইন-ফ্রিজ! মাথা জমে যাবে, মন না। 🧊" },
  falooda: { oil: 1, spice: 1, heavy: 2, warning: "এক গ্লাস ফালুদায় তিন বেলার মিষ্টি। বন্ধুর সাথে ভাগ করে খান।" },
  pitha: { oil: 1, spice: 1, heavy: 1, warning: "সদ্য নামানো পিঠার ভেতরের গুড় আগুন গরম। জিভ বাঁচান!" },
  jilapi: { oil: 3, spice: 1, heavy: 1, warning: "জিলাপির প্যাঁচ মজার, কিন্তু চিনির প্যাঁচে পড়বেন না। দুইটাই যথেষ্ট।" },
  lassi: { oil: 1, spice: 1, heavy: 2, warning: "লাচ্ছির পর ঘুম আসলে দোষ লাচ্ছির না, দুপুরের। চিনি কম বলতে পারেন।" },
};

/** Fallback for a dish without a note yet. The data test makes sure this isn't needed. */
export const DEFAULT_HEALTH: Health = {
  oil: 2,
  spice: 2,
  heavy: 2,
  warning: "যতটুকু খাবেন ততটুকুই নিন, আর পাশে এক গ্লাস পানি রাখুন।",
};
