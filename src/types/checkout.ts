// src/types/checkout.ts

export interface AddressInput {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
  overwrite?: boolean; // 👇 THÊM DÒNG NÀY
}

export interface CheckoutInput {
  clientMutationId: string;
  billing: AddressInput;
  shipping: AddressInput;
  shipToDifferentAddress: boolean;
  paymentMethod: string;
  customerNote?: string;
  isPaid?: boolean;
}

export const initialAddress: AddressInput = {
  firstName: "",
  lastName: "",
  address1: "",
  city: "",
  state: "",
  postcode: "",
  country: "VN",
  email: "",
  phone: "",
};