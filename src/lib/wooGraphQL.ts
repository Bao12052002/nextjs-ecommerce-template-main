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

    // 👇 CẬP NHẬT: Lấy cả 2 loại header session phổ biến
    const newSession = res.headers.get("woocommerce-session") || res.headers.get("x-wc-session");
    
    if (newSession && typeof window !== "undefined") {
      // Chỉ lưu nếu session khác null và khác session cũ
      if (newSession !== sessionToken) {
          localStorage.setItem("woo-session", newSession);
      }
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
    // console.log("🔍 GraphQL Error:", errorMsg); // Tạm tắt để đỡ rối log

    const isSessionError = 
      errorMsg.includes("session") || 
      errorMsg.includes("token") || 
      errorMsg.includes("jwt"); 

    if (isSessionError) {
      console.warn("⚠️ Session lỗi từ phía Server. Đang thử reset...");
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("woo-session");
      }

      // Gọi lại API lần 2 (Tạo session mới)
      json = await executeQuery(null);
    }
  }

  // 4. Kiểm tra lỗi cuối cùng
  if (json.errors) {
    console.error("❌ WooGraphQL Final Error:", json.errors);
    
    const finalMsg = json.errors[0]?.message || "";
    const msgLower = finalMsg.toLowerCase();

    if (msgLower.includes("empty") || msgLower.includes("session")) {
        throw new Error("Phiên làm việc đã hết hạn. Giỏ hàng đã được làm mới. Vui lòng thêm lại sản phẩm.");
    }
    
    throw new Error(finalMsg || "Internal Server Error");
  }

  return json.data;
}