"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroData } from "@/types/home-query"; // Import type vừa tạo

// Nhận data từ props
const Hero = ({ data }: { data: HeroData }) => {
  return (
    <section className="relative overflow-hidden pb-10 pt-20 xl:pb-20 xl:pt-28">
      {/* Thay thế ảnh cứng bằng ảnh từ WordPress */}
      <div className="absolute top-0 left-0 w-full h-full -z-1">
         {data.heroImage && (
             <Image 
               src={data.heroImage.sourceUrl} 
               alt={data.heroImage.altText || "Hero bg"} 
               fill 
               className="object-cover"
               priority
             />
         )}
      </div>

      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex items-center gap-5">
          <div className="w-full lg:w-1/2">
            <h1 className="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl xl:text-heading-1">
              {data.heroTitle} {/* Dữ liệu động */}
            </h1>
            <p className="mb-8 text-base text-body-color sm:text-lg">
              {data.heroSubtitle}
            </p>
            <Link
              href={data.heroButtonLink || "/shop"}
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