import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { PageWrapper } from "../../App.styled"
import { ProductGroupContainer } from "./styled"
import ProductCard from "../../blocks/ProductCard/ProductCard"
import { selectFavorites } from "../../features/Favorites/selectors"
import { apiGetUniqueItems } from "../api/apiRequests"
import { I_ProductsDetails } from "../types"

const FavoritesPage: React.FC = () => {
  // const { products } = apiGetUniqueItems()
  const idsInFavorites = useSelector(selectFavorites)


  return (<>
    <Helmet>Главная- KPL Маркет</Helmet>

    <PageWrapper>
      <h2>Избранное</h2>

      {idsInFavorites.length ? (
        <ProductGroupContainer>
          {/* {products
            .filter((p: I_ProductsDetails) => idsInFavorites.includes(parseInt(p.id)))
            .map((p: I_ProductsDetails) => (
              < ProductCard
                {...p}
                key={p.id}
                isLiked={false}
                hideLikes={true}
              />
            ))
          } */}
        </ProductGroupContainer>
      ) : (
        <p>Пока в избранном ничего нет</p>
      )}
    </PageWrapper>
  </>

  )
}


export default FavoritesPage
