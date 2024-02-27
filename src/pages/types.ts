export interface I_ProductsDetails {
  id: number,
  title: string,
  imgSrc: string,
  slug?: string,
  priceRegular: number,
  priceDiscounted?: number,
  price: number,
  brand: string,
}
