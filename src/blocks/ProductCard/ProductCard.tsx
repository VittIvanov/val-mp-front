import { Link } from "react-router-dom"

import Button from "../../components/Button/Button"

import { ReactComponent as HeartEmpty } from '../img/heart-empty.svg'
import {
  Wrapper,
  LikeWrapper,
  Image,
  PriceWrapper,
  PriceRegular,
  PriceRegularWhenDiscounted,
  PriceDiscounted,
  Title,
  Desc,
} from "./styled"

interface I_ProductCardProps {
  id: number
  slug?: string | undefined
  imgSrc: string
  priceRegular: number
  priceDiscounted?: number
  title: string
  brand?: string
  //liked: boolean
  hideLikes?: boolean
}


const ProductCard: React.FC<I_ProductCardProps> = ({
  id,
  slug,
  imgSrc,
  priceRegular,
  priceDiscounted,
  title,
  brand,
  //liked,
  hideLikes = false,
}) => {
  return (
    <Wrapper>
      {!hideLikes && (
        <LikeWrapper
          data-product-id={id}
        //onClick={handleFavovites}
        >
          {/* {isLiked ? <HeartFilled /> : <HeartEmpty />} */}
          <HeartEmpty />
        </LikeWrapper>
      )}

      <Link to={`/product/${slug || id}`}>
        <Image src={imgSrc} />
      </Link>

      <PriceWrapper>
        {Number.isInteger(priceDiscounted) ? <>
          <PriceDiscounted>{priceDiscounted} $</PriceDiscounted>
          <PriceRegularWhenDiscounted>{priceRegular}</PriceRegularWhenDiscounted>
        </> : (
          <PriceRegular>{priceRegular} ₽</PriceRegular>
        )}
      </PriceWrapper>

      <Title className="h4">
        <Link to={`/product/${slug || id}`}>
          {title}
        </Link>
      </Title>

      <Desc>{brand}</Desc>

      <Button>В корзину</Button>


    </Wrapper>
  )
}

export default ProductCard