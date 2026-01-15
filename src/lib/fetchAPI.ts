// src/lib/fetchAPI.ts
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
export async function fetchAPI(
  query: string,
  { variables, tags }: { variables?: any; tags?: string[] } = {}
) {
  const headers = { "Content-Type": "application/json" };

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined");
  }

  // Thực hiện gọi API
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { tags }, // Caching của Next.js
  });

  const json = await res.json();

  // 👇 QUAN TRỌNG: Kiểm tra và in lỗi GraphQL nếu có
  if (json.errors) {
    console.error("❌ GraphQL Error:", json.errors);
    // Ném lỗi chi tiết để bạn thấy trên Terminal
    throw new Error(`GraphQL Error: ${json.errors[0]?.message}`); 
  }

  return json.data;
}
export async function getMenuByLocation(location: string = "PRIMARY") {
  const query = `
    query GetMenuByLocation($location: MenuLocationEnum!) {
      menuItems(where: { location: $location, parentId: "0" }) {
        nodes {
          id
          label
          path
          childItems {
            nodes {
              id
              label
              path
            }
          }
        }
      }
    }
  `;

  // Biến location phải viết HOA (VD: PRIMARY, FOOTER, MOBILE)
  const response = await fetchAPI(query, { variables: { location: location.toUpperCase() } });
  
  return response?.menuItems?.nodes || [];
}

// Hàm lấy Logo từ Home Page Fields
export async function getHeaderLogo() {
  const query = `
    query GetHeaderLogo {
      page(id: "/", idType: URI) {
        homePageFields {
          headerLogo {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetchAPI(query);
    return response?.page?.homePageFields?.headerLogo?.node?.sourceUrl || null;
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
}

// 1. Lấy danh sách danh mục (cho Sidebar)
export async function getCategories() {
  const query = `
    query GetCategories {
      productCategories(where: { hideEmpty: true, orderby: COUNT, order: DESC }) {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `;
  const response = await fetchAPI(query);
  return response?.productCategories?.nodes || [];
}

// 2. Lấy sản phẩm (Hỗ trợ lọc theo Category Slug)
export async function getProducts(categorySlug: string | null = null) {
  // Nếu có slug -> lọc theo category, nếu không -> lấy tất cả
  const categoryFilter = categorySlug 
    ? `, where: { category: "${categorySlug}" }` 
    : "";

  const query = `
    query GetProducts {
      products(first: 20 ${categoryFilter}) {
        nodes {
          id
          databaseId
          slug
          name
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            onSale
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            onSale
          }
          averageRating
          reviewCount
        }
      }
    }
  `;

  const response = await fetchAPI(query);
  return response?.products?.nodes || [];
}

export async function getProductBySlug(slug: string) {
  const query = `
    query GetProductBySlug($id: ID!) {
      product(id: $id, idType: SLUG) {
        id
        databaseId
        slug
        name
        description
        shortDescription
        image {
          sourceUrl
        }
        galleryImages {
          nodes {
            sourceUrl
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
        }
      }
    }
  `;

  const response = await fetchAPI(query, { variables: { id: slug } });
  return response?.product;
}