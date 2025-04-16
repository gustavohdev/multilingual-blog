import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { revalidateTag } from 'next/cache';
import { getDictionary } from '@/lib/getDictionary';

const CTACard = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);
  const formAction = async (formData: FormData) => {
    'use server';
    try {
      const email = formData.get('email');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/items/subscribers
      `,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      revalidateTag('subscribers-count');
      // await directus.items("subscribers").createOne({
      //     email,
      // })
    } catch (error) {
      console.log(error);
    }
  };

  //   const subscribersCount = await axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/items/subscribers?meta=total_count
  //   `,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
  //           "Content-Type": "application/json",
  //         },
  //         next: {
  //           tags: ["subscribers-count"],
  //         },
  //       }
  //     )
  //     .then((data) => {
  //       //   console.log("MY SUBS", data.data.meta.total_count);
  //       //   //data.meta.total_count;
  //       return data.data.meta.total_count;
  //     })
  //     .catch((err) => console.log(err));

  const subscribersCount = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/subscribers?meta=total_count`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['subscribers-count'], // optional, depending on where you manage revalidation
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers count');
      }
      return response.json();
    })
    .then((data) => {
      return data.meta.total_count;
    })
    .catch((error) => {
      console.error(error);
      return 0; // fallback in case of error
    });

  return (
    <div className="relative px-6 py-10 overflow-hidden rounded-md bg-slate-100">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70"></div>
      <Image
        fill
        alt="CTA Card Image"
        className="object-cover object-center"
        src="https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHwxOHx8RWxlcGhhbnRzJTIwdGhhaWxhbmR8ZW58MHx8fHwxNjcwMzIyNzUx&ixlib=rb-4.0.3"
      />
      {/* Content Container */}
      <div className="relative z-20">
        <div className="text-md font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-3xl font-semibold">
          {dictionary.ctaCard.title}
        </h3>
        <p className="max-w-lg mt-2 text-md">
          {dictionary.ctaCard.description}
        </p>
        {/* Form */}
        <form
          key={subscribersCount + 'subscribers-form'}
          action={formAction}
          className="flex items-center gap-2 mt-6 w-full"
        >
          <input
            type="email"
            name="email"
            placeholder={dictionary.ctaCard.placeholder}
            className="w-full md:w-auto px-3 py-2 text-base rounded-md outline-none placeholder:text-sm bg-white/80 focus:ring-2 ring-neutral-600"
          ></input>
          <button className="px-3 py-2 rounded-md bg-neutral-900 text-neutral-200 whitespace-nowrap">
            {dictionary.ctaCard.button}
          </button>
        </form>

        {/* Subscribers */}
        <div className="mt-5 text-neutral-600">
          {dictionary.ctaCard.subscriberText1}{' '}
          <span className="px-2 py-1 text-sm rounded-md bg-neutral-700 text-neutral-100">
            {subscribersCount}
          </span>{' '}
          {dictionary.ctaCard.subscriberText2}
        </div>
      </div>
    </div>
  );
};

export default CTACard;
