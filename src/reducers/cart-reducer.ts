import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
  | { type: "addToCart"; payload: { item: Guitar } }
  | { type: "removeFromCart"; payload: { id: Guitar["id"] } }
  | { type: "decreaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "increaseQuantity"; payload: { id: Guitar["id"] } }
  | { type: "clearCart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export const cartReducer = (state: CartState = initialState, actions: CartActions) => {
  if (actions.type === "addToCart") {
    const itemExist = state.cart.find((guitar) => guitar.id === actions.payload.item.id);
    let updatedCart: CartItem[] = [];
    if (itemExist) {
      updatedCart = state.cart.map((item) => {
        if (item.id === actions.payload.item.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...actions.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (actions.type === "removeFromCart") {
    const cart = state.cart.filter((item) => item.id !== actions.payload.id);
    return {
      ...state,
      cart,
    };
  }

  if (actions.type === "decreaseQuantity") {
    const cart = state.cart.map((item) => {
      if (item.id === actions.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    return { ...state, cart };
  }

  if (actions.type === "increaseQuantity") {
    const cart = state.cart.map((item) => {
      if (item.id === actions.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return { ...state, cart };
  }

  if (actions.type === "clearCart") {
    return { ...state, cart: [] };
  }

  return state;
};
