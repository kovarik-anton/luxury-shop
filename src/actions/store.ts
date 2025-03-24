"use server";

import { db } from "@/lib/db";

//TODO
export async function getStore() {
  const store = await db.store.findFirst();
  if (!store) throw new Error("Please provide store data.");
  return store;
}
