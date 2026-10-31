import type { CategoryId, IngredientId, MealId, MoodId } from "@/data/options";

export type Food = {
  id: string;
  name: string; // Bengali
  nameEn: string;
  emoji: string;
  /** Optional real photo. FoodVisual shows it instead of the emoji when present. */
  image?: { src: string; alt: string };
  /** Typical price per person in Dhaka, in taka. */
  price: number;
  meals: MealId[];
  category: CategoryId;
  /** No meat, fish or egg. */
  veg: boolean;
  /**
   * Restricted ingredients the dish usually contains. Required on every dish:
   * an empty list means "checked, none". When a recipe varies, list the
   * ingredient (safe side), since allergy filters must never be wrong.
   */
  contains: IngredientId[];
  /** How well the dish fits each mood, 0–100. Missing moods count as 0. */
  moods: Partial<Record<MoodId, number>>;
};

export const FOODS: Food[] = [
  // ---------- Biryani / polao ----------
  {
    id: "chicken-tehari", name: "চিকেন তেহারি", nameEn: "Chicken Tehari", emoji: "🍛", price: 180,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: [],
    moods: { sad: 80, normal: 70, lonely: 75, disappointed: 70, overthinking: 65, guilty: 60 },
  },
  {
    id: "kacchi", name: "কাচ্চি বিরিয়ানি", nameEn: "Kacchi Biryani", emoji: "🍚", price: 380,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: ["milk"],
    moods: { happy: 95, heartbroken: 85, energetic: 80, jealous: 70, insecure: 65, disappointed: 60 },
  },
  {
    id: "beef-tehari", name: "বিফ তেহারি", nameEn: "Beef Tehari", emoji: "🍛", price: 220,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: ["beef"],
    moods: { frustrated: 75, angry: 70, energetic: 70, stressed: 60 },
  },
  {
    id: "morog-polao", name: "মোরগ পোলাও", nameEn: "Morog Polao", emoji: "🍗", price: 280,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: ["milk"],
    moods: { happy: 85, disappointed: 75, insecure: 70, calm: 60 },
  },
  {
    id: "chicken-biryani", name: "চিকেন বিরিয়ানি", nameEn: "Chicken Biryani", emoji: "🍗", price: 250,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: ["milk"],
    moods: { happy: 75, heartbroken: 70, overwhelmed: 65, bored: 60 },
  },

  // ---------- Home style ----------
  {
    id: "khichuri-dim", name: "খিচুড়ি আর ডিম ভাজা", nameEn: "Khichuri & Fried Egg", emoji: "🍲", price: 110,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["egg"],
    moods: { sad: 90, depressed: 80, lonely: 80, lowenergy: 75, calm: 70 },
  },
  {
    id: "shobji-khichuri", name: "সবজি খিচুড়ি", nameEn: "Vegetable Khichuri", emoji: "🥘", price: 90,
    meals: ["lunch", "dinner"], category: "home", veg: true, contains: [],
    moods: { depressed: 80, calm: 80, anxiety: 75, lowenergy: 75, fearful: 70 },
  },
  {
    id: "bhaat-maach", name: "ভাত আর মাছের ঝোল", nameEn: "Rice & Fish Curry", emoji: "🐟", price: 160,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["fish"],
    moods: { lonely: 85, normal: 80, calm: 75, guilty: 70, fearful: 65 },
  },
  {
    id: "shorshe-ilish", name: "সরষে ইলিশ", nameEn: "Shorshe Ilish", emoji: "🐠", price: 900,
    meals: ["lunch"], category: "home", veg: false, contains: ["fish"],
    moods: { happy: 85, heartbroken: 75, calm: 70 },
  },
  {
    id: "beef-kalabhuna", name: "বিফ কালাভুনা", nameEn: "Beef Kala Bhuna", emoji: "🥩", price: 420,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["beef"],
    moods: { angry: 90, frustrated: 85, energetic: 80 },
  },
  {
    id: "chingri-malaikari", name: "চিংড়ি মালাইকারি", nameEn: "Chingri Malaikari", emoji: "🦐", price: 650,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["shrimp", "milk"],
    moods: { happy: 75, jealous: 75, insecure: 70 },
  },
  {
    id: "bhorta-bhaat", name: "আলু-বেগুন ভর্তা ভাত", nameEn: "Bhorta & Rice", emoji: "🍚", price: 120,
    meals: ["lunch", "dinner"], category: "home", veg: true, contains: [],
    moods: { lonely: 75, normal: 75, calm: 70, guilty: 60 },
  },
  {
    id: "daal-bhaat-dim", name: "ডাল-ভাত-ডিম", nameEn: "Daal, Rice & Egg", emoji: "🍳", price: 90,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["egg"],
    moods: { normal: 85, lowenergy: 70, calm: 65, overwhelmed: 60 },
  },
  {
    id: "murgir-jhol", name: "মুরগির ঝোল আর ভাত", nameEn: "Chicken Curry & Rice", emoji: "🍗", price: 170,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: [],
    moods: { normal: 75, depressed: 70, lonely: 70, sad: 70, fearful: 65 },
  },
  {
    id: "nihari", name: "নেহারি আর নান", nameEn: "Nihari & Naan", emoji: "🍲", price: 300,
    meals: ["breakfast", "dinner"], category: "home", veg: false, contains: ["beef", "milk"],
    moods: { energetic: 75, angry: 70, lowenergy: 70, frustrated: 65 },
  },
  {
    id: "khashir-rezala", name: "খাসির রেজালা", nameEn: "Mutton Rezala", emoji: "🍖", price: 450,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["milk", "nuts"],
    moods: { happy: 75, jealous: 65, insecure: 65, disappointed: 60 },
  },
  {
    id: "panta-ilish", name: "পান্তা ইলিশ", nameEn: "Panta Ilish", emoji: "🐟", price: 250,
    meals: ["breakfast", "lunch"], category: "home", veg: false, contains: ["fish"],
    moods: { happy: 75, calm: 65, lonely: 60 },
  },
  {
    id: "paratha-daal", name: "পরোটা আর ডাল ভাজি", nameEn: "Paratha & Daal", emoji: "🥞", price: 60,
    meals: ["breakfast", "snacks"], category: "home", veg: true, contains: [],
    moods: { normal: 80, calm: 70, lowenergy: 70, confused: 60 },
  },
  {
    id: "paratha-dim", name: "পরোটা আর ডিম ভাজা", nameEn: "Paratha & Fried Egg", emoji: "🍳", price: 70,
    meals: ["breakfast"], category: "home", veg: false, contains: ["egg"],
    moods: { normal: 80, lowenergy: 80, energetic: 65, restless: 60 },
  },
  {
    id: "luchi-alur-dom", name: "লুচি আর আলুর দম", nameEn: "Luchi & Alur Dom", emoji: "🫓", price: 80,
    meals: ["breakfast", "snacks"], category: "home", veg: true, contains: [],
    moods: { happy: 70, calm: 70, lonely: 65, guilty: 60 },
  },
  {
    id: "ruti-shobji", name: "রুটি আর সবজি", nameEn: "Ruti & Vegetables", emoji: "🫓", price: 60,
    meals: ["breakfast", "dinner"], category: "home", veg: true, contains: [],
    moods: { calm: 80, guilty: 80, normal: 70, anxiety: 60 },
  },
  {
    id: "doi-chira", name: "দই-চিড়া", nameEn: "Doi Chira", emoji: "🥣", price: 70,
    meals: ["breakfast", "snacks"], category: "home", veg: true, contains: ["milk"],
    moods: { calm: 75, lowenergy: 65, anxiety: 60 },
  },

  // ---------- Street food ----------
  {
    id: "fuchka", name: "ফুচকা", nameEn: "Fuchka", emoji: "🥟", price: 60,
    meals: ["snacks"], category: "street", veg: false, contains: ["egg"],
    moods: { bored: 90, happy: 80, restless: 80, irritated: 75, jealous: 70 },
  },
  {
    id: "chotpoti", name: "চটপটি", nameEn: "Chotpoti", emoji: "🥣", price: 70,
    meals: ["snacks"], category: "street", veg: false, contains: ["egg"],
    moods: { confused: 80, bored: 75, restless: 70, overthinking: 70 },
  },
  {
    id: "jhalmuri", name: "ঝালমুড়ি", nameEn: "Jhalmuri", emoji: "🥜", price: 30,
    meals: ["snacks"], category: "street", veg: true, contains: ["nuts"],
    moods: { bored: 80, restless: 75, overthinking: 65, normal: 60 },
  },
  {
    id: "cha-singara", name: "চা আর সিঙ্গারা", nameEn: "Tea & Singara", emoji: "☕", price: 40,
    meals: ["snacks", "breakfast"], category: "street", veg: true, contains: ["milk"],
    moods: { overthinking: 85, stressed: 80, confused: 75, anxiety: 70, bored: 65 },
  },
  {
    id: "beguni-piyaju", name: "বেগুনি আর পেঁয়াজু", nameEn: "Beguni & Piyaju", emoji: "🍆", price: 40,
    meals: ["snacks"], category: "street", veg: true, contains: [],
    moods: { bored: 70, sad: 65, restless: 65, lonely: 60 },
  },
  {
    id: "dim-chop", name: "ডিম চপ", nameEn: "Egg Chop", emoji: "🥚", price: 50,
    meals: ["snacks"], category: "street", veg: false, contains: ["egg"],
    moods: { bored: 65, jealous: 60, restless: 60 },
  },
  {
    id: "cha-biscuit", name: "চা আর বিস্কুট", nameEn: "Tea & Biscuits", emoji: "☕", price: 30,
    meals: ["breakfast", "snacks"], category: "street", veg: false, contains: ["milk", "egg"],
    moods: { overthinking: 80, anxiety: 75, lowenergy: 70, stressed: 70 },
  },
  {
    id: "haleem", name: "হালিম", nameEn: "Haleem", emoji: "🥣", price: 150,
    meals: ["snacks", "dinner"], category: "street", veg: false, contains: ["beef"],
    moods: { overthinking: 70, stressed: 70, sad: 65, bored: 60 },
  },
  {
    id: "kebab-paratha", name: "শিক কাবাব আর পরোটা", nameEn: "Seekh Kebab & Paratha", emoji: "🍢", price: 220,
    meals: ["dinner"], category: "street", veg: false, contains: ["beef"],
    moods: { angry: 80, energetic: 75, frustrated: 70 },
  },

  // ---------- Fast food ----------
  {
    id: "chicken-shawarma", name: "চিকেন শর্মা", nameEn: "Chicken Shawarma", emoji: "🌯", price: 180,
    meals: ["snacks", "dinner"], category: "fast", veg: false, contains: ["egg", "milk"],
    moods: { stressed: 70, irritated: 70, energetic: 65, overwhelmed: 60 },
  },
  {
    id: "beef-burger", name: "বিফ বার্গার", nameEn: "Beef Burger", emoji: "🍔", price: 320,
    meals: ["lunch", "dinner", "snacks"], category: "fast", veg: false, contains: ["beef", "milk", "egg"],
    moods: { overwhelmed: 75, stressed: 75, irritated: 70 },
  },
  {
    id: "chicken-burger", name: "চিকেন বার্গার", nameEn: "Chicken Burger", emoji: "🍔", price: 250,
    meals: ["lunch", "dinner", "snacks"], category: "fast", veg: false, contains: ["milk", "egg"],
    moods: { frustrated: 65, bored: 65, jealous: 60 },
  },
  {
    id: "pizza", name: "চিজি পিৎজা", nameEn: "Cheesy Pizza", emoji: "🍕", price: 750,
    meals: ["dinner", "snacks"], category: "fast", veg: false, contains: ["milk"],
    moods: { heartbroken: 85, overwhelmed: 80, happy: 70, stressed: 65 },
  },
  {
    id: "fried-chicken", name: "ফ্রাইড চিকেন", nameEn: "Fried Chicken", emoji: "🍗", price: 300,
    meals: ["lunch", "dinner", "snacks"], category: "fast", veg: false, contains: ["egg", "milk"],
    moods: { heartbroken: 75, frustrated: 70, energetic: 65, insecure: 60 },
  },
  {
    id: "naan-chaap", name: "নান আর চিকেন চাপ", nameEn: "Naan & Chicken Chaap", emoji: "🍢", price: 240,
    meals: ["dinner"], category: "fast", veg: false, contains: ["milk"],
    moods: { energetic: 85, frustrated: 75, angry: 75, overthinking: 60 },
  },
  {
    id: "chowmein", name: "চিকেন চাউমিন", nameEn: "Chicken Chowmein", emoji: "🍜", price: 180,
    meals: ["lunch", "dinner", "snacks"], category: "fast", veg: false, contains: ["egg"],
    moods: { bored: 75, confused: 65, normal: 60, restless: 60 },
  },
  {
    id: "fried-rice", name: "চাইনিজ ফ্রাইড রাইস", nameEn: "Fried Rice", emoji: "🍚", price: 260,
    meals: ["lunch", "dinner"], category: "fast", veg: false, contains: ["egg"],
    moods: { normal: 65, happy: 65, insecure: 60, confused: 60 },
  },
  {
    id: "thai-soup", name: "থাই স্যুপ", nameEn: "Thai Soup", emoji: "🍜", price: 200,
    meals: ["dinner", "snacks"], category: "fast", veg: false, contains: ["egg", "shrimp", "fish"],
    moods: { sad: 75, fearful: 70, lowenergy: 70, anxiety: 65 },
  },

  // ---------- Sweets ----------
  {
    id: "roshogolla", name: "রসগোল্লা", nameEn: "Roshogolla", emoji: "🍮", price: 80,
    meals: ["snacks", "breakfast"], category: "sweet", veg: true, contains: ["milk"],
    moods: { happy: 85, disappointed: 75, guilty: 65, fearful: 60 },
  },
  {
    id: "mishti-doi", name: "মিষ্টি দই", nameEn: "Mishti Doi", emoji: "🍮", price: 100,
    meals: ["snacks", "lunch"], category: "sweet", veg: true, contains: ["milk"],
    moods: { calm: 75, happy: 70, disappointed: 70, heartbroken: 60 },
  },
  {
    id: "ice-cream", name: "আইসক্রিম", nameEn: "Ice Cream", emoji: "🍨", price: 150,
    meals: ["snacks"], category: "sweet", veg: true, contains: ["milk"],
    moods: { heartbroken: 90, angry: 85, irritated: 80, restless: 70, jealous: 60 },
  },
  {
    id: "falooda", name: "ফালুদা", nameEn: "Falooda", emoji: "🍧", price: 220,
    meals: ["snacks"], category: "sweet", veg: true, contains: ["milk", "nuts"],
    moods: { heartbroken: 75, jealous: 70, happy: 70, irritated: 65 },
  },
  {
    id: "pitha", name: "ভাপা পিঠা", nameEn: "Bhapa Pitha", emoji: "🥮", price: 60,
    meals: ["breakfast", "snacks"], category: "sweet", veg: true, contains: ["milk"],
    moods: { lonely: 80, calm: 70, sad: 70, depressed: 65 },
  },
  {
    id: "jilapi", name: "জিলাপি", nameEn: "Jilapi", emoji: "🥨", price: 50,
    meals: ["snacks"], category: "sweet", veg: true, contains: [],
    moods: { sad: 70, restless: 70, bored: 65 },
  },
  {
    id: "lassi", name: "লাচ্ছি", nameEn: "Lassi", emoji: "🥛", price: 80,
    meals: ["snacks", "lunch"], category: "sweet", veg: true, contains: ["milk"],
    moods: { angry: 75, irritated: 75, calm: 60, restless: 60 },
  },
];
