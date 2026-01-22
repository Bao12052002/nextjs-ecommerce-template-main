// src/components/Checkout/PaymentMethod.tsx
import React from "react";

interface PaymentMethodProps {
  selected: string;
  onSelect: (method: string) => void;
}

const PaymentMethod = ({ selected, onSelect }: PaymentMethodProps) => {
  return (
    <div className="mb-6">
      <h4 className="font-bold mb-3">Phương thức thanh toán</h4>
      
      <div className="space-y-3">
        {/* COD */}
        <label className={`flex items-center p-3 border rounded cursor-pointer transition 
          ${selected === "cod" ? "border-blue bg-blue/5" : "border-gray-200"}`}>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selected === "cod"}
            onChange={() => onSelect("cod")}
            className="mr-3"
          />
          <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
        </label>

        {/* Chuyển khoản (BACS) */}
        <label className={`flex items-center p-3 border rounded cursor-pointer transition 
          ${selected === "bacs" ? "border-blue bg-blue/5" : "border-gray-200"}`}>
          <input
            type="radio"
            name="payment"
            value="bacs"
            checked={selected === "bacs"}
            onChange={() => onSelect("bacs")}
            className="mr-3"
          />
          <span className="font-medium">Chuyển khoản ngân hàng</span>
        </label>
        
      </div>
      
      {/* Ghi chú phụ cho phương thức */}
      <div className="mt-3 text-sm text-gray-500">
        {selected === "cod" && <p>Bạn sẽ thanh toán tiền mặt cho shipper khi nhận được hàng.</p>}
        {selected === "bacs" && <p>Vui lòng chuyển khoản theo thông tin: VCB - 0123456789 - NGUYEN VAN A. Nội dung: [Mã Đơn Hàng]</p>}
      </div>
    </div>
  );
};

export default PaymentMethod;