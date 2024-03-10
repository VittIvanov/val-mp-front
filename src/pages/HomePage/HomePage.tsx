import { Helmet } from 'react-helmet'
import { PageWrapper } from '../../App.styled'
import { ProductGroup, ProductGroupContainer } from './styled'
import ProductCard from '../../blocks/ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { selectFavorites } from '../../features/Favorites/selectors'

import { apiGetUniqueItems } from '../api/apiRequests'
// import { I_ProductsDetails } from '../types'

import { selectProductPage, setProducts } from '../api/productsSlice'


const HomePage: React.FC = () => {
  const dispatch = useDispatch()

  const idsInFavorites = useSelector(selectFavorites)

  useEffect(() => {
    // функция загрузки списка товаров с API
    const fetchProducts = async () => {
      try {
        const productList = await apiGetUniqueItems()
        dispatch(setProducts(productList))
      } catch (error) {
        console.error('Ошибка при загрузке списка товаров:', error)
      }
    }

    fetchProducts()
  }, [dispatch]
  )

  const fetchedProducts = useSelector(selectProductPage)

  return (
    <>
      <Helmet>
        <title>Главная- Valantis</title>
      </Helmet>

      <PageWrapper>
        <ProductGroup>
          <h1>Рекомендуемые товары</h1>

          <ProductGroupContainer>
            {fetchedProducts.products ? (
              fetchedProducts.products.map((p) => (
                <ProductCard
                  {...p}
                  key={p.id}
                  id={p.id}
                  product={p.product}
                  price={p.price}
                  brand={p.brand}
                  isLiked={idsInFavorites.includes(parseInt(p.id))}
                />
              ))
            ) : (
              <div>Загрузка...</div>
            )}
          </ProductGroupContainer>
        </ProductGroup>
      </PageWrapper>

    </>)
}

export default HomePage
