export interface I_ProductsDetails {
  id: string
  slug?: string | undefined
  imgSrc?: string
  priceRegular: number | undefined
  priceDiscounted?: number
  title: string | undefined
  brand?: string | null
  isLiked: boolean
  hideLikes?: boolean
}
