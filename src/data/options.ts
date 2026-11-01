// Catalog of every choice the user can make. Labels live here with their ids,
// like rows in a table; UI copy lives in src/content/bn.ts.

export type Option<Id extends string> = {
  id: Id;
  emoji?: string;
  label: string;
  sub?: string;
};

// ---------- Gender ----------
export type GenderId = "male" | "female";
export const GENDERS: Option<GenderId>[] = [
  { id: "male", emoji: "👨", label: "পুরুষ" },
  { id: "female", emoji: "👩", label: "নারী" },
];

// ---------- Age (never used to choose food; see docs/brief.md) ----------
export type AgeId = "u18" | "18-25" | "26-35" | "36-50" | "50+";
export const AGES: Option<AgeId>[] = [
  { id: "u18", emoji: "🧒", label: "১৮-এর কম" },
  { id: "18-25", emoji: "🧑", label: "১৮–২৫" },
  { id: "26-35", emoji: "👩‍💼", label: "২৬–৩৫" },
  { id: "36-50", emoji: "🧔", label: "৩৬–৫০" },
  { id: "50+", emoji: "👴", label: "৫০+" },
];

// ---------- Mood (always self-reported) ----------
export type MoodId =
  | "unsure"
  | "happy"
  | "sad"
  | "normal"
  | "angry"
  | "confused"
  | "anxiety"
  | "depressed"
  | "overthinking"
  | "irritated"
  | "lonely"
  | "stressed"
  | "insecure"
  | "fearful"
  | "guilty"
  | "disappointed"
  | "frustrated"
  | "overwhelmed"
  | "lowenergy"
  | "restless"
  | "calm"
  | "energetic"
  | "bored"
  | "jealous"
  | "heartbroken";

export const MOODS: Option<MoodId>[] = [
  { id: "unsure", emoji: "🤷", label: "জানি না", sub: "Not sure" },
  { id: "happy", emoji: "😄", label: "খুশি", sub: "Happy" },
  { id: "sad", emoji: "😢", label: "মন খারাপ", sub: "Sad" },
  { id: "normal", emoji: "😐", label: "স্বাভাবিক", sub: "Normal" },
  { id: "angry", emoji: "😡", label: "রাগ", sub: "Angry" },
  { id: "confused", emoji: "🤔", label: "কনফিউজড", sub: "Confused" },
  { id: "anxiety", emoji: "😰", label: "দুশ্চিন্তা", sub: "Anxiety" },
  { id: "depressed", emoji: "😞", label: "বিষণ্ণ", sub: "Depressed" },
  { id: "overthinking", emoji: "🌀", label: "মাথায় হাজার চিন্তা", sub: "Overthinking" },
  { id: "irritated", emoji: "😤", label: "বিরক্ত", sub: "Irritated" },
  { id: "lonely", emoji: "🥺", label: "একা একা", sub: "Lonely" },
  { id: "stressed", emoji: "😫", label: "স্ট্রেস", sub: "Stressed" },
  { id: "insecure", emoji: "😟", label: "অনিরাপদ", sub: "Insecure" },
  { id: "fearful", emoji: "😨", label: "ভয় ভয়", sub: "Fearful" },
  { id: "guilty", emoji: "😔", label: "অপরাধবোধ", sub: "Guilty" },
  { id: "disappointed", emoji: "😕", label: "হতাশ", sub: "Disappointed" },
  { id: "frustrated", emoji: "😩", label: "ত্যক্তবিরক্ত", sub: "Frustrated" },
  { id: "overwhelmed", emoji: "🤯", label: "সব গুলিয়ে গেছে", sub: "Overwhelmed" },
  { id: "lowenergy", emoji: "🪫", label: "চার্জ শেষ", sub: "Low energy" },
  { id: "restless", emoji: "😵", label: "অস্থির", sub: "Restless" },
  { id: "calm", emoji: "😌", label: "শান্ত", sub: "Calm" },
  { id: "energetic", emoji: "⚡", label: "ফুল এনার্জি", sub: "Very energetic" },
  { id: "bored", emoji: "🥱", label: "বোরড", sub: "Bored" },
  { id: "jealous", emoji: "😒", label: "হিংসা", sub: "Jealous" },
  { id: "heartbroken", emoji: "💔", label: "ছ্যাঁকা খাওয়া", sub: "Heartbroken" },
];

const ALL_MOOD_IDS = MOODS.map((m) => m.id);

// Mood list shown first for each gender. Anyone can still open the full list.
// The male list is still to be defined (docs/brief.md), so men see every mood for now.
export const MOOD_LIST_BY_GENDER: Record<GenderId, MoodId[]> = {
  female: ALL_MOOD_IDS.filter((id) => id !== "normal"),
  male: ALL_MOOD_IDS,
};

/** "জানি না": no dish is matched to it, so the pick is a surprise among good-value dishes. */
export const UNSURE_MOOD: MoodId = "unsure";

// Moods that show a gentle care note on the result. Self-reported, never a diagnosis.
export const CARE_MOODS: MoodId[] = ["depressed", "anxiety"];

// ---------- Meal time ----------
export type MealId = "breakfast" | "lunch" | "snacks" | "dinner";
export type MealChoice = MealId | "any";
export const MEALS: Option<MealChoice>[] = [
  { id: "breakfast", emoji: "🍳", label: "নাস্তা", sub: "Breakfast" },
  { id: "lunch", emoji: "🍚", label: "দুপুর", sub: "Lunch" },
  { id: "snacks", emoji: "🍟", label: "স্ন্যাকস", sub: "Snacks" },
  { id: "dinner", emoji: "🍗", label: "রাত", sub: "Dinner" },
  { id: "any", emoji: "😋", label: "যেকোনো সময়", sub: "Anytime" },
];
export const MEAL_NAMES: Record<MealChoice, string> = {
  breakfast: "নাস্তা",
  lunch: "দুপুরের খাবার",
  snacks: "স্ন্যাকস",
  dinner: "রাতের খাবার",
  any: "যেকোনো সময়",
};

// ---------- Budget ----------
export type BudgetId = "b100" | "b200" | "b500" | "b1000" | "nolimit";
export const BUDGETS: (Option<BudgetId> & { max: number })[] = [
  { id: "b100", emoji: "🪙", label: "৳১০০-এর কম", sub: "মাসের শেষ", max: 100 },
  { id: "b200", emoji: "💵", label: "৳১০০–২০০", sub: "চলে যাবে", max: 200 },
  { id: "b500", emoji: "💰", label: "৳২০০–৫০০", sub: "আজ একটু ভালো", max: 500 },
  { id: "b1000", emoji: "🤑", label: "৳৫০০–১০০০", sub: "পার্টি মুড", max: 1000 },
  { id: "nolimit", emoji: "👑", label: "টাকা সমস্যা না!", sub: "নবাবি হালচাল", max: Number.POSITIVE_INFINITY },
];

// ---------- Diet ----------
export type DietId = "any" | "veg" | "nonveg";
export const DIETS: Option<DietId>[] = [
  { id: "any", emoji: "🍽️", label: "সবই চলে" },
  { id: "veg", emoji: "🥦", label: "নিরামিষ" },
  { id: "nonveg", emoji: "🍗", label: "আমিষ" },
];

// ---------- Category ----------
export type CategoryId = "biryani" | "home" | "meat" | "street" | "fast" | "sweet" | "drinks";
export const CATEGORIES: Option<CategoryId>[] = [
  { id: "biryani", emoji: "🍛", label: "বিরিয়ানি/পোলাও" },
  { id: "home", emoji: "🏠", label: "ভাত-তরকারি" },
  { id: "meat", emoji: "🍖", label: "মাংসের স্পেশাল" },
  { id: "street", emoji: "🛺", label: "স্ট্রিট ফুড" },
  { id: "fast", emoji: "🍔", label: "ফাস্ট ফুড" },
  { id: "sweet", emoji: "🍮", label: "মিষ্টি" },
  { id: "drinks", emoji: "🥤", label: "পানীয়" },
];

// ---------- Restrictions and allergies (hard rules, never overridden) ----------
export type IngredientId = "beef" | "fish" | "shrimp" | "egg" | "milk" | "nuts";
export const RESTRICTIONS: Option<IngredientId>[] = [
  { id: "beef", emoji: "🚫", label: "বিফ খাই না" },
  { id: "fish", emoji: "🐟", label: "মাছ খাই না" },
  { id: "shrimp", emoji: "🦐", label: "চিংড়িতে অ্যালার্জি" },
  { id: "egg", emoji: "🥚", label: "ডিমে অ্যালার্জি" },
  { id: "milk", emoji: "🥛", label: "দুধে অ্যালার্জি" },
  { id: "nuts", emoji: "🥜", label: "বাদামে অ্যালার্জি" },
];
