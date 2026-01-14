"use client";
import React from "react";
import SectionTitle from "@/components/Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import { PostNode } from "@/types/home-query";

const LatestBlog = ({ posts }: { posts: PostNode[] }) => {
  if (!posts || posts.length === 0) return null;

  return (
    
    <section className="overflow-hidden py-10 lg:py-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <SectionTitle
          title="Latest News"
          paragraph="Stay updated with our latest trends and news."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((blog) => (
            <SingleBlog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;