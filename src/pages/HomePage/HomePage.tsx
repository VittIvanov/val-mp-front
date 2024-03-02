import { Helmet } from 'react-helmet'
import { PageWrapper } from '../../App.styled'
import { ProductGroup, ProductGroupContainer } from './styled'
import { dummyProducts } from '../dummyProducts/dummyProducts'
import ProductCard from '../../blocks/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { selectFavorites } from '../../features/Favorites/selectors'


const HomePage: React.FC = () => {
  const idsInFavorites = useSelector(selectFavorites)

  return (
    <>
      <Helmet>
        <title>Главная- Valantis</title>
      </Helmet>

      <PageWrapper>
        <ProductGroup>
          <h1>Рекомендуемые товары</h1>

          <ProductGroupContainer>
            {dummyProducts.map((p) => (
              <ProductCard
                {...p}
                key={p.id}
                isLiked={idsInFavorites.includes(p.id)}
              />
            ))}
          </ProductGroupContainer>
        </ProductGroup>
      </PageWrapper>

    </>)
}

export default HomePage
