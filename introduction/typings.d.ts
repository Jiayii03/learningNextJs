export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface Product {
    id?: number;
    product: string;
    price: string;
  }