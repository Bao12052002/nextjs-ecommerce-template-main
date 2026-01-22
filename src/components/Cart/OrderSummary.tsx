// src/components/Cart/OrderSummary.tsx
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { formatVND } from "@/utils/formatCurrency"; // 👇 Import hàm format

const OrderSummary = () => {
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="bg-white p-6.5 rounded-[10px] shadow-1">
      <h3 className="font-semibold text-xl mb-7.5 text-dark">Order Summary</h3>
      
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium text-dark">Subtotal</span>
        <span className="font-medium text-dark">{formatVND(totalPrice)}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="font-medium text-dark">Shipping</span>
        <span className="font-medium text-green-500">Free</span> 
      </div>

      <div className="border-t border-gray-3 my-6"></div>

      <div className="flex justify-between items-center mb-7.5">
        <span className="font-bold text-lg text-dark">Total</span>
        <span className="font-bold text-lg text-blue">{formatVND(totalPrice)}</span>
      </div>

      <button className="w-full bg-blue text-white font-medium py-3 px-6 rounded-[7px] hover:bg-blue-dark transition duration-200">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;