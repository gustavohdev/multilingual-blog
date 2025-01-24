import { DUMMY_POSTS as posts } from "@/DUMMY_DATA";
import CTACard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import {
  auth,
  authentication,
  createDirectus,
  customEndpoint,
  readItems,
  rest,
  staticToken,
  withToken,
} from "@directus/sdk";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  console.log("params", params);
  const getAllPosts = async () => {
    try {
      const posts = [] as any;

      // const client = createDirectus(process.env.NEXT_PUBLIC_API_URL as string).with(staticToken(process.env.ADMIN_TOKEN as string)).with(rest());
      // const token = await client.getToken();
      // console.log("MYTOKEN", token)
      // console.log("API URL", process.env.NEXT_PUBLIC_API_URL)

      //const response = await client.request()

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/items/post
      `,
        {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // const request = await client.request(
      //   withToken(token as string, readItems('collection'))
      // );

      //console.log("request", request)
      //   const posts = await directus.items("posts").readByQuery({
      // })

      // await directus.login("admin@admin.com.br","tuyy364uez4bsjo1ysb6hpp0v9kno7uq")

      // const posts = await directus.request(readItems('posts', {
      //   fields:[
      //     "*",
      //     "author.id",
      //     "author.",
      //     "author",
      //     "category.id",
      //     "category.title",
      //   ]

      // }))

      // const posts = await directus.request(
      //   readItems('posts', {
      //     fields: [
      //       '*',
      //       { author: ['id'] },
      //       { category: ['id', 'title'] }
      //     ]
      //   })
      // );

      // const posts = directus.with(rest()).request(readItems('posts', {
      //     fields:[
      //       "*",
      //       "author.id",
      //       "author.",
      //       "author",
      //       "category.id",
      //       "category.title",
      //     ]

      //   }))

      // const client = createDirectus('http://directus.example.com').with(rest());
      // const posts = await client.request(
      //   withToken(process.env.ADMIN_TOKEN as string, readItems('posts'))
      // );

      // client.request(customEndpoint({path: "", method: "GET", headers:[auth:{
      // }]})

      return response.data.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0]} />
        <PostList
          posts={posts.filter(
            (post: any, index: any) => index > 0 && index < 3
          )}
        />
        <CTACard />
        <PostCard post={posts[3]} reverse={true} />
        <PostList
          posts={posts.filter(
            (post: any, index: any) => index > 3 && index < 6
          )}
        />
      </main>
    </PaddingContainer>
  );
}
