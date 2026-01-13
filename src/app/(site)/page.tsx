import Home from "@/components/Home";
import { fetchAPI } from "@/lib/fetchAPI";
import type { Metadata } from "next";

// Định nghĩa Query GraphQL
const GET_HOME_DATA = `
  query GetHomeData {
    page(id: "home", idType: URI) {
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
      homePageFields {
        heroTitle
        heroSubtitle
        heroButtonText
        heroButtonUrl
        heroImage {
          sourceUrl
          altText
        }
        featuresList {
          title
          description
          iconImage {
            sourceUrl
            altText
          }
        }
        promoTitle
        promoSubtitle
        promoButtonText
        promoLink
        promoImage {
          sourceUrl
          altText
        }
        testimonialsList {
          authorName
          reviewText
          rating
          authorImage {
            sourceUrl
            altText
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

// Hàm lấy dữ liệu
async function getHomeData() {
  try {
    const data = await fetchAPI(GET_HOME_DATA);
    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
}

// Generate Metadata cho SEO
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  return {
    title: data?.page?.seo?.title || "NextCommerce Homepage",
    description: data?.page?.seo?.metaDesc,
  };
}

// Component chính (Default Export bắt buộc phải có)
export default async function HomePage() {
  const data = await getHomeData();

  // Kiểm tra nếu không có dữ liệu để tránh lỗi render
  if (!data) {
    return <div className="py-20 text-center">Failed to load data. Please check WordPress connection.</div>;
  }

  return (
    <>
      <Home data={data} />
    </>
  );
}