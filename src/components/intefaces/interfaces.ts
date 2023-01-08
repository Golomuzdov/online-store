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
  categories: string[];
  items: ICatalog[];
  price: [number, number];
  value: [number, number];
  brands: string[];
  colors: string[];
}