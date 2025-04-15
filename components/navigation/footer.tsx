import PaddingContainer from '../layout/padding-container';
import siteConfig from '@/config/site';
import Link from 'next/link';
import SocialLink from '../elements/social-link';
import { getDictionary } from '@/lib/getDictionary';

const Footer = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className="py-6 border-t mt-10">
      {/* Title and Description */}
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="max-w-md mt-2 text-lg text-neutral-700">
            {dictionary.footer.description}
          </p>
        </div>
        {/* Socially and Currently At */}
        <div className="flex flex-wrap justify-around gap-4 mt-6">
          <div>
            <div className="font-medium">#exploretheworld</div>
            <div className="flex items-center gap-3 mt-2 text-neutral-600">
              <SocialLink
                plataform="twitter"
                link={siteConfig.socialLinks.twitter}
              />
              <SocialLink
                plataform="instagram"
                link={siteConfig.socialLinks.instagram}
              />
              <SocialLink
                plataform="github"
                link={siteConfig.socialLinks.github}
              />
              <SocialLink
                plataform="youtube"
                link={siteConfig.socialLinks.youtube}
              />
              <SocialLink
                plataform="linkedin"
                link={siteConfig.socialLinks.linkedin}
              />
              <SocialLink
                plataform="facebook"
                link={siteConfig.socialLinks.facebook}
              />
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">
              {dictionary.footer.currentlyAtText}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-md">
              <div className="bg-emerald-600 rounded-full w-2 h-2" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="py-3 border-t flex flex-wrap items-center gap-4 justify-between mt-16">
          <div className="text-sm text-neutral-400">
            {dictionary.footer.rightsText} {new Date().getFullYear()}
          </div>
          <div>
            {dictionary.footer.creatorText}{' '}
            <Link
              className="underline underline-offset-4"
              href="https://gustavoavide.com"
            >
              @gus
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
