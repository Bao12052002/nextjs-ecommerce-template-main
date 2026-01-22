// src/components/Checkout/index.tsx
"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { selectCartItems, selectTotalPrice, removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { wooGraphQL } from "@/lib/wooGraphQL";
import { CHECKOUT_MUTATION } from "@/lib/mutations";
import { formatVND } from "@/utils/formatCurrency";
import { initialAddress, CheckoutInput } from "@/types/checkout";

// Import các component con
import Billing from "./Billing";
import PaymentMethod from "./PaymentMethod";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Lấy dữ liệu giỏ hàng từ Redux
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectTotalPrice);

  // State quản lý Form
  const [billing, setBilling] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Mặc định COD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Xử lý khi người dùng nhập liệu
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý Đặt hàng
  const handlePlaceOrder = async () => {
    // 1. Validate: Thêm kiểm tra Email
    if (!billing.firstName || !billing.phone || !billing.address1 || !billing.email) {
      setError("Vui lòng điền đầy đủ: Họ tên, Địa chỉ, Số điện thoại và Email (*)");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 2. Chuẩn bị dữ liệu (Data Cleaning)
      // Mẹo: Nếu state trống, lấy tạm city điền vào để không bị lỗi thiếu trường bắt buộc của Woo
      const safeBilling = {
        ...billing,
        state: billing.state || billing.city || "VN-SG", 
        overwrite: true // 👇 Quan trọng: Ép buộc ghi dữ liệu vào đơn hàng
      };

      const input: CheckoutInput = {
        clientMutationId: Math.random().toString(36).substring(7),
        billing: safeBilling,
        shipping: safeBilling, // Copy Billing sang Shipping
        shipToDifferentAddress: false,
        paymentMethod: paymentMethod,
        customerNote: "",
      };

      // 👇 Debug: Log dữ liệu gửi đi để kiểm tra (F12 Console)
      console.log("📤 Sending Checkout Input:", input);

      // 3. Gọi API
      const data = await wooGraphQL(CHECKOUT_MUTATION, { input });

      if (data.checkout?.result === "success") {
        // Thành công -> Xóa giỏ hàng & Chuyển trang
        dispatch(removeAllItemsFromCart());
        if (typeof window !== "undefined") localStorage.removeItem("woo-session");
        
        // router.push(`/order-received/${data.checkout.order.orderNumber}`);
        router.push("/mail-success");
      }

    } catch (err: any) {
      console.error("Checkout Error:", err);
      setError(err.message || "Có lỗi xảy ra khi thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <div className="container py-20 text-center">Giỏ hàng trống</div>;
  }

  return (
    <section className="py-20 bg-gray-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* CỘT TRÁI: THÔNG TIN KHÁCH HÀNG */}
          <div className="lg:w-2/3">
            <Billing billing={billing} onChange={handleBillingChange} />
          </div>

          {/* CỘT PHẢI: ĐƠN HÀNG & THANH TOÁN */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Đơn hàng của bạn</h3>
              
              {/* List sản phẩm tóm tắt */}
              <div className="space-y-3 mb-4 border-b pb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title} <span className="text-gray-500">x {item.quantity}</span></span>
                    <span className="font-medium">{formatVND((item.discountedPrice || item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div className="flex justify-between font-bold text-lg mb-6 text-blue">
                <span>Tổng cộng</span>
                <span>{formatVND(cartTotal)}</span>
              </div>

              {/* Chọn phương thức thanh toán */}
              <PaymentMethod selected={paymentMethod} onSelect={setPaymentMethod} />

              {/* Thông báo lỗi */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {/* Nút Đặt hàng */}
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