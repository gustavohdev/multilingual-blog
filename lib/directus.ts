import { Post } from '@/types/collection';
import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';
import { cache } from 'react';

export const getPostData = cache(async (postSlug?: string) => {
  try {
    const client = createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
      .with(staticToken(process.env.ADMIN_TOKEN as string))
      .with(rest());

    const post = (await client.request(
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
        ],
      })
    )) as Post[];

    return post;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching post: ');
  }
});
