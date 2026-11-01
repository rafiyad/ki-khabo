// Short dish label for tight spaces (wheel segments, battle title): the first word,
// or two when the first only says whose meat it is ("খাসির পায়া", not just "খাসির").

const GENERIC_FIRST = new Set(["খাসির", "গরুর", "মুরগির", "বিফ", "চিকেন", "হাঁসের", "সবজি", "মাছের"]);

export function shortName(name: string): string {
  const words = name.split(" ");
  return GENERIC_FIRST.has(words[0]) && words.length > 1 ? `${words[0]} ${words[1]}` : words[0];
}
