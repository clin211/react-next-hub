"use client";

import { revalidatePath } from "./actions";
interface RevalidatePathButtonProps {
  label: string;
}

export function RevalidatePathButton({ label }: RevalidatePathButtonProps) {
  return (
    <button
      className="py-1 border hover:bg-gray-50"
      onClick={() => revalidatePath()}
    >
      {label}
    </button>
  );
}
