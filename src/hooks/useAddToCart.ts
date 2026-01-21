// src/hooks/useAddToCart.ts
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/redux/features/cart-slice";
import { wooGraphQL } from "@/lib/wooGraphQL";
import { ADD_TO_CART_MUTATION } from "@/lib/mutations";
import { ProductNode } from "@/types/product";

export const useAddToCart = (product: ProductNode) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = async (quantity: number = 1) => {
    setLoading(true);
    try {
      // 1. Gọi API WooCommerce thật
      const data = await wooGraphQL(ADD_TO_CART_MUTATION, {
        productId: product.databaseId, 
        quantity: quantity,
      });

      // 2. Cập nhật Redux
      dispatch(
        addItemToCart({
          id: product.databaseId || 0,
          title: product.name,
          // 👇 SỬA LỖI TẠI ĐÂY: Thay /[^0-9.]/g bằng /\D/g
          // Ý nghĩa: Xóa sạch dấu chấm, chữ, ký tự lạ -> Chỉ giữ lại số nguyên
          price: parseFloat(product.price?.replace(/\D/g, "") || "0"), 
          
          discountedPrice: parseFloat(
            (product.salePrice || product.regularPrice || "0").replace(/\D/g, "")
          ),
          
          quantity: quantity,
          imgs: {
            thumbnails: [product.image?.sourceUrl || ""],
            previews: [product.image?.sourceUrl || ""],
          },
        })
      );

      console.log("✅ Added to cart:", data);

    } catch (error) {
      console.error("❌ Add to cart failed:", error);
      alert("Không thể thêm vào giỏ hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return { handleAddToCart, loading };
};