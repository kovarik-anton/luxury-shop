"use server";

import { db } from "@/lib/db";
import { requireUser } from "./user";
import { ShippingAddressInsert } from "@/types";
import { shippingAddressFormSchema } from "@/lib/schema-validators";

export const getUserShippingAddresses = async () => {
  const user = await requireUser();

  const shippingAddresses = await db.shippingAddress.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  return shippingAddresses;
};

export const upsertShippingAddress = async (
  data: ShippingAddressInsert,
  addressId: string
) => {
  const user = await requireUser();

  const address = shippingAddressFormSchema.parse(data);

  if (address.default) {
    const addressDB = await db.shippingAddress.findUnique({
      where: { id: addressId },
    });
    if (addressDB) {
      await db.shippingAddress.updateMany({
        where: {
          userId: user.id,
          default: true,
        },
        data: {
          default: false,
        },
      });
    }
  }

  const upsertedAddress = await db.shippingAddress.upsert({
    where: {
      id: addressId,
    },
    update: {
      ...address,
      userId: user.id,
    },
    create: {
      ...address,
      userId: user.id,
    },
  });

  return upsertedAddress;
};
