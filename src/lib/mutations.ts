// src/lib/mutations.ts
export const ADD_TO_CART_MUTATION = `
  mutation AddToCart($productId: Int!, $quantity: Int!) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        # 👇 1. Đưa 'total' ra ngoài khối 'contents' (Nó thuộc về Cart)
        total
        
        contents {
          # 👇 2. itemcount thường nằm trong contents, nhưng nếu lỗi thì chuyển ra ngoài cùng cấp với total nhé
          itemCount 
          nodes {
            key
            product {
              node {
                id
                name
                slug
                image {
                  sourceUrl
                }
                # 👇 Fragment giá tiền (giữ nguyên như lần trước)
                ... on SimpleProduct {
                  price
                  regularPrice
                  salePrice
                }
                ... on VariableProduct {
                  price
                  regularPrice
                  salePrice
                }
              }
            }
            quantity
            total # Tổng tiền của từng món hàng (Line Item Total)
          }
        }
      }
    }
  }
`;

export const CHECKOUT_MUTATION = `
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      result
      redirect
      order {
        id
        databaseId
        orderNumber
        total
        status
      }
    }
  }
`;