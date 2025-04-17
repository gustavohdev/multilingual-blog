'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { createDirectus, rest } from '@directus/sdk';
import { getDictionary } from '@/lib/getDictionary';

const CTACard = ({ locale }: { locale: string }) => {
  const [dictionary, setDictionary] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [isHandling, setIsHandling] = useState(false);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };

    fetchDictionary();
  }, [locale]);

  const submithandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsHandling(true);
      const client = createDirectus(
        process.env.NEXT_PUBLIC_API_URL as string
      ).with(rest());

      /* Don't send anything */
      // await client.request(createItem('subscribers ', { email }));

      setIsHandling(false);
      setEmail('');
    } catch (error) {
      console.log(error);
      setIsHandling(false);
    }
  };
  if (!dictionary) return null;
  return (
    <div className="relative px-6 py-10 overflow-hidden rounded-md bg-slate-100">
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70"></div>
      <Image
        priority
        fill
        alt="CTA Card Image"
        className="object-cover object-center"
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/f0dcf9e5-f440-4b27-9613-c1801be37f24?key=optimised`}
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
          onSubmit={submithandler}
          className="flex items-center gap-2 mt-6 w-full"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dictionary.ctaCard.placeholder}
            className="w-full md:w-auto px-3 py-2 text-base rounded-md outline-none placeholder:text-sm bg-white/80 focus:ring-2 ring-neutral-600"
          ></input>
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-neutral-900 text-neutral-200 whitespace-nowrap"
          >
            {!isHandling
              ? dictionary.ctaCard.button
              : dictionary.ctaCard.button_loading}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CTACard;
