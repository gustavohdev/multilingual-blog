'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const LangSwitcher = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const targetLanguage = locale === 'en' ? 'de' : 'en';
  console.log(`pathname`, pathname);
  const redirectTarget = () => {
    if (!pathname) {
      return `/`;
    }
    const segments = pathname.split('/');
    segments[1] = targetLanguage;
    return segments.join('/');
  };
  return (
    <Link
      className="font-semibold flex items-center gap-1"
      locale={targetLanguage}
      href={redirectTarget()}
    >
      <span>{targetLanguage === 'en' ? '🇬🇧' : '🇩🇪'}</span>
      {targetLanguage.toUpperCase()}
    </Link>
  );
};
