

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsIds, fetchProductDetails } from './productsSlice'
import { ProductsState } from './types'; // Обновленный путь к корневому состоянию

export const useFetchProducts = () => {
  const dispatch = useDispatch()
  const products = useSelector((state: ProductsState) => state.products)
  // Обновленный селектор для доступа к правильному месту в состоянии

  useEffect(() => {
    dispatch(fetchProductsIds({ offset: 0, limit: 50 }) as any)
  }, [dispatch])

  useEffect(() => {
    if (products && products.length > 0) {
      const productIds: string[] = products.map(p => p.id)
      dispatch(fetchProductDetails(productIds) as any)

    }
  }, [dispatch, products])

  return { products }
};
