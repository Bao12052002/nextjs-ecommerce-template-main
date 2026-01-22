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

  // --- Hàm thực thi truy vấn ---
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
      credentials: "omit", 
    });

    const newSession = res.headers.get("woocommerce-session");
    if (newSession && typeof window !== "undefined") {
      localStorage.setItem("woo-session", newSession);
    }

    return await res.json();
  };

  // 1. Lấy Session hiện tại
  let session = typeof window !== "undefined" ? localStorage.getItem("woo-session") : null;

  // 2. Gọi lần đầu
  let json = await executeQuery(session);

  // 3. Xử lý lỗi Session
  if (json.errors) {
    const errorMsg = json.errors[0]?.message?.toLowerCase() || "";
    console.log("🔍 GraphQL Error:", errorMsg);

    const isSessionError = 
      errorMsg.includes("session") || 
      errorMsg.includes("token") || 
      errorMsg.includes("jwt"); 

    if (isSessionError) {
      console.warn("⚠️ Session lỗi. Resetting...");
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("woo-session");
      }

      // Gọi lại API lần 2
      json = await executeQuery(null);
    }
  }

  // 4. Kiểm tra lỗi cuối cùng (QUAN TRỌNG: Cập nhật phần này)
  if (json.errors) {
    console.error("❌ WooGraphQL Final Error:", json.errors);
    
    const finalMsg = json.errors[0]?.message || "";
    const msgLower = finalMsg.toLowerCase();

    // 👇 SỬA LỖI: Nếu vẫn báo lỗi Session hoặc Empty Cart sau khi retry
    // Nghĩa là session cũ đã chết, cần báo khách hàng biết để mua lại từ đầu.
    if (msgLower.includes("empty") || msgLower.includes("session")) {
        throw new Error("Phiên làm việc đã hết hạn. Giỏ hàng đã được làm mới. Vui lòng thêm lại sản phẩm.");
    }
    
    throw new Error(finalMsg || "Internal Server Error");
  }

  return json.data;
}