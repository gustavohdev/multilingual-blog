export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: 'Explorer',
  description:
    'A minimal and lovely travel blog which shares experiences and cities around the world"',
  currentlyAt: 'Budapest',
  socialLinks: {
    twitter: 'https://x.com/',
    youtube: 'https://www.youtube.com/',
    github: 'https://github.com/gustavohdev',
    linkedin: 'https://www.linkedin.com/in/ghsdevs/',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },
};

export default siteConfig;
