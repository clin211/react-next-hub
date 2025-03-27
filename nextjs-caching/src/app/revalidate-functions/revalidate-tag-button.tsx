"use client";

import { revalidateTag } from "./actions";
interface RevalidateTagButtonProps {
  tag: string;
  label: string;
}

export function RevalidateTagButton({ tag, label }: RevalidateTagButtonProps) {
  return (
    <button
      className="py-1 border hover:bg-gray-50"
      onClick={() => revalidateTag(tag)}
    >
      {label}
    </button>
  );
}
