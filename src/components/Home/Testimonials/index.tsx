import React from "react";
import SectionTitle from "@/components/Common/SectionTitle";
import { HomePageFields } from "@/types/home-query";
import Image from "next/image";

const Testimonials = ({ data }: { data: HomePageFields }) => {
  const list = data.testimonialsList || [];

  if (list.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-gray-light relative z-10">
      <div className="container">
        <SectionTitle
          title="Our Clients Say"
          paragraph="Hear what our customers have to say about us."
          center
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item, index) => (
            <div key={index} className="p-8 bg-white rounded-lg shadow-one">
              <div className="flex items-center mb-6 border-b border-body-color border-opacity-10 pb-6">
                <div className="relative w-[60px] h-[60px] overflow-hidden rounded-full mr-4">
                  {item.authorImage?.node?.sourceUrl ? (
                    <Image
                      src={item.authorImage.node.sourceUrl}
                      alt={item.authorName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300"></div>
                  )}
                </div>
                <div>
                   <h4 className="text-lg font-semibold text-dark">
                      {item.authorName}
                   </h4>
                   {/* Render sao đánh giá */}
                   <div className="flex text-yellow-500 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < item.rating ? "text-yellow" : "text-gray-300"}>
                           ★
                        </span>
                      ))}
                   </div>
                </div>
              </div>
              <p className="text-base text-body-color">{item.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;