import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CTACard from "@/components/elements/cta-card";
import SocialLink from "@/components/elements/social-link";
import PaddingContainer from "@/components/layout/padding-container";
import PostBody from "@/components/post/post-body";
import PostHero from "@/components/post/post-hero";
import axios from "axios";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  // return DUMMY_POSTS.map((post) => {
  //     return {
  //         slug: post.slug
  //     }
  // })

  const posts = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/items/post`, {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      return data.data.data;
    });

  const params = posts.map((post: any) => {
    return {
      slug: post.slug as string,
    };
  });

  console.log("myparams", params);

  return params || [];
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  // const post = DUMMY_POSTS.find((post) => {
  //   return post.slug === params.slug;
  // });

  const getPostData = async () => {
    try {
      const posts = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/items/post/`, {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
        .then((data) => {
          const filteredPost = data.data.data.filter((item: any) => {
            return item.slug === params.slug;
          });
          console.log("SLUG PARAMS", params.slug);
          console.log("filteredPost", filteredPost);

          return filteredPost;
        });

      return posts;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching post: ");
    }
  };

  const post = await getPostData();

  console.log("MYPOSTS,", post);

  if (!post) {
    notFound();
  }
  return (
    <PaddingContainer>
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}
        <PostHero post={post[0]} />
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
          <PostBody body={post[0].body} />
        </div>
        <CTACard />
      </div>
    </PaddingContainer>
  );
};

export default Page;
