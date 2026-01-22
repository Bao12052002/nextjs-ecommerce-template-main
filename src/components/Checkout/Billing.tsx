// src/components/Checkout/Billing.tsx
import React from "react";
import { AddressInput } from "@/types/checkout";

interface BillingProps {
  billing: AddressInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Billing = ({ billing, onChange }: BillingProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
      <h3 className="text-xl font-bold mb-6">Thông tin thanh toán</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Họ (*)</label>
          <input
            type="text"
            name="firstName"
            value={billing.firstName}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:border-blue focus:outline-none"
            placeholder="Nguyễn"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Tên (*)</label>
          <input
            type="text"
            name="lastName"
            value={billing.lastName}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:border-blue focus:outline-none"
            placeholder="Văn A"
          />
        </div>

        <div className="mb-4 md:col-span-2">
          <label className="block mb-2 text-sm font-medium">Địa chỉ (*)</label>
          <input
            type="text"
            name="address1"
            value={billing.address1}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:border-blue focus:outline-none"
            placeholder="Số nhà, tên đường..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Tỉnh / Thành phố (*)</label>
          <input
            type="text"
            name="city"
            value={billing.city}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:border-blue focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Số điện thoại (*)</label>
          <input
            type="text"
            name="phone"
            value={billing.phone}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:border-blue focus:outline-none"
          />
        </div>

        <div className="mb-4 md:col-span-2">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={billing.email}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:border-blue focus:outline-none"
          />
        </div>

      </div>
    </div>
  );
};

export default Billing;