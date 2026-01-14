import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageFields } from "@/types/home-query";

const PromoBanner = ({ data }: { data: HomePageFields }) => {
  if (!data) return null;

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;