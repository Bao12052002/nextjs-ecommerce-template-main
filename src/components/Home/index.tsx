"use client";
import React from "react";
import Hero from "./Hero";
import NewArrivals from "./NewArrivals";
import { HomePageData } from "@/types/home-query";

// Home component giờ đây chỉ là người vận chuyển dữ liệu (Container)
const Home = ({ data }: { data: HomePageData }) => {
  return (
    <main>
      {/* Truyền dữ liệu ACF vào Hero */}
      <Hero data={data.page.homePageFields} />
      
      {/* Truyền dữ liệu Products vào NewArrivals */}
      {/* Lưu ý: Bạn cần sửa cả NewArrivals tương tự như Hero nhé */}
      <NewArrivals products={data.products.nodes} />
      
      {/* Các phần khác làm tương tự... */}
    </main>
  );
};

export default Home;