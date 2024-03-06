import { Helmet } from 'react-helmet'
import { PageWrapper } from '../../App.styled'
import { ProductGroup, ProductGroupContainer } from './styled'
import ProductCard from '../../blocks/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { selectFavorites } from '../../features/Favorites/selectors'

import { apiGetUniqueItems } from '../api/apiGetUniqueItems'
import { useEffect, useState } from 'react'
import { I_ProductsDetails } from '../types'

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<I_ProductsDetails[]>([])
  const idsInFavorites = useSelector(selectFavorites)

  useEffect(() => {
    // функция загрузки списка товаров с API
    const fetchProducts = async () => {
      try {
        const productList = await apiGetUniqueItems()
        setProducts(productList)
      } catch (error) {
        console.error('Ошибка при загрузке списка товаров:', error)
      }
    }

    fetchProducts()
  }, []
  )

  return (
    <>
      <Helmet>
        <title>Главная- Valantis</title>
      </Helmet>

      <PageWrapper>
        <ProductGroup>
          <h1>Рекомендуемые товары</h1>

          <ProductGroupContainer>
            {products && products.map((p) => (
              <ProductCard
                {...p}
                key={p.id}
                id={p.id}
                title={p.product}
                priceRegular={p.price}
                brand={p.brand}
                isLiked={idsInFavorites.includes(parseInt(p.id))}
              />
            ))}
          </ProductGroupContainer>
        </ProductGroup>
      </PageWrapper>

    </>)
}

export default HomePage
