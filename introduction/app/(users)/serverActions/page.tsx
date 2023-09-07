import React from "react";
import { Product } from "../../../typings";
import { addProductToDatabase } from "./serverActions"; // when import function/variable, use {}
import AddProductButton from "./AddProductButton"; // when import component, no need {}

async function ServerActionsHomePage() {
  const res = await fetch(
    "https://64f82de4824680fd217f38d5.mockapi.io/api/ServerActions/products",
    {
      cache: "no-cache",
      next: {
        tags: ["products"],
      },
    }
  );

  const products: Product[] = await res.json();
  return (
    <main>
      <h1 className="text-3xl font-bold text-center pt-5">
        Products Warehouse
      </h1>

      <AddProductButton />

      <form
        action={addProductToDatabase}
        className="flex flex-col gap-5 max-w-md mx-auto p-5"
      >
        <input
          type="text"
          name="product"
          placeholder="Enter Product name..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="text"
          name="price"
          placeholder="Enter Price name..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <button className="border bg-blue-500 text-white p-2 rounded-md">
          Add Product
        </button>
      </form>

      <h2 className="font-bold p-5">List of Products</h2>

      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id} className="p-5 shadow">
            <p>{product.product}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ServerActionsHomePage;
