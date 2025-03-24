"use server";

import { db } from "@/lib/db";
import { requireUser as requireUser } from "./user";
import {
  CartItemBase,
  CartProductType,
  CartWithCartItemBySize,
} from "@/types/ui";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUserCartItemQuantity(
  cartItemId: string,
  sizeId: string,
  quantity: number
) {
  const [{ stock }] = await getCartItemsInfo([sizeId]);
  if (quantity > stock || quantity < 0) throw new Error("Invalid quantity");

  if (quantity === 0) {
    await db.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  } else {
    await db.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: quantity,
      },
    });
  }

  revalidatePath("/cart");
}

export async function getUserCartItems(): Promise<CartProductType[] | null> {
  const cart = await getUserCart();
  if (!cart) return null;

  const sizeIds = cart.cartItems.map((item) => item.sizeId);

  const items = await getCartItemsInfo(sizeIds);

  return items.map((item) => {
    const { quantity, id: cartItemId } = cart.cartItems.find(
      (cartItem) => cartItem.sizeId === item.sizeId
    ) ?? { quantity: 0, id: "" };

    return {
      ...item,
      totalPrice: item.price * quantity,
      quantity: quantity,
      cartItemId,
    };
  });
}

export async function getUserCart() {
  const user = await currentUser();
  if (!user) return null;

  const cart = await db.cart.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      cartItems: true,
      coupon: true,
    },
  });

  return cart;
}

export async function updateCartItemInCart({
  sizeId,
  quantity,
}: CartItemBase): Promise<CartProductType> {
  try {
    const [cartItemInfo] = await getCartItemsInfo([sizeId]);
    const user = await requireUser();
    if (user) {
      const cart = await getUserCartWithCartItemBySize(user.id, sizeId);
      if (cart && cart.cartItems?.length > 0) {
        await updateCartItem({
          cart,
          quantity,
          stock: cartItemInfo.stock,
        });
      } else {
        await addCartItem({
          cart,
          quantity,
          stock: cartItemInfo.stock,
          sizeId,
          userId: user.id,
        });
      }
    }

    revalidatePath(
      `/product/${cartItemInfo.productSlug}/${cartItemInfo.variantSlug}`
    );
    return {
      ...cartItemInfo,
      totalPrice: cartItemInfo.price * quantity,
      quantity: quantity,
    };
  } catch (error: any) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    throw error;
  }
}

async function getCartItemsInfo(sizeIds: string[]) {
  const sizes = await db.size.findMany({
    where: {
      id: { in: sizeIds },
    },
    select: {
      id: true,
      stock: true,
      price: true,
      size: true,
      discount: true,
      productVariant: {
        select: {
          id: true,
          slug: true,
          variantName: true,
          weight: true,
          variantImage: true,
          product: {
            select: {
              id: true,
              slug: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (sizes?.length < 1) {
    throw new Error("Size not found");
  }

  const cartitems = sizes.map((s) => {
    const {
      stock,
      price,
      size,
      discount,
      id: sizeId,
      productVariant: {
        id: variantId,
        slug: variantSlug,
        variantName,
        variantImage,
        product: { id: productId, name, slug: productSlug },
      },
    } = s;
    const discountedPrice = price - (price * discount) / 100;

    return {
      productId,
      variantId,
      productSlug,
      variantSlug,
      name,
      variantName,
      variantImage,
      sizeId,
      size,
      price: discountedPrice,
      stock,
    };
  });

  return cartitems;
}

async function addCartItem({
  cart,
  quantity,
  stock,
  sizeId,
  userId,
}: {
  cart: CartWithCartItemBySize | null;
  quantity: number;
  stock: number;
  sizeId: string;
  userId: string;
}) {
  if (stock < quantity) {
    throw new Error("Quantity is greater than stock");
  }

  if (!cart) {
    await db.cart.create({
      data: {
        user: { connect: { id: userId } },
        cartItems: {
          create: { sizeId, quantity },
        },
      },
    });
  } else {
    await db.cartItem.create({
      data: {
        size: { connect: { id: sizeId } },
        quantity,
        cart: { connect: { id: cart.id } },
      },
    });
  }
}

async function updateCartItem({
  cart,
  quantity,
  stock,
}: {
  cart: CartWithCartItemBySize;
  quantity: number;
  stock: number;
}) {
  const [cartItem] = cart.cartItems;
  if (stock < cartItem.quantity + quantity) {
    throw new Error("Quantity is greater than stock");
  }
  const result = await db.cartItem.update({
    data: {
      quantity: cartItem.quantity + quantity,
    },
    where: {
      id: cartItem.id,
    },
  });

  return result;
}

async function getUserCartWithCartItemBySize(
  userId: string,
  sizeId: string
): Promise<CartWithCartItemBySize | null> {
  const cart = await db.cart.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      coupon: {
        select: {
          startDate: true,
          endDate: true,
          discount: true,
        },
      },
      cartItems: {
        where: {
          sizeId: sizeId,
        },
        select: {
          id: true,
          quantity: true,
        },
      },
    },
  });

  return cart;
}

export async function emptyUserCart() {
  try {
    const { id: userId } = await requireUser();

    const res = await db.cart.delete({
      where: {
        userId,
      },
    });
    if (res) return true;
  } catch (error) {
    throw error;
  }
}
