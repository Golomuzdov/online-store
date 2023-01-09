export interface ICatalog {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  amount: string;
  image: string[];
  rating: string;
}

export interface LocalOptions {
  sort: string;
  categories: string;
  items: ICatalog[];
  price: string;
  amount: string;
  value: [number, number];
  colors: string[];
  brands: string;
}