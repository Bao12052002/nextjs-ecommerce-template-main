"use client";
import React from "react";
import Image from "next/image";
import { TestimonialItem } from "@/types/home-query"; // Import Type chuẩn từ file types

const SingleItem = ({ testimonial }: { testimonial: TestimonialItem }) => {
  // Xử lý dữ liệu an toàn
  const name = testimonial.authorName || "Customer";
  const review = testimonial.reviewText;
  const rating = testimonial.rating || 5;
  const imgUrl = testimonial.authorImage?.node?.sourceUrl || "/images/users/user-01.jpg"; // Ảnh mặc định nếu thiếu

  return (
    <div className="shadow-testimonial bg-white rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1">
      
      {/* --- RATING --- */}
      <div className="flex items-center gap-1 mb-5">
        {/* Render số lượng sao dựa trên rating từ Admin */}
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={15}
            height={15}
            // Nếu index < rating thì hiển thị (hoặc có thể thêm logic làm mờ nếu muốn)
            className={index < rating ? "" : "opacity-30 grayscale"} 
          />
        ))}
      </div>

      {/* --- REVIEW TEXT --- */}
      <p className="text-dark mb-6 min-h-[80px] line-clamp-4">
        {review}
      </p>

      {/* --- AUTHOR INFO --- */}
      <div className="flex items-center gap-4">
        <div className="w-12.5 h-12.5 rounded-full overflow-hidden relative">
          <Image
            src={imgUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="font-medium text-dark">{name}</h3>
          {/* Nếu bạn muốn thêm Role/Chức vụ, cần thêm trường này vào ACF */}
          <p className="text-custom-sm text-body-color">Verified Customer</p>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;