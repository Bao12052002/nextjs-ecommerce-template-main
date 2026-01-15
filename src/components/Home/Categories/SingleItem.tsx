"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryNode } from "@/types/home-query";
import { getCategoryLink } from "@/utils/routes";

const SingleItem = ({ category }: { category: CategoryNode }) => {
  const { name, slug, image } = category;
  
  // Dùng ảnh placeholder nếu không có
  const imgUrl = image?.sourceUrl || "/images/logo/logo.png";
  
  // Tạo link danh mục chuẩn: /laptop
  const categoryUrl = getCategoryLink(slug);

  return (
    <Link
      href={categoryUrl}
      className="group flex flex-col items-center"
    >
      {/* Circle Image Container */}
      <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4 relative overflow-hidden shadow-1 group-hover:shadow-md transition-shadow">
        <Image
          src={imgUrl}
          alt={name}
          width={80}
          height={80}
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Category Name with Effect */}
      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default SingleItem;