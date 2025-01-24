import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-lists";
import { Post } from "@/types/collection";
import axios from "axios";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  // return DUMMY_CATEGORIES.map((category) => {
  //   return {
  //     category: category.slug,
  //   };
  // });

  try {
    // @TODO: filter for only published
    const categories = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/items/category`, {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        return data.data.data;
      });

    const params = categories.map((cat: any) => {
      return {
        category: cat.slug as string,
      };
    });

    return params || [];
  } catch (error) {}
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  console.log(params);

  const getCategoryData = async () => {
    // get categories
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/items/category
      `,
        {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // get posts
      const responsePosts = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/items/post
      `,
        {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // filterCategory
      const filterCategory = response.data.data.filter((category: any) => {
        return category.slug === params.category;
      });

      //fillterPosts
      const filterPosts = responsePosts.data.data.filter((item: any) => {
        return item.category === filterCategory[0].id;
      });

      return { filterCategory, filterPosts };
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  };

  const { filterCategory, filterPosts } = await getCategoryData();

  if (!filterCategory) {
    notFound();
  }

  // const typeCorrectedCategory = filterCategory as unknown as {
  //   id: string;
  //   title: string;
  //   description: string;
  //   slug: string;
  //   post: Post[];
  // };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{filterCategory[0].title}</h1>
        <p className="text-lg text-neutral-600">{filterPosts[0].description}</p>
      </div>
      <PostList posts={filterPosts} />
    </PaddingContainer>
  );
};

export default Page;
