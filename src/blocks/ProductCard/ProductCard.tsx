import { Link, useLocation } from "react-router-dom"
import { useCallback, useMemo } from "react"
import Button from "../../components/Button/Button"
import { paths } from "../../routes/helpers"

import { ReactComponent as HeartEmpty } from 'img/heart-empty.svg'
import { ReactComponent as HeartFilled } from 'img/heart-filled.svg'
import {
  Wrapper,
  LikeWrapper,
  // Image,
  PriceWrapper,
  PriceRegular,
  PriceRegularWhenDiscounted,
  PriceDiscounted,
  Title,
  Desc,
  BtnsWrapper
} from "./styled"
import { useDispatch } from "react-redux"
import { addToFavorites, removeFromFavorites } from "../../features/Favorites/reducer"


interface I_ProductCardProps {
  id: string
  slug?: string | undefined
  imgSrc?: string
  price: number | undefined
  priceDiscounted?: number
  product: string | undefined
  brand?: string | null
  isLiked: boolean
  hideLikes?: boolean
}


const ProductCard: React.FC<I_ProductCardProps> = ({
  id,
  slug,
  price,
  priceDiscounted,
  product,
  brand,
  isLiked,
  hideLikes = false,
}) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const handleFavovites = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { productId } = e.currentTarget.dataset

    dispatch(
      !isLiked
        ? addToFavorites(+productId!)
        : removeFromFavorites(+productId!)
    )
  }, [dispatch, isLiked])

  const isFavoritesPage = useMemo(
    () => location.pathname === paths.favorites,
    [location.pathname]
  )

  const removeFavorite = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      dispatch(
        removeFromFavorites(+e.currentTarget.dataset.productId!)
      )
    }, [dispatch]
  )

  return (
    <Wrapper>
      {!hideLikes && (
        <LikeWrapper
          data-product-id={id}
          onClick={handleFavovites}
        >
          {isLiked ? <HeartFilled /> : <HeartEmpty />}
        </LikeWrapper>
      )}

      {/* <Link to={`/product/${slug || id}`}>
        <Image />
      </Link> */}

      <PriceWrapper>
        {Number.isInteger(priceDiscounted) ? <>
          <PriceDiscounted>{priceDiscounted} $</PriceDiscounted>
          <PriceRegularWhenDiscounted>{price}</PriceRegularWhenDiscounted>
        </> : (
          <PriceRegular>
            <span>Id товара:{id}</span><br />
            {price} ₽
          </PriceRegular>

        )}
      </PriceWrapper>

      <Title className="h4">
        <Link to={`/product/${slug || id}`}>
          {product}
        </Link>
      </Title>

      <Desc>{brand}</Desc>

      <BtnsWrapper>
        <Button block>В корзину</Button>

        {isFavoritesPage && (
          <Button
            type='danger'
            block
            onClick={removeFavorite}
            data-product-id={id}
          >
            Удалить
          </Button>
        )}
      </BtnsWrapper>

    </Wrapper>
  )
}

export default ProductCard
