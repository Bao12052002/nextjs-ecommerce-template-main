"use client";
import React from "react";
import Image from "next/image";
import { FeatureItem } from "@/types/home-query";

// Nhận props 'features' từ component cha (Hero) truyền xuống
const HeroFeature = ({ features }: { features: FeatureItem[] }) => {
  
  // Nếu chưa có dữ liệu từ ACF, ẩn section này đi
  if (!features || features.length === 0) return null;

  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
        
        {/* Lặp qua danh sách features thật từ WordPress */}
        {features.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            {/* Render icon động từ WP */}
            {item.iconImage?.node?.sourceUrl && (
              <Image 
                src={item.iconImage.node.sourceUrl} 
                alt={item.title} 
                width={40} 
                height={41} 
              />
            )}

            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default HeroFeature;