// src/lib/wooGraphQL.ts
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function wooGraphQL(
  query: string,
  variables: any = {}
) {
  const headers: Record<string, string> = { 
    "Content-Type": "application/json" 
  };

  if (!API_URL) throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is missing");

  // --- Hàm con thực hiện gọi API ---
  const executeQuery = async (sessionToken: string | null) => {
    const currentHeaders = { ...headers };
    if (sessionToken) {
      currentHeaders["woocommerce-session"] = sessionToken;
    }

    const res = await fetch(API_URL!, {
      method: "POST",
      headers: currentHeaders,
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    // Luôn cập nhật Session mới nếu Server trả về
    const newSession = res.headers.get("woocommerce-session");
    if (newSession && typeof window !== "undefined") {
      localStorage.setItem("woo-session", newSession);
    }

    return await res.json();
  };

  // 1. Lấy Session hiện tại
  let session = typeof window !== "undefined" ? localStorage.getItem("woo-session") : null;

  // 2. Gọi lần đầu tiên
  let json = await executeQuery(session);

  // 3. Xử lý lỗi Session (Token hỏng/hết hạn)
  if (json.errors) {
    const isSessionError = json.errors.some((err: any) => 
      err.message.includes("decode session token") || 
      err.message.includes("session has expired")
    );

    if (isSessionError) {
      console.warn("⚠️ Session lỗi hoặc hết hạn. Đang reset session...");
      
      // Xóa session hỏng
      if (typeof window !== "undefined") {
        localStorage.removeItem("woo-session");
      }

      // 👇 QUAN TRỌNG: Gọi lại API lần 2 không kèm Session cũ để lấy Session mới
      json = await executeQuery(null);
    }
  }

  // 4. Kiểm tra lỗi cuối cùng (nếu vẫn còn lỗi khác thì mới throw)
  if (json.errors) {
    console.error("❌ WooGraphQL Error:", json.errors);
    throw new Error(json.errors[0]?.message || "Internal Server Error");
  }

  return json.data;
}