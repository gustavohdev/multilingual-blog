import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Tablet,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { siWhatsapp } from 'simple-icons';

const SocialLink = ({
  plataform,
  link,
  isSharedUrl = false,
}: {
  plataform: string;
  link: string;
  isSharedUrl?: boolean;
}) => {
  const getIcon = (plataform: string) => {
    switch (plataform) {
      case 'facebook':
        return <Facebook size="20" />;
      case 'twitter':
        return <Twitter size="20" />;
      case 'instagram':
        return <Instagram size="20" />;
      case 'youtube':
        return <Youtube size="20" />;
      case 'linkedin':
        return <Linkedin size="20" />;
      case 'github':
        return <Github size="20" />;
      case 'whatsapp':
        return (
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 24 24`}
            width="20"
            height="20"
            fill={''}
          >
            <path d={siWhatsapp.path} />
          </svg>
        );
    }
  };

  return (
    <Link href={link}>
      <div
        className={`${
          isSharedUrl
            ? 'py-2 px-3 bg-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-600 hover:text-neutral-100 duration-100 ease-in-out transition-colors'
            : ''
        }`}
      >
        {getIcon(plataform)}
      </div>
    </Link>
  );
};

export default SocialLink;
