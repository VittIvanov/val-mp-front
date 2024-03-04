import { Helmet } from 'react-helmet'
import { PageWrapper } from '../../App.styled'
import { ProductGroup, ProductGroupContainer } from './styled'
import ProductCard from '../../blocks/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { selectFavorites } from '../../features/Favorites/selectors'

import { useFetchProducts } from '../api/useFetchProducts'

const HomePage: React.FC = () => {
  const { products } = useFetchProducts()



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
            {products.map((p) => (
              <ProductCard
                {...p}
                key={p.id}
                isLiked={idsInFavorites.includes(parseInt(p.id))}
              />
            ))}
          </ProductGroupContainer>
        </ProductGroup>
      </PageWrapper>

    </>)
}

export default HomePage
