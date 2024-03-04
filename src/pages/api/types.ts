import { I_ProductsDetails } from "../types";


export interface ProductsState {
  products: I_ProductsDetails[];
  loading: boolean;
  error: string | null;
}
