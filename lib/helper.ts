import readingTime from 'reading-time';
import { DateTime } from 'luxon';
import { getDictionary } from './getDictionary';

export const getReadingTime = async (text: string, locale: string) => {
  const dictionary = await getDictionary(locale);
  const minutes = readingTime(text).minutes;
  // Floor to 1 decimal place
  const minutesRounded = Math.round(minutes);
  // with i18next or next intl, use {t} to get the translation
  const key = minutesRounded === 1 ? 'readTime_one' : 'readTime_other';
  const template = dictionary.post?.[key] ?? '';
  return template.replace('{{count}}', minutesRounded.toString());
};

const supportedLocales = ['en', 'de']; // expand this as needed

export const getRelativeDate = (date: string, locale: string) => {
  const safeLocale = supportedLocales.includes(locale) ? locale : 'en';

  return DateTime.fromISO(date).setLocale(safeLocale).toRelative();
};
