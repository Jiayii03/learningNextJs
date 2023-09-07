// demonstrating an example of add product button using client component
"use client";

import { useTransition } from "react";
import { addProductToDatabase } from "./serverActions";

function AddProductButton() {
  const [isPending, startTransition] = useTransition();
  const formData = new FormData();
  // only can add a fix product
  formData.append("product", "New Product");
  formData.append("price", "100");

  return (
    <button
      onClick={() => startTransition(() => addProductToDatabase(formData))}
      className="fixed bottom-10 right-10 border bg-green-500 text-white p-2 rounded-md w-48"
    >
      {isPending ? "Adding..." : "Add Product"}
    </button>
  );
}

export default AddProductButton;
