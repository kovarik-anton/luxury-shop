"use server";

import { db } from "@/lib/db";
import { Pagination } from "@/types/ui";

//TODO
export async function getStore() {
  const store = await db.store.findFirst();
  if (!store) throw new Error("Please provide store data.");
  return store;
}

export async function getStores({ page, pageSize }: Pagination) {
  const storeSkip = (page - 1) * pageSize;
  const stores = await db.store.findMany({
    select: { name: true, url: true, logo: true },
    take: pageSize,
    skip: storeSkip,
  });

  return stores.map((store) => ({
    url: store.url,
    name: store.name,
    internalUrl: store.url,
    image: store.logo!,
  }));
}
