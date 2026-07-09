export interface cartProductsType {
  id: number;
  name: string;
  image: string
  price: number;
  discount: number;
}

export const cartProducts: cartProductsType[] = [
  {
    id: 1,
    image: '/svg/shop/images/cart-product.png',
    name: 'Apple card 1000 руб, РУ регион',
    price: 1000,
    discount: 900
  },
  {
    id: 2,
    image: '/svg/shop/images/cart-product.png',
    name: 'Apple card 2000 руб, РУ регион',
    price: 2000,
    discount: 1900
  },
  {
    id: 3,
    image: '/svg/shop/images/cart-product.png',
    name: 'Apple card 3000 руб, РУ регион',
    price: 3000,
    discount: 2900
  }
]
