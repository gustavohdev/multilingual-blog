import PaddingContainer from '@/components/layout/padding-container';
import PostList from '@/components/post/post-lists';
import { getClient } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  try {
    const client = getClient();

    const categories = await client.request(
      readItems('category', {
        filter: {
          status: {
            _eq: 'draft',
          },
        },
        fields: ['slug'],
      })
    );

    if (!categories) {
      return [];
    }

    const params = categories.map((cat: any) => {
      return {
        category: cat.slug as string,
        lang: 'en',
      };
    });

    /* with mulltiple languages we would map through all locales and in other places as well */
    const localisedParams = categories.map((cat: any) => {
      return {
        category: cat.slug as string,
        lang: 'de',
      };
    });

    const allParams = params.concat(localisedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching categories');
  }
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const locale = params.lang;
  const getCategoryData = async () => {
    try {
      const client = getClient();

      const category = await client.request(
        readItems('category', {
          filter: {
            status: {
              _eq: 'draft',
            },
            slug: {
              _eq: params.category,
            },
          },
          fields: [
            '*',
            'translations.*',
            'posts.*',
            'posts.author.id',
            'posts.author.first_name',
            'posts.author.last_name',
            'posts.category.id',
            'posts.category.title',
            'posts.translations.*',
          ],
        })
      );

      console.log('category data', category);

      if (locale === 'en') {
        return category;
      } else {
        const localisedCategory = [
          {
            ...category[0],
            title: category[0].translations[0]?.title,
            description: category[0].translations[0]?.description,
            posts: category[0].posts.map((post: any) => {
              return {
                ...post,
                title: post.translations[0]?.title,
                description: post.translations[0]?.description,
                body: post.translations[0]?.body,
                category: {
                  ...post.category,
                  title: category[0].translations[0]?.title,
                },
              };
            }),
          },
        ];
        return localisedCategory;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching post ');
    }
  };

  const category = await getCategoryData();

  if (!category) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{category[0]?.title}</h1>
        <p className="text-lg text-neutral-600">{category[0]?.description}</p>
      </div>
      <PostList locale={locale} posts={category[0]?.posts} />
    </PaddingContainer>
  );
};
export default Page;
