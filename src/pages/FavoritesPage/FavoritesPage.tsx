import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { PageWrapper } from "../../App.styled"
import { ProductGroupContainer } from "./styled"
import { dummyProducts } from "../dummyProducts/dummyProducts"
import ProductCard from "../../blocks/ProductCard/ProductCard"
import { selectFavorites } from "../../features/Favorites/selectors"

const FavoritesPage: React.FC = () => {
  const idsInFavorites = useSelector(selectFavorites)


  return (<>
    <Helmet>Главная- KPL Маркет</Helmet>

    <PageWrapper>
      <h2>Избранное</h2>

      {idsInFavorites.length ? (
        <ProductGroupContainer>
          {dummyProducts
            .filter((p) => idsInFavorites.includes(p.id))
            .map((p) => (
              < ProductCard
                {...p}
                key={p.id}
                isLiked={false}
                hideLikes={true}
              />
            ))
          }
        </ProductGroupContainer>
      ) : (
        <p>Пока в избранном ничего нет</p>
      )}
    </PageWrapper>
  </>

  )
}


export default FavoritesPage
