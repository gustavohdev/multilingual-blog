import CTACard from '@/components/elements/cta-card';
import SocialLink from '@/components/elements/social-link';
import PaddingContainer from '@/components/layout/padding-container';
import PostBody from '@/components/post/post-body';
import PostHero from '@/components/post/post-hero';
import { getPostData } from '@/lib/directus';
import { Post } from '@/types/collection';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const posts = await getPostData();
  const params = posts.map((post) => {
    return {
      slug: post.slug as string,
    };
  });

  return params || [];
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  const post = (await getPostData(params.slug))[0] as Post;
  const locale = params.lang;

  if (!post) {
    notFound();
  }
  return (
    <PaddingContainer>
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}
        <PostHero locale={locale} post={post} />
        {/* Post body and Social Share */}
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="relative">
            <div className="sticky top-20 flex gap-5 md:flex-col items-center">
              <div className="font-medium md:hidden">Share this content:</div>
              <SocialLink
                isSharedUrl
                plataform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=
                                ${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              {/* have to use the link for twitter share */}
              <SocialLink
                isSharedUrl
                plataform="twitter"
                link={`https://twitter.com/intent/tweet?url=
                                ${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              {/* have to use the link for linkedin share */}
              <SocialLink
                isSharedUrl
                plataform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=
                                ${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              {/* have to use the link for whatts app share */}
              <SocialLink
                isSharedUrl
                plataform="whatsapp"
                link={`https://api.whatsapp.com/send?text=
                                ${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        <CTACard locale={locale} />
      </div>
    </PaddingContainer>
  );
};

export default Page;
