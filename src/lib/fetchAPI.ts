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