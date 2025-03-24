import { areCartsEqual } from "@/lib/utils/cart";
import { areEqual } from "@/lib/utils/product";
import { CartProductType } from "@/types/ui";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProductType[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (Item: CartProductType) => void;
  updateProductQuantity: (product: CartProductType, quantity: number) => void;
  removeMany: (items: CartProductType[]) => void;
  removeFromCart: (Item: CartProductType) => void;
  emptyCart: () => void;
  setCart: (newCart: CartProductType[]) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: CartProductType) => {
        if (!product) return;
        const cart = get().cart;
        const cartItem = cart.find((item) => areEqual(item, product));
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            areEqual(item, product)
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + product.quantity,
            totalPrice: state.totalPrice + product.price * product.quantity,
          }));
        } else {
          const updatedCart = [...cart, { ...product }];
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + product.quantity,
            totalPrice: state.totalPrice + product.price * product.quantity,
          }));
        }
      },
      updateProductQuantity: (product: CartProductType, quantity: number) => {
        const cart = get().cart;

        if (quantity <= 0) {
          get().removeFromCart(product);
          return;
        }

        const updatedCart = cart.map((item) =>
          areEqual(item, product) ? { ...item, quantity } : item
        );

        const totalItems = updatedCart.reduce(
          (count, item) => count + item.quantity,
          0
        );
        const totalPrice = updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        set(() => ({
          cart: updatedCart,
          totalItems,
          totalPrice,
        }));
      },
      removeFromCart: (product: CartProductType) => {
        const cart = get().cart;
        const updatedCart = cart.filter((item) => !areEqual(item, product));
        const totalItems = cart.reduce(
          (count, item) => count + item.quantity,
          0
        );
        const totalPrice = updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        set(() => ({
          cart: updatedCart,
          totalItems,
          totalPrice,
        }));
      },
      removeMany: (products: CartProductType[]) => {
        const cart = get().cart;
        const updatedCart = cart.filter(
          (item) => !products.some((product) => areEqual(item, product))
        );
        const totalItems = cart.reduce(
          (count, item) => count + item.quantity,
          0
        );
        const totalPrice = updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set(() => ({
          cart: updatedCart,
          totalItems,
          totalPrice,
        }));
      },
      emptyCart: () => {
        set(() => ({
          cart: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
      setCart: (newCart: CartProductType[]) => {
        const cart = get().cart;
        if (areCartsEqual(cart, newCart)) return;
        console.log("first", cart);
        console.log("sec", newCart);
        const totalItems = newCart.reduce(
          (count, item) => count + item.quantity,
          0
        );
        const totalPrice = newCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        set(() => ({
          cart: newCart,
          totalItems,
          totalPrice,
        }));
      },
    }),
    {
      name: "cart",
    }
  )
);
