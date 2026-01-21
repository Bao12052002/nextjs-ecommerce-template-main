// src/types/checkout.ts

export interface AddressInput {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string; // "VN"
  email?: string;
  phone?: string;
}

export interface CheckoutInput {
  clientMutationId: string;
  billing: AddressInput;
  shipping: AddressInput;
  shipToDifferentAddress: boolean;
  paymentMethod: string; // "cod", "bacs", etc.
  customerNote?: string;
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