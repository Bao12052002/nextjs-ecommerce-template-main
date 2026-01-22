// src/components/Checkout/index.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { selectCartItems, selectTotalPrice, removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { wooGraphQL } from "@/lib/wooGraphQL";
import { CHECKOUT_MUTATION, ADD_TO_CART_MUTATION } from "@/lib/mutations"; 
import { formatVND } from "@/utils/formatCurrency";
import { initialAddress, CheckoutInput } from "@/types/checkout";

import Billing from "./Billing";
import PaymentMethod from "./PaymentMethod";
import toast from "react-hot-toast"; 

// 👇 1. KHAI BÁO HÀM DELAY Ở ĐÂY (NGOÀI COMPONENT ĐỂ KHÔNG BỊ LỖI)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectTotalPrice);

  const [isMounted, setIsMounted] = useState(false);
  const [billing, setBilling] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  // --- HÀM ĐỒNG BỘ GIỎ HÀNG ---
  const syncCartToServer = async () => {
    console.log("🔄 --- BẮT ĐẦU ĐỒNG BỘ GIỎ HÀNG ---");
    console.log("🛒 Danh sách sản phẩm trong Redux:", cartItems);

    if (typeof window !== "undefined") localStorage.removeItem("woo-session");

    for (const item of cartItems) {
      try {
        const payload = { productId: item.id, quantity: item.quantity };
        console.log(`📤 Đang gửi món lên Server: "${item.title}"`, payload);

        await wooGraphQL(ADD_TO_CART_MUTATION, payload);
        
        console.log(`✅ Server đã nhận: "${item.title}"`);
      } catch (e) {
        console.error(`❌ Lỗi gửi món: "${item.title}"`, e);
      }
    }
    
    // 👇 2. ĐÃ CÓ HÀM DELAY NÊN DÒNG NÀY SẼ CHẠY NGON LÀNH
    console.log("⏳ Đang chờ Server xử lý dữ liệu (2s)...");
    await delay(2000); 

    console.log("✅ --- ĐỒNG BỘ HOÀN TẤT ---");
  };

  const handlePlaceOrder = async () => {
    if (!billing.firstName || !billing.phone || !billing.address1 || !billing.email) {
      setError("Vui lòng điền đầy đủ: Họ tên, Địa chỉ, SĐT và Email (*)");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const safeBilling = {
        ...billing,
        state: billing.state || billing.city || "VN-SG", 
        overwrite: true 
      };

      const input: CheckoutInput = {
        clientMutationId: Math.random().toString(36).substring(7),
        billing: safeBilling,
        shipping: safeBilling,
        shipToDifferentAddress: false,
        paymentMethod: paymentMethod,
        customerNote: "",
      };

      console.log("🚀 Gửi lệnh Checkout lần 1:", input);

      let data;
      try {
         data = await wooGraphQL(CHECKOUT_MUTATION, { input });
      } catch (err: any) {
         console.warn("⚠️ Checkout lần 1 thất bại:", err.message);
         
         const errMsg = err.message.toLowerCase();
         const isSessionError = 
            errMsg.includes("session") || 
            errMsg.includes("empty") || 
            errMsg.includes("expired") ||
            errMsg.includes("phiên làm việc");

         if (isSessionError) {
             toast.loading("Đang đồng bộ lại giỏ hàng...", { id: 'restore-cart' });
             
             // Chạy đồng bộ lại (Có delay bên trong)
             await syncCartToServer();
             
             toast.dismiss('restore-cart');
             console.log("🚀 Thử Checkout lần 2...");
             
             const retryData = await wooGraphQL(CHECKOUT_MUTATION, { input });
             data = retryData; 
         } else {
             throw err;
         }
      }

      if (data?.checkout?.result === "success") {
        console.log("📦 Đơn hàng thành công:", data.checkout.order);
        dispatch(removeAllItemsFromCart());
        if (typeof window !== "undefined") localStorage.removeItem("woo-session");
        router.push("/mail-success");
      } else {
        throw new Error("Không thể tạo đơn hàng. Vui lòng thử lại.");
      }

    } catch (err: any) {
      console.error("Checkout Final Error:", err);
      if (err.message.includes("Phiên làm việc")) {
         setError("Đang kết nối lại với máy chủ. Vui lòng bấm Đặt hàng lại lần nữa.");
      } else {
         setError(err.message || "Có lỗi xảy ra khi thanh toán.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return <div className="container py-20 text-center">Loading...</div>;

  if (cartItems.length === 0) {
    return <div className="container py-20 text-center">Giỏ hàng trống</div>;
  }

  return (
    <section className="py-20 bg-gray-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-2/3">
            <Billing billing={billing} onChange={handleBillingChange} />
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Đơn hàng của bạn</h3>
              
              <div className="space-y-3 mb-4 border-b pb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title} <span className="text-gray-500">x {item.quantity}</span></span>
                    <span className="font-medium">{formatVND((item.discountedPrice || item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-lg mb-6 text-blue">
                <span>Tổng cộng</span>
                <span>{formatVND(cartTotal)}</span>
              </div>

              <PaymentMethod selected={paymentMethod} onSelect={setPaymentMethod} />

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`w-full py-3 rounded text-white font-medium transition
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue hover:bg-blue-dark"}`}
              >
                {loading ? "Đang xử lý..." : "Đặt hàng ngay"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;