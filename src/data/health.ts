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

  // ---------- Meat specials (নলি, পায়া, মগজ, চাপ, কাবাব) ----------
  "nalli-nihari": { oil: 3, spice: 2, heavy: 3, warning: "নলির মজ্জা টানতে গিয়ে শব্দ হলে লজ্জা নাই, এটাই নিয়ম। তবে মাসে এক-দুইবারই যথেষ্ট।" },
  "khashir-nalli": { oil: 3, spice: 3, heavy: 3, warning: "নলি একটাই, হাত অনেকগুলো। টেবিলে ঝগড়া এড়াতে আগেই ভাগ ঠিক করুন।" },
  "khashir-paya": { oil: 3, spice: 2, heavy: 3, warning: "সকালে পায়া খেলে দুপুর পর্যন্ত আর কিছু লাগবে না। ঝোলে চুমুক দিন, অফিসের শার্টে না।" },
  "gorur-paya": { oil: 3, spice: 3, heavy: 3, warning: "পায়ার ঝোল যত গাঢ়, ঘুম তত গভীর। সকালে খেলে অ্যালার্ম দুইটা দিন।" },
  "mogoj-bhuna": { oil: 3, spice: 2, heavy: 2, warning: "মগজ খেলে বুদ্ধি বাড়ে কিনা জানি না, তবে তেল বাড়ে নিশ্চিত। সপ্তাহে একবারই থাক।" },
  "beef-chaap": { oil: 3, spice: 2, heavy: 3, warning: "কয়লার আগুনে ঝলসানো চাপ মানেই ধোঁয়ার ঘ্রাণ আর ভারী পেট। সাথে শসা-পেঁয়াজ নিন।" },
  "khashir-chaap": { oil: 3, spice: 2, heavy: 3, warning: "চাপ ভেতর পর্যন্ত সেদ্ধ কিনা দেখুন। দাঁতের ফাঁকের জন্য টুথপিক রেডি রাখুন।" },
  "suti-kabab": { oil: 3, spice: 3, heavy: 2, warning: "সুতি কাবাব নরম, কিন্তু ঝাল শক্ত। পানি হাতের কাছে রাখুন।" },
  "boti-kabab": { oil: 3, spice: 3, heavy: 2, warning: "কয়লার ধোঁয়া জামায় থেকে যাবে। এটা যেকোনো পারফিউমের চেয়ে শক্তিশালী।" },
  "shami-kabab": { oil: 3, spice: 2, heavy: 1, warning: "একটা শামি কাবাব নিরীহ, পাঁচটা হলে পেট মামলা করবে।" },
  "chicken-tikka": { oil: 2, spice: 2, heavy: 2, warning: "তন্দুরের টিক্কা তুলনামূলক কম তেলে। সাবাশ! তবে সাথে নানের সংখ্যা গুনুন।" },
  "tandoori-chicken": { oil: 2, spice: 2, heavy: 2, warning: "ভেতরে গোলাপি থাকলে ফেরত দিন। কম রান্না মুরগি পেটের শত্রু।" },
  "grill-chicken": { oil: 3, spice: 2, heavy: 3, warning: "মেয়োনিজ দুই বাটি নিলে ওটা আর গ্রিল না, মেয়ো-স্যুপ। টাটকা কিনা দেখে নিন।" },
  "chui-jhal-khashi": { oil: 3, spice: 3, heavy: 3, warning: "চুইয়ের ঝাল জিভে না, মাথায় ওঠে। প্রথম কামড়ের পর চোখে পানি আসা স্বাভাবিক।" },
  "mezbani-gosht": { oil: 3, spice: 3, heavy: 3, warning: "মেজবানির ঝাল আর তেল দুটোই জাঁকজমক। এক প্লেট খেলে চট্টগ্রাম পর্যন্ত ঘুম।" },
  "satkora-gosht": { oil: 3, spice: 2, heavy: 3, warning: "সাতকরার টক ঘ্রাণে ভাত বেশি চলে যাবে। প্লেট গুনুন।" },
  "bot-bhuna": { oil: 3, spice: 3, heavy: 2, warning: "বট ভালো করে পরিষ্কার আর সেদ্ধ হয়েছে কিনা নিশ্চিত হন। নইলে পেট বিদ্রোহ করবে।" },
  "murgir-kolija": { oil: 2, spice: 2, heavy: 1, warning: "কলিজা টাটকা কিনা দেখে নিন। বেশি ভাজলে রাবার, কম ভাজলে বিপদ।" },

  // ---------- More biryani / polao ----------
  "khashir-biryani": { oil: 3, spice: 2, heavy: 3, warning: "খাসির বিরিয়ানির পর বিকেলের পরিকল্পনা বাতিল করুন। শরীর ঘুম চাইবেই।" },
  "ilish-polao": { oil: 2, spice: 2, heavy: 2, warning: "ইলিশের কাঁটা আর পোলাওয়ের ঘি, দুটো সামলাতেই পুরো মনোযোগ লাগবে।" },
  "polao-roast": { oil: 3, spice: 1, heavy: 3, warning: "বিয়েবাড়ির স্বাদ, কোনো দাওয়াত ছাড়াই। খাওয়ার পর একটু হাঁটুন।" },

  // ---------- More home style ----------
  "bhuna-khichuri": { oil: 3, spice: 2, heavy: 3, warning: "বৃষ্টির দিনে ভুনা খিচুড়ি নিষেধ না, কিন্তু পরের ঘুমের দায় আমাদের না।" },
  "khichuri-ilish": { oil: 2, spice: 1, heavy: 2, warning: "বৃষ্টি, খিচুড়ি আর ইলিশ ভাজা: এর চেয়ে বড় সুখ আছে কিনা গবেষণা চলছে। কাঁটা সাবধান।" },
  "hasher-mangsho": { oil: 3, spice: 3, heavy: 3, warning: "হাঁস আর চালের রুটি শীতের সেরা জুটি। দুই প্লেটের পর কম্বলই আপনার একমাত্র বন্ধু।" },
  "gorur-bhuna": { oil: 3, spice: 2, heavy: 3, warning: "ঈদের মতো স্বাদ, ঈদের মতো ঘুম। খাওয়ার পর আধা ঘণ্টা হাঁটুন।" },
  "shutki-bhaat": { oil: 1, spice: 3, heavy: 1, warning: "শুঁটকির ঘ্রাণ পাশের ফ্ল্যাট পর্যন্ত যাবে। প্রতিবেশীদের আগেই জানিয়ে রাখুন।" },
  "lal-shak-daal": { oil: 1, spice: 1, heavy: 1, warning: "শাক খেলে বাসার সবাই খুশি, পেট খুশি, ডাক্তারও খুশি। একসাথে সবাইকে খুশি করা বিরল।" },
  "pabda-jhol": { oil: 1, spice: 2, heavy: 1, warning: "পাবদার কাঁটা নরম, তবু সাবধান। তাড়াহুড়া মানেই গলায় কাঁটা।" },
  "rui-bhuna": { oil: 2, spice: 2, heavy: 1, warning: "রুইয়ের মাথা কে পাবে, এই নিয়ে পারিবারিক বৈঠক লাগতে পারে।" },
  "loitta-fry": { oil: 3, spice: 2, heavy: 1, warning: "লইট্টা ফ্রাই মচমচে, কিন্তু তেলটা কয় বেলার পুরনো, জিজ্ঞেস করতে ভুলবেন না।" },
  "kachki-chorchori": { oil: 2, spice: 2, heavy: 1, warning: "ছোট মাছ, বড় উপকার। শুধু চচ্চড়ির ঝালে সাবধান।" },
  "dim-bhuna": { oil: 2, spice: 2, heavy: 1, warning: "মেসের জাতীয় খাবার। ডিম দুইটার বেশি হলে কোলেস্টেরল মনে মনে হাসবে।" },
  "kalai-ruti": { oil: 1, spice: 3, heavy: 1, warning: "কালাই রুটি পুরু আর মজার, সাথে ঝাল ভর্তা। মরিচ কম দিতে বলুন।" },

  // ---------- More street food ----------
  velpuri: { oil: 2, spice: 3, heavy: 1, warning: "ভেলপুরির পাপড়ি মচমচে থাকতে থাকতে খান, আর টক পানিটা পরিষ্কার কিনা দেখুন।" },
  "doi-fuchka": { oil: 2, spice: 2, heavy: 1, warning: "টক-মিষ্টি-ঝাল এক কামড়ে। শুধু দইটা টাটকা কিনা দেখুন।" },
  ghugni: { oil: 1, spice: 2, heavy: 1, warning: "সস্তা, পেট ভরা, শান্তি। শুধু ঝালটা মেপে দিতে বলুন।" },
  "alur-chop": { oil: 3, spice: 2, heavy: 1, warning: "চপের তেল কাগজে মুছে নিন। কাগজটা আপনার চেয়ে বেশি তেল খাবে।" },
  "shobji-somucha": { oil: 3, spice: 2, heavy: 1, warning: "সমুচার কোণা ধারালো, গরম ভেতরটা আরো ধারালো। ফুঁ দিয়ে খান।" },
  "dal-puri": { oil: 3, spice: 1, heavy: 1, warning: "ডালপুরি তিনটা পর্যন্ত নাস্তা, পাঁচটা হলে সেটা জীবনদর্শন।" },
  "moglai-paratha": { oil: 3, spice: 2, heavy: 2, warning: "মোগলাইয়ের তেল আর ডিম দুটোই দরাজদিল। সাথে সালাদ খেলে দোকানদারও অবাক হবে।" },
  "chicken-roll": { oil: 2, spice: 2, heavy: 2, warning: "রোল হাতে নিয়ে হাঁটতে হাঁটতে খাবেন না। সস জামায় পড়বেই।" },
  "chitoi-pitha": { oil: 1, spice: 3, heavy: 1, warning: "শুঁটকি ভর্তার ঝাল ভোরের ঘুম ভাঙাতে যথেষ্ট। চোখ খোলা রাখুন।" },
  bakorkhani: { oil: 2, spice: 1, heavy: 1, warning: "বাকরখানির গুঁড়া বিছানায় পড়লে সারারাত খচখচ করবে। টেবিলে বসে খান।" },
  "badam-bhaja": { oil: 1, spice: 1, heavy: 1, warning: "বাদামের খোসা যেখানে সেখানে ফেলবেন না। শহরটা আমাদেরই।" },
  "fol-makha": { oil: 1, spice: 3, heavy: 1, warning: "লবণ-মরিচে মাখানো ফল দারুণ, শুধু কাটার ছুরিটা পরিষ্কার কিনা দেখে নিন।" },
  "bhutta-pora": { oil: 1, spice: 2, heavy: 1, warning: "ভুট্টার দানা দাঁতে আটকাবেই। ক্যামেরার সামনে হাসার আগে আয়না দেখুন।" },

  // ---------- More fast food ----------
  momo: { oil: 1, spice: 2, heavy: 1, warning: "স্টিমড মোমো মানে কম তেল! সস বেশি নিলে সেই সুবিধা শেষ।" },
  pasta: { oil: 3, spice: 1, heavy: 2, warning: "হোয়াইট সস মানেই ক্রিম আর চিজ। এক প্লেটেই থামুন।" },
  "club-sandwich": { oil: 2, spice: 1, heavy: 2, warning: "তিন তলা স্যান্ডউইচ কামড়াতে গেলে চারপাশে ধ্বংসযজ্ঞ। টিস্যু রাখুন।" },
  "chicken-wings": { oil: 3, spice: 3, heavy: 2, warning: "নাগার ঝাল সাহসীদের জন্য। পাশে দই বা দুধ রাখুন, পানিতে কাজ হবে না।" },
  "french-fries": { oil: 3, spice: 1, heavy: 1, warning: "ফ্রাইয়ে আলাদা লবণ দেবেন না, দোকান আগেই দিয়ে রেখেছে।" },
  "packet-noodles": { oil: 2, spice: 2, heavy: 1, warning: "দুই মিনিটের নুডলস, কিন্তু মসলার প্যাকেটে সারাদিনের লবণ। অর্ধেক মসলাতেও চলে।" },
  "chicken-patties": { oil: 3, spice: 1, heavy: 1, warning: "পেটিসের পরত ঝরে পড়বে। কোলে একটা কাগজ রাখুন।" },

  // ---------- More sweets and pitha ----------
  chomchom: { oil: 1, spice: 1, heavy: 1, warning: "টাঙ্গাইলের চমচম এক টুকরাই রাজকীয়। দুইটার পর চিনিও ক্লান্ত হবে।" },
  kalojam: { oil: 2, spice: 1, heavy: 1, warning: "কালোজাম রসে ডুবানো থাকে, আপনি ডুববেন না।" },
  shondesh: { oil: 1, spice: 1, heavy: 1, warning: "সন্দেশ ছোট, কিন্তু মিষ্টি বড়। দুইটাই যথেষ্ট।" },
  payesh: { oil: 1, spice: 1, heavy: 2, warning: "বাসার পায়েসের সাথে কোনো তুলনা চলে না। এক বাটিতেই মন ভরে।" },
  firni: { oil: 1, spice: 1, heavy: 1, warning: "ঠান্ডা ফিরনি মাটির বাটিতে। বাটিটা ফেরত দিতে ভুলবেন না।" },
  zarda: { oil: 2, spice: 1, heavy: 2, warning: "জর্দার রঙ দেখে মন খুশি, চিনির পরিমাণ জানলে পেট চিন্তিত।" },
  patishapta: { oil: 1, spice: 1, heavy: 1, warning: "ভেতরের ক্ষীর গরম থাকে। সাবধানে কামড় দিন।" },
  kulfi: { oil: 1, spice: 1, heavy: 1, warning: "কুলফি গলার আগে খান, আর বরফটা কোন পানির, একবার ভাবুন।" },
  "hawai-mithai": { oil: 1, spice: 1, heavy: 1, warning: "এটা আসলে মেঘ আর চিনি। মেঘ উড়ে যায়, চিনিটাই থেকে যায়।" },

  // ---------- Drinks ----------
  borhani: { oil: 1, spice: 2, heavy: 1, warning: "বিরিয়ানির পর বোরহানি হজমের বন্ধু। তবে এতে বিরিয়ানির পরিমাণ কমে না।" },
  matha: { oil: 1, spice: 1, heavy: 1, warning: "দুপুরে এক গ্লাস মাঠা মানেই ভাতঘুমের আমন্ত্রণ।" },
  "malai-cha": { oil: 1, spice: 1, heavy: 1, warning: "মালাই চায়ের সর ঠোঁটে লাগবে, চিনি লাগবে মনে। এক কাপেই থামুন।" },
  "cold-coffee": { oil: 1, spice: 1, heavy: 1, warning: "সন্ধ্যার পর কোল্ড কফি খেলে রাতের ঘুম আপনাকে আনফলো করবে।" },
  "akher-rosh": { oil: 1, spice: 1, heavy: 1, warning: "মেশিন আর গ্লাস পরিষ্কার কিনা দেখুন। বরফ ছাড়া নিতে পারলে আরো ভালো।" },
  "daber-pani": { oil: 1, spice: 1, heavy: 1, warning: "এতে কোনো সতর্কতা নাই। এটা প্রকৃতির নিজের এনার্জি ড্রিংক। 🥥" },
  "lebu-shorbot": { oil: 1, spice: 1, heavy: 1, warning: "শরবতের পানি ফোটানো কিনা জিজ্ঞেস করুন। গরমে পেটের সাথে ঝামেলা চলে না।" },
  "fruit-juice": { oil: 1, spice: 1, heavy: 1, warning: "দোকানের জুসে পানি আর বরফ কোথা থেকে? একবার জিজ্ঞেস করলে ক্ষতি নাই।" },
};

/** Fallback for a dish without a note yet. The data test makes sure this isn't needed. */
export const DEFAULT_HEALTH: Health = {
  oil: 2,
  spice: 2,
  heavy: 2,
  warning: "যতটুকু খাবেন ততটুকুই নিন, আর পাশে এক গ্লাস পানি রাখুন।",
};
