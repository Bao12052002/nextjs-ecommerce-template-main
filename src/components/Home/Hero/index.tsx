"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageFields, HeroSmallBanner } from "@/types/home-query";
import HeroFeature from "./HeroFeature";
import HeroCarousel from "./HeroCarousel";

const Hero = ({ data }: { data: HomePageFields }) => {
  if (!data) return null;

  const sliderData = data.heroSlider || [];
  const features = data.featuresList || [];

  // Helper để render banner nhỏ (giảm lặp code)
  const renderSmallBanner = (bannerData: HeroSmallBanner, fallbackImg: string) => {
    // Nếu không có dữ liệu thì không render hoặc render placeholder
    if (!bannerData) return null;

    const imgUrl = bannerData.image?.node?.sourceUrl || fallbackImg;
    const title = bannerData.title || "Product Name";
    const link = bannerData.link || "#";

    return (
      <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5 flex-1 shadow-sm hover:shadow-two transition">
        <div className="flex items-center justify-between gap-4 h-full">
          <div>
            <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-2">
              <Link href={link}>{title}</Link>
            </h2>
            <div>
              <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                {bannerData.subtitle || "Limited Offer"}
              </p>
              <span className="flex items-center gap-3">
                <span className="font-medium text-heading-5 text-red">
                  {bannerData.salePrice}
                </span>
                {bannerData.regularPrice && (
                  <span className="font-medium text-xl text-dark-4 line-through">
                    {bannerData.regularPrice}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="shrink-0 relative w-[100px] h-[130px]">
             <Image
                src={imgUrl}
                alt={title}
                fill
                className="object-contain"
             />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          
          {/* --- CỘT TRÁI (SLIDER) --- */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden h-full">
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />
              <HeroCarousel slides={sliderData} />
            </div>
          </div>

          {/* --- CỘT PHẢI (2 BANNER NHỎ) --- */}
          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5 h-full">
              
              {/* Banner 1 (Trên) */}
              {renderSmallBanner(data.heroRight1, "/images/hero/hero-02.png")}

              {/* Banner 2 (Dưới) */}
              {renderSmallBanner(data.heroRight2, "/images/hero/hero-01.png")}

            </div>
          </div>

        </div>
      </div>

      <HeroFeature features={features} />
    </section>
  );
};

export default Hero;