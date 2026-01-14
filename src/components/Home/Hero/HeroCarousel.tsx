"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { HeroSlide } from "@/types/home-query";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

const HeroCarousel = ({ slides }: { slides: HeroSlide[] }) => {
  // Nếu không có dữ liệu slide nào thì không render
  if (!slides || slides.length === 0) return null;

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000, // Tăng delay lên một chút cho dễ đọc
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {slides.map((slide, index) => {
        const imgUrl = slide.image?.node?.sourceUrl || "/images/placeholder.png";
        
        return (
          <SwiperSlide key={index}>
            <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
              
              {/* --- Text Content --- */}
              <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
                
                {/* Discount Badge */}
                {(slide.discountPercent || slide.discountLabel) && (
                  <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                    {slide.discountPercent && (
                      <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                        {slide.discountPercent}
                      </span>
                    )}
                    {slide.discountLabel && (
                      <span 
                        className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]"
                        dangerouslySetInnerHTML={{ __html: slide.discountLabel }} // Để render thẻ <br/> nếu có
                      />
                    )}
                  </div>
                )}

                {/* Title */}
                <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                  <Link href={slide.buttonUrl || "#"}>{slide.title}</Link>
                </h1>

                {/* Description */}
                <p>{slide.description}</p>

                {/* Button */}
                <Link
                  href={slide.buttonUrl || "#"}
                  className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
                >
                  {slide.buttonText || "Shop Now"}
                </Link>
              </div>

              {/* --- Image --- */}
              <div className="flex justify-center sm:justify-end flex-1 pr-4 sm:pr-7.5 lg:pr-10">
                <div className="relative w-[300px] h-[300px] sm:w-[351px] sm:h-[358px]">
                    <Image
                    src={imgUrl}
                    alt={slide.title}
                    fill
                    className="object-contain"
                    priority={index === 0} // Ưu tiên load ảnh slide đầu tiên
                    />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroCarousel;