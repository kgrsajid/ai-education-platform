export const LanguagesConst = {
  EN: "en",
  RU: "ru",
  KZ: "kz",
} as const;

export type LanguagesEnum = typeof LanguagesConst[keyof typeof LanguagesConst];