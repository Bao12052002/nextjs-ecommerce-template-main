// src/components/Home/Hero/index.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageFields } from "@/types/home-query";
import HeroFeature from "./HeroFeature"; // Đảm bảo bạn đã có file này

const Hero = ({ data }: { data: HomePageFields }) => {
  if (!data) return null;

  // Lấy dữ liệu ảnh từ WordPress (WP trả về node)
  const heroImgNode = data.heroImage?.node;
  const heroImgUrl = heroImgNode?.sourceUrl;
  const heroImgAlt = heroImgNode?.altText || data.heroTitle || "Hero Banner";

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          
          {/* =========================================
              CỘT TRÁI (LỚN): Dữ liệu Động từ WordPress 
             ========================================= */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden h-full flex items-center">
              
              {/* Background Shapes */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              {/* Nội dung Banner Chính (Thay thế cho HeroCarousel cũ) */}
              <div className="flex flex-col sm:flex-row items-center justify-between w-full p-6 sm:p-10">
                
                {/* Text Content */}
                <div className="w-full sm:w-1/2 mb-8 sm:mb-0 z-10">
                  <h1 className="mb-4 text-2xl font-bold text-dark sm:text-3xl lg:text-4xl xl:text-[42px] leading-tight">
                    {data.heroTitle || "Tiêu đề Banner từ WP"}
                  </h1>
                  <p className="mb-8 text-base text-body-color">
                    {data.heroSubtitle || "Mô tả ngắn của banner..."}
                  </p>
                  <Link
                    href={data.heroButtonUrl || "/shop"}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-sm font-medium text-white hover:bg-opacity-90 transition"
                  >
                    {data.heroButtonText || "Shop Now"}
                  </Link>
                </div>

                {/* Hero Image */}
                <div className="w-full sm:w-1/2 flex justify-center sm:justify-end z-10">
                  <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]">
                     {heroImgUrl ? (
                        <Image
                          src={heroImgUrl}
                          alt={heroImgAlt}
                          fill
                          className="object-contain"
                          priority
                        />
                     ) : (
                        // Placeholder nếu chưa có ảnh
                        <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                           No Image
                        </div>
                     )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =========================================
              CỘT PHẢI (NHỎ): Banner Tĩnh (Giữ nguyên gốc)
             ========================================= */}
          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5 h-full">
              
              {/* Box 1: iPhone */}
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5 flex-1 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between gap-4 h-full">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-2">
                      <a href="#"> iPhone 14 Plus & 14 Pro Max </a>
                    </h2>
                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-xl text-dark-4 line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Image
                      src="/images/hero/hero-02.png"
                      alt="mobile image"
                      width={100}
                      height={130}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Box 2: Headphone */}
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5 flex-1 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between gap-4 h-full">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-2">
                      <a href="#"> Wireless Headphone </a>
                    </h2>
                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          $699
                        </span>
                        <span className="font-medium text-xl text-dark-4 line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Image
                      src="/images/hero/hero-01.png"
                      alt="headphone image"
                      width={100}
                      height={130}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Hero Features (Icon bên dưới) */}
      {/* Cần truyền data.featuresList vào đây nếu component này hỗ trợ props */}
      <HeroFeature /> 
    </section>
  );
};

export default Hero;