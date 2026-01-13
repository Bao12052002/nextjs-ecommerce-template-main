const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

export async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // Kiểm tra biến môi trường
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}