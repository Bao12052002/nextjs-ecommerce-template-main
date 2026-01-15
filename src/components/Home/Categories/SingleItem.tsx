"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryNode } from "@/types/home-query"; // Type danh mục của Home
import { getCategoryLink } from "@/utils/routes"; // Import hàm tạo link

const SingleItem = ({ category }: { category: CategoryNode }) => {
  const { name, slug, image } = category;
  
  // Fallback image nếu chưa set ảnh trong WP
  const imgUrl = image?.sourceUrl || "/images/placeholder.png";
  
  // 👇 Link chuẩn SEO: domain.com/ten-danh-muc
  const categoryUrl = getCategoryLink(slug);

  return (
    <Link
      href={categoryUrl}
      className="group flex flex-col items-center"
    >
      {/* Circle Image Wrapper */}
      <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Image
          src={imgUrl}
          alt={name}
          width={82}
          height={62}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Category Name */}
      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default SingleItem;