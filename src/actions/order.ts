"use server";

import { db } from "@/lib/db";
import { requireUser } from "./user";

export const getOrder = async (orderId: string) => {
  const user = await requireUser();

  const order = await db.order.findUnique({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
      items: true,
      coupon: true,
      _count: {
        select: {
          items: true,
        },
      },
      shippingAddress: {
        include: {
          user: true,
        },
      },
      paymentDetails: true,
    },
  });

  return order;
};
