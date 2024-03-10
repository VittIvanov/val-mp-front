import { Helmet } from 'react-helmet'
import { PageWrapper } from '../../App.styled'
import { ProductGroup, ProductGroupContainer } from './styled'
import ProductCard from '../../blocks/ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { selectFavorites } from '../../features/Favorites/selectors'

import { apiGetUniqueItems } from '../api/apiRequests'
import { I_ProductsDetails } from '../types'

import { selectProductPage, setProducts } from '../api/productsSlice'
import Pagination from '../../features/pagination/Pagination'

const ITEMS_PER_PAGE = 50

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const idsInFavorites = useSelector(selectFavorites)
  const fetchedProducts = useSelector(selectProductPage)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(2);
  const [totalProducts, setTotalProducts] = useState<number>(0)



  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const allProducts = await apiGetUniqueItems()
        const totalProducts = allProducts.length
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE)
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = currentPage * ITEMS_PER_PAGE
        const productList = allProducts.slice(startIndex, endIndex)
        dispatch(setProducts(productList))
        setTotalPages(totalPages)
      } catch (error) {
        console.error('Ошибка при загрузке списка товаров:', error)
      }
    };

    fetchInitialProducts()
  }, [dispatch, currentPage])


  const goToPage = async (page: number) => {
    setCurrentPage(page)
  }


  return (
    <>
      <Helmet>
        <title>Главная- Valantis</title>
      </Helmet>

      <PageWrapper>
        <ProductGroup>

          <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />

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
