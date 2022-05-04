import { IProduct } from "./product";

export interface Cart {
    id: number;
    idUser: string;
    products: IProduct[];
  }