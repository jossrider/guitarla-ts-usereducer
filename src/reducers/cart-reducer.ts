import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
  | { type: "addToCart"; paylod: { item: Guitar } }
  | { type: "removeFromCart"; payload: { id: Guitar["id"] } }
  | { type: "decreaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "increaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "clearCart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

export const initialState: CartState = {
  data: db,
  cart: [],
};
