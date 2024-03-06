export interface I_ProductsDetails {
  id: string
  slug?: string | undefined
  imgSrc?: string
  price: number | undefined
  priceDiscounted?: number
  product: string | undefined
  brand: string | null
  isLiked: boolean
  hideLikes?: boolean
}
