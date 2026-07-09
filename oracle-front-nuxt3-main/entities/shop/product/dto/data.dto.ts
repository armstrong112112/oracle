export interface ProductSlidesDTO {
  id: number
  image: string
}
export interface ProductDataDTO {
  id: number
  image: ProductSlidesDTO[]
  name: string
  price: string
}

// DATAS
export const ProductSlidesData: ProductSlidesDTO[] = [
  {
    id: 1,
    image: '/svg/shop/images/Container.png',
  },
  {
    id: 2,
    image: '/svg/shop/images/Container.png',
  },
  {
    id: 3,
    image: '/svg/shop/images/Container.png',
  },
  {
    id: 4,
    image: '/svg/shop/images/Container.png',
  },
]

export const ProductPageSlidesData: ProductSlidesDTO[] = [
  {
    id: 1,
    image: '/svg/shop/images/ProductDetail.png' ,
  },
  {
    id: 2,
    image: '/svg/shop/images/ProductDetail.png',
  },
  {
    id: 3,
    image: '/svg/shop/images/ProductDetail.png',
  },
  {
    id: 4,
    image: '/svg/shop/images/ProductDetail.png',
  },
]

export const ProductsData: ProductDataDTO[] = [
  { id: 1, image: ProductSlidesData, name: 'Bag', price: '$ 2 990' },
  { id: 2, image: ProductSlidesData, name: 'Hat', price: '$ 1 450' },
  { id: 3, image: ProductSlidesData, name: 'Shoe', price: '$ 3 100' },
  { id: 4, image: ProductSlidesData, name: 'Pen', price: '$ 850' },
  { id: 5, image: ProductSlidesData, name: 'Lamp', price: '$ 4 200' },
  { id: 6, image: ProductSlidesData, name: 'Cup', price: '$ 1 990' },
  { id: 7, image: ProductSlidesData, name: 'Book', price: '$ 2 100' },
  { id: 8, image: ProductSlidesData, name: 'Ball', price: '$ 1 600' },
  { id: 9, image: ProductSlidesData, name: 'Watch', price: '$ 5 750' },
  { id: 10, image: ProductSlidesData, name: 'Fan', price: '$ 3 500' },
  { id: 11, image: ProductSlidesData, name: 'Ring', price: '$ 2 800' },
  { id: 12, image: ProductSlidesData, name: 'Chair', price: '$ 3 999' },
]
