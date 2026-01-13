import { fetchAPI } from "@/lib/fetchAPI";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// 1. Định nghĩa Query (Nên tách ra file riêng nếu dự án lớn)
const GET_POST_QUERY = `
  query GetPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// 2. Hàm lấy dữ liệu bài viết
async function getPost(slug: string) {
  const data = await fetchAPI(GET_POST_QUERY, { variables: { slug } });
  return data.post;
}

// 3. GENERATE METADATA: Đây là nơi Next.js "bắt tay" với SEO WordPress
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) return {};

  return {
    title: post.seo.title || post.title, // Ưu tiên Title SEO của Yoast
    description: post.seo.metaDesc,      // Description chuẩn SEO của Yoast
    openGraph: {
      images: [post.seo.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl],
    },
    // Bạn có thể thêm canonical, robots... từ post.seo vào đây
  };
}

// 4. Render nội dung bài viết
export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // Trả về trang 404 nếu không tìm thấy bài
  }

  return (
    <main className="max-w-[1170px] mx-auto px-4 py-10">
      {/* Hiển thị ảnh đại diện */}
      {post.featuredImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.featuredImage.node.altText || post.title} 
            fill 
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">{new Date(post.date).toLocaleDateString()}</p>

      {/* Render HTML từ WordPress (Cần cẩn thận style) */}
      <div 
        className="prose max-w-none prose-lg" // Dùng Tailwind Typography plugin để đẹp ngay
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </main>
  );
}

// 5. (Tùy chọn) Generate Static Params để build tĩnh HTML cho tốc độ tối đa
export async function generateStaticParams() {
  const GET_SLUGS = `
    query GetSlugs {
      posts(first: 100) {
        nodes {
          slug
        }
      }
    }
  `;
  const data = await fetchAPI(GET_SLUGS);
  
  return data.posts.nodes.map((post: any) => ({
    slug: post.slug,
  }));
}