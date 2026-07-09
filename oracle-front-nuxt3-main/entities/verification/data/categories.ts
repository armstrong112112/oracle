export interface Category {
  title?: string;
  price?: number;
  id: number;
}

export const categories: Category[] = [
  { title: "Design", price: 250, id: 11 },
  { title: "Traffic", price: 250, id: 21 },
  { title: "DevOps", price: 250, id: 31 },
  { title: "Design", price: 250, id: 41 },
  { title: "Traffic", price: 250, id: 51 },
  { title: "DevOps", price: 250, id: 61 },
  { title: "Design", price: 150, id: 71 },
  { title: "Traffic", price: 150, id: 81 },
  { title: "DevOps", price: 100, id: 91 },
  { title: "Design", price: 100, id: 101 },
  { title: "Traffic", price: 100, id: 111 },
];
