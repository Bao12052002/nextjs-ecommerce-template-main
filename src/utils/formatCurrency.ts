// src/utils/formatCurrency.ts

export const formatVND = (value: string | number | undefined | null) => {
  if (!value) return "Liên hệ";

  let numberValue: number;

  if (typeof value === "string") {
    // 👇 SỬA LỖI: Thay vì giữ dấu chấm (/[^0-9.]/g), ta xóa SẠCH mọi ký tự không phải số (\D)
    // Ví dụ: "229.000₫" -> "229000"
    const cleanString = value.replace(/\D/g, ""); 
    numberValue = parseFloat(cleanString);
  } else {
    numberValue = value;
  }

  if (isNaN(numberValue)) return "Liên hệ";

  // Format sang định dạng tiền tệ VN
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(numberValue);
};