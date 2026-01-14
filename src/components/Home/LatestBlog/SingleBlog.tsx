"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PostNode } from "@/types/home-query";

// Helper định dạng ngày tháng
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const SingleBlog = ({ blog }: { blog: PostNode }) => {
  const { title, slug, date, excerpt, featuredImage } = blog;
  const imgUrl = featuredImage?.node?.sourceUrl || "/images/placeholder.png";

  return (
    <div className="group bg-white rounded-lg shadow-1 hover:shadow-2 duration-300 overflow-hidden">
      <Link href={`/blogs/${slug}`} className="relative block h-[240px] w-full overflow-hidden">
        <Image
          src={imgUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-primary px-4 py-1 rounded-full">
          <span className="text-xs font-semibold text-white">
            {formatDate(date)}
          </span>
        </div>
      </Link>

      <div className="p-6 sm:p-8">
        <h3 className="mb-4 text-xl font-bold text-dark hover:text-primary sm:text-2xl line-clamp-2">
          <Link href={`/blogs/${slug}`}>
            {title}
          </Link>
        </h3>
        
        {/* Xử lý excerpt (WP trả về thẻ <p>) */}
        <div 
          className="mb-6 text-base text-body-color line-clamp-3"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        <Link
          href={`/blogs/${slug}`}
          className="inline-block text-base font-medium text-dark hover:text-primary"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default SingleBlog;