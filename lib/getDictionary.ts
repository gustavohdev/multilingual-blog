type Locale = 'en' | 'de';

const dictionaries = {
  en: () =>
    import('./../dictionaries/en.json').then((module) => module.default),
  de: () =>
    import('./../dictionaries/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const fallbackLocale: Locale = 'en';
  const selectedLocale = (
    locale in dictionaries ? locale : fallbackLocale
  ) as Locale;

  return dictionaries[selectedLocale]();
};
