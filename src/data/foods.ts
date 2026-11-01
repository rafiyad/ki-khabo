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
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: ["beef"],
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
    meals: ["breakfast", "dinner"], category: "meat", veg: false, contains: ["beef", "milk"],
    moods: { energetic: 75, angry: 70, lowenergy: 70, frustrated: 65 },
  },
  {
    id: "khashir-rezala", name: "খাসির রেজালা", nameEn: "Mutton Rezala", emoji: "🍖", price: 450,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: ["milk", "nuts"],
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
    meals: ["dinner"], category: "meat", veg: false, contains: ["beef"],
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
    meals: ["dinner"], category: "meat", veg: false, contains: ["milk"],
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

  // ---------- Meat specials (নলি, পায়া, মগজ, চাপ, কাবাব) ----------
  {
    id: "nalli-nihari", name: "নলি নিহারি", nameEn: "Nalli Nihari", emoji: "🦴", price: 350,
    meals: ["breakfast", "dinner"], category: "meat", veg: false, contains: ["beef", "milk"],
    moods: { energetic: 85, angry: 75, frustrated: 70, happy: 65 },
  },
  {
    id: "khashir-nalli", name: "খাসির নলি ভুনা", nameEn: "Mutton Nalli Bhuna", emoji: "🦴", price: 420,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: [],
    moods: { happy: 80, energetic: 75, jealous: 70, disappointed: 60 },
  },
  {
    id: "khashir-paya", name: "খাসির পায়া", nameEn: "Mutton Paya", emoji: "🍲", price: 180,
    meals: ["breakfast", "dinner"], category: "meat", veg: false, contains: [],
    moods: { lowenergy: 80, energetic: 70, lonely: 65, calm: 60 },
  },
  {
    id: "gorur-paya", name: "গরুর পায়া", nameEn: "Beef Paya", emoji: "🍲", price: 160,
    meals: ["breakfast", "dinner"], category: "meat", veg: false, contains: ["beef"],
    moods: { energetic: 75, lowenergy: 70, frustrated: 65 },
  },
  {
    id: "mogoj-bhuna", name: "মগজ ভুনা", nameEn: "Brain Masala", emoji: "🧠", price: 250,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: ["beef"],
    moods: { overthinking: 75, confused: 70, stressed: 60 },
  },
  {
    id: "beef-chaap", name: "বিফ চাপ", nameEn: "Beef Chaap", emoji: "🍖", price: 260,
    meals: ["dinner"], category: "meat", veg: false, contains: ["beef", "milk"],
    moods: { angry: 80, energetic: 80, frustrated: 70 },
  },
  {
    id: "khashir-chaap", name: "খাসির চাপ", nameEn: "Mutton Chaap", emoji: "🍖", price: 320,
    meals: ["dinner"], category: "meat", veg: false, contains: ["milk"],
    moods: { happy: 75, energetic: 75, jealous: 65 },
  },
  {
    id: "suti-kabab", name: "সুতি কাবাব", nameEn: "Suti Kabab", emoji: "🍢", price: 300,
    meals: ["dinner", "snacks"], category: "meat", veg: false, contains: ["beef", "milk"],
    moods: { energetic: 70, happy: 70, bored: 65 },
  },
  {
    id: "boti-kabab", name: "বটি কাবাব", nameEn: "Boti Kabab", emoji: "🍢", price: 200,
    meals: ["dinner", "snacks"], category: "meat", veg: false, contains: ["beef", "milk"],
    moods: { energetic: 70, angry: 70, happy: 60 },
  },
  {
    id: "shami-kabab", name: "শামি কাবাব", nameEn: "Shami Kabab", emoji: "🧆", price: 60,
    meals: ["snacks", "dinner"], category: "meat", veg: false, contains: ["beef", "egg"],
    moods: { bored: 65, restless: 60, normal: 60 },
  },
  {
    id: "chicken-tikka", name: "চিকেন টিক্কা", nameEn: "Chicken Tikka", emoji: "🍢", price: 220,
    meals: ["dinner", "snacks"], category: "meat", veg: false, contains: ["milk"],
    moods: { energetic: 70, happy: 65, irritated: 60 },
  },
  {
    id: "tandoori-chicken", name: "তন্দুরি চিকেন", nameEn: "Tandoori Chicken", emoji: "🍗", price: 280,
    meals: ["dinner"], category: "meat", veg: false, contains: ["milk"],
    moods: { happy: 70, energetic: 70, frustrated: 65 },
  },
  {
    id: "grill-chicken", name: "গ্রিল চিকেন আর নান", nameEn: "Grill Chicken & Naan", emoji: "🍗", price: 250,
    meals: ["dinner"], category: "meat", veg: false, contains: ["milk", "egg"],
    moods: { energetic: 75, happy: 65, heartbroken: 65, stressed: 60 },
  },
  {
    id: "chui-jhal-khashi", name: "চুই ঝাল খাসি", nameEn: "Chui Jhal Mutton", emoji: "🌶️", price: 400,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: [],
    moods: { angry: 80, energetic: 80, frustrated: 75, bored: 60 },
  },
  {
    id: "mezbani-gosht", name: "মেজবানি গরুর মাংস", nameEn: "Mezbani Beef", emoji: "🍛", price: 300,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: ["beef"],
    moods: { happy: 85, energetic: 75, lonely: 60 },
  },
  {
    id: "satkora-gosht", name: "সাতকরা গরুর মাংস", nameEn: "Satkora Beef", emoji: "🍛", price: 320,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: ["beef"],
    moods: { energetic: 75, happy: 70, bored: 60 },
  },
  {
    id: "bot-bhuna", name: "বট ভুনা", nameEn: "Tripe Bhuna", emoji: "🍲", price: 180,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: ["beef"],
    moods: { energetic: 65, frustrated: 65, bored: 60 },
  },
  {
    id: "murgir-kolija", name: "মুরগির কলিজা ভুনা", nameEn: "Chicken Liver Bhuna", emoji: "🍲", price: 120,
    meals: ["lunch", "dinner"], category: "meat", veg: false, contains: [],
    moods: { lowenergy: 65, normal: 60, bored: 60 },
  },

  // ---------- More biryani / polao ----------
  {
    id: "khashir-biryani", name: "খাসির বিরিয়ানি", nameEn: "Mutton Biryani", emoji: "🍛", price: 320,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: ["milk"],
    moods: { happy: 85, heartbroken: 75, jealous: 65 },
  },
  {
    id: "ilish-polao", name: "ইলিশ পোলাও", nameEn: "Ilish Polao", emoji: "🐟", price: 450,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: ["fish", "milk"],
    moods: { happy: 75, calm: 65, disappointed: 60 },
  },
  {
    id: "polao-roast", name: "পোলাও আর মুরগির রোস্ট", nameEn: "Polao & Chicken Roast", emoji: "🍗", price: 350,
    meals: ["lunch", "dinner"], category: "biryani", veg: false, contains: ["milk", "nuts"],
    moods: { happy: 85, disappointed: 65, lonely: 65 },
  },

  // ---------- More home style ----------
  {
    id: "bhuna-khichuri", name: "ভুনা খিচুড়ি আর গরুর মাংস", nameEn: "Bhuna Khichuri & Beef", emoji: "🍛", price: 220,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["beef"],
    moods: { sad: 80, lonely: 75, heartbroken: 70 },
  },
  {
    id: "khichuri-ilish", name: "খিচুড়ি আর ইলিশ ভাজা", nameEn: "Khichuri & Fried Ilish", emoji: "🍲", price: 400,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["fish"],
    moods: { happy: 80, sad: 70, calm: 65, lonely: 65 },
  },
  {
    id: "hasher-mangsho", name: "হাঁসের মাংস আর চালের রুটি", nameEn: "Duck Curry & Rice Ruti", emoji: "🦆", price: 280,
    meals: ["breakfast", "lunch", "dinner"], category: "home", veg: false, contains: [],
    moods: { happy: 75, lonely: 70, calm: 60 },
  },
  {
    id: "gorur-bhuna", name: "গরুর মাংস ভুনা আর ভাত", nameEn: "Beef Bhuna & Rice", emoji: "🥩", price: 220,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["beef"],
    moods: { energetic: 75, angry: 70, happy: 65, frustrated: 65 },
  },
  {
    id: "shutki-bhaat", name: "শুঁটকি ভর্তা আর ভাত", nameEn: "Shutki Bhorta & Rice", emoji: "🐟", price: 130,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["fish"],
    moods: { lonely: 70, normal: 65, bored: 60 },
  },
  {
    id: "lal-shak-daal", name: "লাল শাক, ডাল আর ভাত", nameEn: "Red Spinach, Daal & Rice", emoji: "🥬", price: 80,
    meals: ["lunch", "dinner"], category: "home", veg: true, contains: [],
    moods: { calm: 75, guilty: 75, normal: 70, anxiety: 60 },
  },
  {
    id: "pabda-jhol", name: "পাবদা মাছের ঝোল", nameEn: "Pabda Fish Curry", emoji: "🐟", price: 220,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["fish"],
    moods: { calm: 75, lonely: 75, normal: 65 },
  },
  {
    id: "rui-bhuna", name: "রুই মাছ ভুনা", nameEn: "Rui Fish Bhuna", emoji: "🐟", price: 200,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["fish"],
    moods: { normal: 75, calm: 65, guilty: 60 },
  },
  {
    id: "loitta-fry", name: "লইট্টা ফ্রাই", nameEn: "Loitta Fry", emoji: "🐟", price: 180,
    meals: ["lunch", "dinner", "snacks"], category: "home", veg: false, contains: ["fish"],
    moods: { bored: 65, happy: 65, restless: 60 },
  },
  {
    id: "kachki-chorchori", name: "কাচকি মাছের চচ্চড়ি", nameEn: "Kachki Fish Chorchori", emoji: "🐟", price: 140,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["fish"],
    moods: { lonely: 70, normal: 70, calm: 60 },
  },
  {
    id: "dim-bhuna", name: "ডিম ভুনা আর ভাত", nameEn: "Egg Bhuna & Rice", emoji: "🥚", price: 90,
    meals: ["lunch", "dinner"], category: "home", veg: false, contains: ["egg"],
    moods: { normal: 75, lowenergy: 70, lonely: 60, overwhelmed: 60 },
  },
  {
    id: "kalai-ruti", name: "কালাই রুটি আর বেগুন ভর্তা", nameEn: "Kalai Ruti & Begun Bhorta", emoji: "🫓", price: 80,
    meals: ["breakfast", "dinner"], category: "home", veg: true, contains: [],
    moods: { normal: 70, calm: 70, lonely: 65 },
  },

  // ---------- More street food ----------
  {
    id: "velpuri", name: "ভেলপুরি", nameEn: "Velpuri", emoji: "🥗", price: 50,
    meals: ["snacks"], category: "street", veg: false, contains: ["egg"],
    moods: { bored: 80, restless: 70, happy: 65 },
  },
  {
    id: "doi-fuchka", name: "দই ফুচকা", nameEn: "Doi Fuchka", emoji: "🥟", price: 80,
    meals: ["snacks"], category: "street", veg: false, contains: ["egg", "milk"],
    moods: { happy: 75, bored: 75, jealous: 65 },
  },
  {
    id: "ghugni", name: "ঘুগনি", nameEn: "Ghugni", emoji: "🫘", price: 30,
    meals: ["snacks", "breakfast"], category: "street", veg: true, contains: [],
    moods: { lonely: 65, normal: 65, calm: 60, bored: 60 },
  },
  {
    id: "alur-chop", name: "আলুর চপ", nameEn: "Alur Chop", emoji: "🥔", price: 20,
    meals: ["snacks"], category: "street", veg: true, contains: [],
    moods: { bored: 70, sad: 65, restless: 60 },
  },
  {
    id: "shobji-somucha", name: "সবজি সমুচা", nameEn: "Vegetable Somucha", emoji: "🥟", price: 20,
    meals: ["snacks"], category: "street", veg: true, contains: [],
    moods: { overthinking: 70, bored: 65, stressed: 60 },
  },
  {
    id: "dal-puri", name: "ডালপুরি", nameEn: "Dal Puri", emoji: "🫓", price: 30,
    meals: ["breakfast", "snacks"], category: "street", veg: true, contains: [],
    moods: { normal: 70, bored: 65, lowenergy: 60, lonely: 60 },
  },
  {
    id: "moglai-paratha", name: "মোগলাই পরোটা", nameEn: "Moglai Paratha", emoji: "🫓", price: 120,
    meals: ["snacks", "dinner"], category: "street", veg: false, contains: ["egg", "beef"],
    moods: { happy: 70, bored: 70, frustrated: 65 },
  },
  {
    id: "chicken-roll", name: "চিকেন রোল", nameEn: "Chicken Roll", emoji: "🌯", price: 100,
    meals: ["snacks", "dinner"], category: "street", veg: false, contains: ["egg"],
    moods: { restless: 65, bored: 65, irritated: 60 },
  },
  {
    id: "chitoi-pitha", name: "চিতই পিঠা আর শুঁটকি ভর্তা", nameEn: "Chitoi Pitha & Shutki Bhorta", emoji: "🥞", price: 40,
    meals: ["breakfast", "snacks"], category: "street", veg: false, contains: ["fish"],
    moods: { lonely: 75, calm: 70, sad: 65 },
  },
  {
    id: "bakorkhani", name: "বাকরখানি", nameEn: "Bakorkhani", emoji: "🥯", price: 30,
    meals: ["breakfast", "snacks"], category: "street", veg: true, contains: ["milk"],
    moods: { calm: 70, overthinking: 65, lonely: 60 },
  },
  {
    id: "badam-bhaja", name: "বাদাম ভাজা", nameEn: "Roasted Peanuts", emoji: "🥜", price: 20,
    meals: ["snacks"], category: "street", veg: true, contains: ["nuts"],
    moods: { bored: 75, overthinking: 70, calm: 60, lonely: 60 },
  },
  {
    id: "fol-makha", name: "ফল মাখা (আমড়া-পেয়ারা)", nameEn: "Spiced Fruit Mix", emoji: "🍈", price: 30,
    meals: ["snacks"], category: "street", veg: true, contains: [],
    moods: { bored: 70, irritated: 65, restless: 65, jealous: 60 },
  },
  {
    id: "bhutta-pora", name: "ভুট্টা পোড়া", nameEn: "Roasted Corn", emoji: "🌽", price: 30,
    meals: ["snacks"], category: "street", veg: true, contains: [],
    moods: { calm: 70, lonely: 65, bored: 65, sad: 60 },
  },

  // ---------- More fast food ----------
  {
    id: "momo", name: "চিকেন মোমো", nameEn: "Chicken Momo", emoji: "🥟", price: 150,
    meals: ["snacks", "dinner"], category: "fast", veg: false, contains: [],
    moods: { bored: 70, calm: 65, happy: 65, restless: 60 },
  },
  {
    id: "pasta", name: "হোয়াইট সস পাস্তা", nameEn: "White Sauce Pasta", emoji: "🍝", price: 300,
    meals: ["lunch", "dinner"], category: "fast", veg: false, contains: ["milk"],
    moods: { heartbroken: 70, overwhelmed: 65, bored: 60 },
  },
  {
    id: "club-sandwich", name: "ক্লাব স্যান্ডউইচ", nameEn: "Club Sandwich", emoji: "🥪", price: 220,
    meals: ["snacks", "lunch"], category: "fast", veg: false, contains: ["egg", "milk"],
    moods: { normal: 60, stressed: 60, overwhelmed: 60 },
  },
  {
    id: "chicken-wings", name: "নাগা চিকেন উইংস", nameEn: "Naga Chicken Wings", emoji: "🍗", price: 280,
    meals: ["snacks", "dinner"], category: "fast", veg: false, contains: [],
    moods: { angry: 80, frustrated: 75, energetic: 70 },
  },
  {
    id: "french-fries", name: "ফ্রেঞ্চ ফ্রাই", nameEn: "French Fries", emoji: "🍟", price: 120,
    meals: ["snacks"], category: "fast", veg: true, contains: [],
    moods: { bored: 75, sad: 65, restless: 60, irritated: 60 },
  },
  {
    id: "packet-noodles", name: "প্যাকেটের নুডলস", nameEn: "Instant Noodles", emoji: "🍜", price: 40,
    meals: ["snacks", "dinner"], category: "fast", veg: false, contains: ["egg"],
    moods: { lowenergy: 75, lonely: 70, overwhelmed: 65 },
  },
  {
    id: "chicken-patties", name: "চিকেন পেটিস", nameEn: "Chicken Patties", emoji: "🥐", price: 40,
    meals: ["breakfast", "snacks"], category: "fast", veg: false, contains: ["egg", "milk"],
    moods: { bored: 60, normal: 60, lowenergy: 60 },
  },

  // ---------- More sweets and pitha ----------
  {
    id: "chomchom", name: "চমচম", nameEn: "Chomchom", emoji: "🍡", price: 60,
    meals: ["snacks"], category: "sweet", veg: true, contains: ["milk"],
    moods: { happy: 80, disappointed: 65, guilty: 60 },
  },
  {
    id: "kalojam", name: "কালোজাম", nameEn: "Kalojam", emoji: "🍡", price: 50,
    meals: ["snacks"], category: "sweet", veg: false, contains: ["milk", "egg"],
    moods: { happy: 70, sad: 65, guilty: 60 },
  },
  {
    id: "shondesh", name: "সন্দেশ", nameEn: "Shondesh", emoji: "🍥", price: 50,
    meals: ["snacks"], category: "sweet", veg: true, contains: ["milk"],
    moods: { happy: 75, calm: 60, disappointed: 60 },
  },
  {
    id: "payesh", name: "পায়েস", nameEn: "Payesh", emoji: "🍚", price: 80,
    meals: ["snacks", "lunch"], category: "sweet", veg: true, contains: ["milk", "nuts"],
    moods: { calm: 75, lonely: 75, happy: 70 },
  },
  {
    id: "firni", name: "ফিরনি", nameEn: "Firni", emoji: "🍮", price: 60,
    meals: ["snacks"], category: "sweet", veg: true, contains: ["milk", "nuts"],
    moods: { calm: 70, happy: 65, heartbroken: 60 },
  },
  {
    id: "zarda", name: "জর্দা", nameEn: "Zarda", emoji: "🍚", price: 80,
    meals: ["snacks", "lunch"], category: "sweet", veg: true, contains: ["milk", "nuts"],
    moods: { happy: 75, disappointed: 60, guilty: 60 },
  },
  {
    id: "patishapta", name: "পাটিসাপটা পিঠা", nameEn: "Patishapta Pitha", emoji: "🥞", price: 40,
    meals: ["breakfast", "snacks"], category: "sweet", veg: true, contains: ["milk"],
    moods: { lonely: 70, calm: 70, sad: 60 },
  },
  {
    id: "kulfi", name: "কুলফি মালাই", nameEn: "Kulfi Malai", emoji: "🍦", price: 40,
    meals: ["snacks"], category: "sweet", veg: true, contains: ["milk", "nuts"],
    moods: { heartbroken: 70, irritated: 70, restless: 60 },
  },
  {
    id: "hawai-mithai", name: "হাওয়াই মিঠাই", nameEn: "Cotton Candy", emoji: "🍭", price: 20,
    meals: ["snacks"], category: "sweet", veg: true, contains: [],
    moods: { happy: 70, bored: 70, sad: 60 },
  },

  // ---------- Drinks ----------
  {
    id: "borhani", name: "বোরহানি", nameEn: "Borhani", emoji: "🥛", price: 60,
    meals: ["snacks"], category: "drinks", veg: true, contains: ["milk"],
    moods: { angry: 70, calm: 70, irritated: 70 },
  },
  {
    id: "matha", name: "মাঠা", nameEn: "Matha", emoji: "🥛", price: 40,
    meals: ["snacks"], category: "drinks", veg: true, contains: ["milk"],
    moods: { calm: 70, irritated: 65, angry: 60 },
  },
  {
    id: "malai-cha", name: "মালাই চা", nameEn: "Malai Cha", emoji: "☕", price: 40,
    meals: ["breakfast", "snacks"], category: "drinks", veg: true, contains: ["milk"],
    moods: { overthinking: 80, stressed: 75, lonely: 65 },
  },
  {
    id: "cold-coffee", name: "কোল্ড কফি", nameEn: "Cold Coffee", emoji: "🧋", price: 180,
    meals: ["snacks"], category: "drinks", veg: true, contains: ["milk"],
    moods: { stressed: 70, lowenergy: 70, bored: 65, energetic: 60 },
  },
  {
    id: "akher-rosh", name: "আখের রস", nameEn: "Sugarcane Juice", emoji: "🎋", price: 30,
    meals: ["snacks"], category: "drinks", veg: true, contains: [],
    moods: { lowenergy: 75, irritated: 70, restless: 65 },
  },
  {
    id: "daber-pani", name: "ডাবের পানি", nameEn: "Coconut Water", emoji: "🥥", price: 80,
    meals: ["snacks"], category: "drinks", veg: true, contains: [],
    moods: { calm: 80, lowenergy: 75, anxiety: 65, stressed: 60 },
  },
  {
    id: "lebu-shorbot", name: "লেবুর শরবত", nameEn: "Lemon Sherbet", emoji: "🍋", price: 20,
    meals: ["snacks"], category: "drinks", veg: true, contains: [],
    moods: { irritated: 75, angry: 70, restless: 65, lowenergy: 60 },
  },
  {
    id: "fruit-juice", name: "মৌসুমি ফলের জুস", nameEn: "Seasonal Fruit Juice", emoji: "🧃", price: 100,
    meals: ["breakfast", "snacks"], category: "drinks", veg: true, contains: [],
    moods: { happy: 70, lowenergy: 65, calm: 60 },
  },
];
