"use server";

import { database } from "@/db/database";
import { auth } from "@/auth";
import { items } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createItemAction({
  fileKey,
  name,
  startingPrice,
}: {
  fileKey: string;
  name: string;
  startingPrice: number;
}) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  await database.insert(items).values({
    name,
    startingPrice,
    fileKey,
    userId: user.id as string,
  });

  redirect("/");
}
