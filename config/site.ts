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
    twitter: 'some',
    youtube: 'some',
    github: 'github',
    linkedin: 'some',
    instagram: 'some insta',
    facebook: 'facebook',
  },
};

export default siteConfig;
