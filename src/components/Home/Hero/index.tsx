// src/components/Home/Hero/index.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageFields } from "@/types/home-query";

const Hero = ({ data }: { data: HomePageFields }) => {
  if (!data) return null;

  // SỬA LẠI LOGIC: Lấy từ .node
  const heroImgUrl = data.heroImage?.node?.sourceUrl;
  const heroImgAlt = data.heroImage?.node?.altText || "Hero Banner";

  return (
    <section className="relative overflow-hidden pb-10 pt-20 xl:pb-20 xl:pt-28">
      <div className="absolute top-0 left-0 w-full h-full -z-1">
         {heroImgUrl ? (
             <Image 
               src={heroImgUrl} 
               alt={heroImgAlt} 
               fill 
               className="object-cover"
               priority
             />
         ) : (
             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image Data</span>
             </div>
         )}
      </div>

      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex items-center gap-5">
          <div className="w-full lg:w-1/2">
            <h1 className="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl xl:text-heading-1">
              {data.heroTitle}
            </h1>
            <p className="mb-8 text-base text-body-color sm:text-lg">
              {data.heroSubtitle}
            </p>
            <Link
              href={data.heroButtonUrl || "/shop"}
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
            >
              {data.heroButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;