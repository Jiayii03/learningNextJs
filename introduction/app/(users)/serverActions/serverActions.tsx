'use server';
import { Product } from '../../../typings';
import { revalidateTag } from 'next/cache';

export const addProductToDatabase = async (e: FormData) => {
    // ?.: This is known as the "optional chaining" operator, used to safely access without causing an error if the object itself is null or undefined 
    const product = e.get("product")?.toString();
    const price = e.get("price")?.toString();

    if (!product || !price) return;

    const newProduct: Product = {
      product: product,
      price: price,
    };

    console.log(newProduct)

    await fetch(
      "https://64f82de4824680fd217f38d5.mockapi.io/api/ServerActions/products",
      {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // revalidateTag is used to revalidate the cache, i.e. refetch the api call
    revalidateTag("products");
  };