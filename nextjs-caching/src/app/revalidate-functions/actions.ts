"use server";

import {
  revalidateTag as nextRevalidateTag,
  revalidatePath as nextRevalidatePath,
} from "next/cache";

export async function revalidatePath() {
  nextRevalidatePath("/revalidate-functions");
}

export async function revalidateTag(tag: string) {
  nextRevalidateTag(tag);
}
