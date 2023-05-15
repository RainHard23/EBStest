export type ProductType = {
  name: string;
  category: CategoryType;
  price: number;
  id: number
  count: number
}

export type CategoryType = {
  id: string;
  name: string;
}