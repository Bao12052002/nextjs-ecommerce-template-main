// src/components/Home/PromoBanner/index.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageFields } from "@/types/home-query";

const PromoBanner = ({ data }: { data: HomePageFields }) => {
  if (!data) return null;

<<<<<<< HEAD
  const imgUrl = data.promoImage?.node?.sourceUrl;
  const imgAlt = data.promoImage?.node?.altText || "Promo";

  return (
    <section className="relative py-20 overflow-hidden bg-primary">
       {/* Background Image logic nếu cần, hoặc chia 2 cột */}
      <div className="container">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 lg:mb-0">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                {data.promoTitle}
              </h2>
              <p className="mb-8 text-base text-white opacity-80">
                {data.promoSubtitle}
              </p>
              <Link
                href={data.promoLink || "#"}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-dark bg-white rounded-md hover:bg-opacity-90 transition"
              >
                {data.promoButtonText}
              </Link>
            </div>
          </div>
          
          <div className="w-full px-4 lg:w-1/2">
             {/* Hiển thị ảnh Promo */}
             {imgUrl && (
               <div className="relative mx-auto aspect-[500/300] w-full max-w-[500px]">
                 <Image
                   src={imgUrl}
                   alt={imgAlt}
                   fill
                   className="object-cover rounded-lg"
                 />
               </div>
             )}
=======
  // Helper lấy ảnh an toàn
  const getImg = (field: any) => field?.node?.sourceUrl;

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        
        {/* */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">
              {data.promoSubtitle}
            </span>

            <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              {data.promoTitle}
            </h2>

            <p>{data.promoDescription}</p>

            <Link
              href={data.promoLink || "#"}
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              {data.promoButtonText || "Buy Now"}
            </Link>
          </div>

          {getImg(data.promoImage) && (
            <div className="absolute bottom-0 right-4 lg:right-26 -z-1 w-[274px] h-[350px]">
                <Image
                src={getImg(data.promoImage)}
                alt={data.promoTitle}
                fill
                className="object-contain"
                />
            </div>
          )}
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          
          {/* */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10 min-h-[300px]">
            {getImg(data.promoS1Image) && (
                <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1 w-[200px] h-[200px]">
                    <Image
                    src={getImg(data.promoS1Image)}
                    alt={data.promoS1Title}
                    fill
                    className="object-contain"
                    />
                </div>
            )}

            <div className="text-right ml-auto max-w-[50%]">
              <span className="block text-lg text-dark mb-1.5">
                {data.promoS1Subtitle}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                {data.promoS1Title}
              </h2>

              <p className="font-semibold text-custom-1 text-teal">
                {data.promoS1Discount}
              </p>

              <Link
                href={data.promoS1Link || "#"}
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                {data.promoS1BtnText || "Grab Now"}
              </Link>
            </div>
          </div>

          {/* */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10 min-h-[300px]">
             {getImg(data.promoS2Image) && (
                <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1 w-[200px] h-[200px]">
                    <Image
                    src={getImg(data.promoS2Image)}
                    alt={data.promoS2Title}
                    fill
                    className="object-contain"
                    />
                </div>
            )}

            <div className="max-w-[60%]">
              <span className="block text-lg text-dark mb-1.5">
                {data.promoS2Subtitle}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                {data.promoS2Title}
              </h2>

              <p className="max-w-[285px] text-custom-sm">
                {data.promoS2Description}
              </p>

              <Link
                href={data.promoS2Link || "#"}
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
              >
                {data.promoS2BtnText || "Buy Now"}
              </Link>
            </div>
>>>>>>> 5f17d927f34972e0b8b65f30622c21488c344c29
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;