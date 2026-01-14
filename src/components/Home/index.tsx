// src/components/Home/index.tsx
"use client";
import React from "react";
import Hero from "./Hero";
import Features from "./Hero/HeroFeature";
import Categories from "./Categories";
import NewArrivals from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import Testimonials from "./Testimonials";
import { HomePageData } from "@/types/home-query";

const Home = ({ data }: { data: HomePageData }) => {
  // Check an toàn cấp cao nhất
  if (!data || !data.page) return null;

  const { homePageFields } = data.page;

  return (
    <main>
      {/* 1. Hero Section */}
      <Hero data={homePageFields} />

      {/* 2. Features (Icon dưới banner) */}
      {/* Cần tạo component Features nhận props data */}
      {/* <Features data={homePageFields.featuresList} /> */}

      {/* 3. Categories (Tạm thời giữ nguyên hoặc sửa sau) */}
      <Categories categories={data.productCategories?.nodes || []} />
      {/* 4. New Arrivals (FIX LỖI NODES Ở ĐÂY) */}
      <NewArrivals 
        products={data.newArrivals?.nodes || []} // 👈 Thêm dấu ? và || []
      />

      {/* 5. Promo Banner */}
      <PromoBanner data={homePageFields} />

      {/* 6. Best Sellers (FIX LỖI NODES Ở ĐÂY) */}
      <BestSeller 
        products={data.bestSellers?.nodes || []} // 👈 Thêm dấu ? và || []
      />

      {/* 7. Testimonials */}
      <Testimonials data={homePageFields} />
    </main>
  );
};

export default Home;