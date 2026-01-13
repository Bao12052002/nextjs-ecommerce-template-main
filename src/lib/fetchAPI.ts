// src/lib/fetchAPI.ts
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!API_URL) {
  throw new Error('Vui lòng khai báo NEXT_PUBLIC_WORDPRESS_API_URL trong file .env');
}

export async function fetchAPI(
  query: string,
  { variables, tags }: { variables?: any; tags?: string[] } = {}
) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { 
      // 👇 Quan trọng: Gắn tags vào đây
      tags: tags, 
      revalidate: 60 // Vẫn giữ 60s làm phương án dự phòng (Hybrid)
    }, 
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}