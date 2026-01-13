// src/app/(site)/page.tsx
import React from "react";
import Home from "@/components/Home";
import { fetchAPI } from "@/lib/fetchAPI";
import type { Metadata } from "next";

// --- 1. QUERY GRAPHQL ĐÃ SỬA (nodes -> node) ---
const GET_HOME_DATA = `
  query GetHomeData {
    page(id: "home", idType: URI) {
      seo {
        title
        description
        openGraph {
          image {
            url
          }
        }
      }
      homePageFields {
        heroTitle
        heroSubtitle
        heroButtonText
        heroButtonUrl
        
        # SỬA: Đổi 'nodes' thành 'node'
        heroImage {
          node {
            sourceUrl
            altText
          }
        }
        
        featuresList {
          title
          description
          iconImage {
             node {
               sourceUrl
               altText
             }
          }
        }
        
        promoTitle
        promoSubtitle
        promoButtonText
        promoLink
        promoImage {
           node {
             sourceUrl
             altText
           }
        }
        
        testimonialsList {
          authorName
          reviewText
          rating
          authorImage {
             node {
               sourceUrl
               altText
             }
          }
        }
        
        newArrivalsTitle
        bestSellersTitle
      }
    }
    
    newArrivals: products(first: 8, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        name
        slug
        onSale
        averageRating
        reviewCount
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
    bestSellers: products(first: 4, where: { orderby: { field: TOTAL_SALES, order: DESC } }) {
      nodes {
        id
        name
        slug
        onSale
        averageRating
        reviewCount
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;

// --- 2. HÀM FETCH ---
async function getHomeData() {
  try {
    const data = await fetchAPI(GET_HOME_DATA, { 
      // 👇 Gắn thẻ 'home' cho trang chủ
      tags: ['home'] 
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching home data:", error);
    return null;
  }
}

// --- 3. METADATA ---
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  return {
    title: data?.page?.seo?.title || "NextCommerce Homepage",
    description: data?.page?.seo?.description,
  };
}

// --- 4. COMPONENT CHÍNH ---
export default async function HomePage() {
  const data = await getHomeData();

  // DEBUG LOG
  console.log("------------------------------------------------");
  if (data?.page?.homePageFields?.heroImage) {
      // Sửa log này để xem đúng cấu trúc node
      console.log("✅ Hero Image Data:", JSON.stringify(data.page.homePageFields.heroImage, null, 2));
  } else {
      console.log("❌ Hero Image: NULL - Có thể do chưa nhập liệu trong WP");
  }
  console.log("------------------------------------------------");

  if (!data) {
    return <div className="text-center py-20">Lỗi kết nối. Kiểm tra Terminal.</div>;
  }

  return (
    <>
      <Home data={data} />
    </>
  );
}