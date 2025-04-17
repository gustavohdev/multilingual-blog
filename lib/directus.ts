import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';
import { cache } from 'react';

export const getPostData = cache(
  async ({ postSlug, locale }: { postSlug?: string; locale: string }) => {
    try {
      const client = getClient();

      const post = await client.request(
        readItems('post', {
          filter: {
            status: {
              _eq: 'draft',
            },
            slug: {
              _eq: postSlug,
            },
          },
          fields: [
            '*',
            'author.id',
            'author.first_name',
            'author.last_name',
            'category.id',
            'category.title',
            'category.translations.*',
            'translations.*',
          ],
        })
      );

      if (locale == 'en') {
        return post;
      } else {
        const localisedPosts = post.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
            },
          };
        });
        return localisedPosts;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching post: ');
    }
  }
);

export const getClient = cache(() => {
  return createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
    .with(staticToken(process.env.ADMIN_TOKEN as string))
    .with(rest());
});
