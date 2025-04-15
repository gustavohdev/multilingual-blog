import CTACard from '@/components/elements/cta-card';
import PaddingContainer from '@/components/layout/padding-container';
import PostCard from '@/components/post/post-card';
import PostList from '@/components/post/post-lists';
import { getPostData } from '@/lib/directus';
import { Post } from '@/types/collection';
import { notFound } from 'next/navigation';

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const posts = await getPostData();
  const locale = params.lang;
  if (!posts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={locale} post={posts[0] as Post} />
        <PostList
          locale={locale}
          posts={
            posts?.filter(
              (post: any, index: any) => index > 0 && index < 3
            ) as Post[]
          }
        />
        <CTACard locale={locale} />

        <PostCard locale={locale} post={posts[3] as Post} reverse={true} />
        <PostList
          locale={locale}
          posts={
            posts.filter(
              (post: any, index: any) => index > 3 && index < 6
            ) as Post[]
          }
        />
      </main>
    </PaddingContainer>
  );
}
