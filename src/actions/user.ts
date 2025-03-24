"use server";

import { UserRole } from "@/types/enums";
import { currentUser } from "@clerk/nextjs/server";

export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthenticated.");

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.privateMetadata.role !== UserRole.Admin)
    throw new Error("Unauthorized Access: Admin required.");

  return user;
}
