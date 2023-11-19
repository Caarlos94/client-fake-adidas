export interface Prod {
  _id: string;
  name: string;
  keys: string[];
  image: string[];
  price: string;
  size: string[];
  category: string;
}

export interface Sugest {
  id: number;
  category: string;
}

export type Options = "all" | "seller" | "any";

export interface Pay {
  id: string;
  cantidad: string;
}
