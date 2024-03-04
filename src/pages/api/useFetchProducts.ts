// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProductsIds, fetchProductDetails } from './productsSlice';
// import { ProductsState } from './types';

// const ApiSelectors = () => { // Обновленное имя компонента
//   const dispatch = useDispatch();
//   const products = useSelector((state: ProductsState) => state.products);
//   const loading = useSelector((state: ProductsState) => state.loading);
//   const error = useSelector((state: ProductsState) => state.error);

//   useEffect(() => {
//     dispatch(fetchProductsIds({ offset: 0, limit: 50 }));
//   }, [dispatch]);

// useEffect(() => {
//   if (products.length > 0) {
//     const productIds: string[] = products.map(product => product.id);
//     dispatch(fetchProductDetails(productIds));
//   }
// }, [dispatch, products]);

//   // Ваша логика компонента

// }

// export default ApiSelectors; // Обновленное имя экспорта

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
    if (products.length > 0) {
      const productIds: string[] = products.map(p => p.id)
      dispatch(fetchProductDetails(productIds) as any)

    }
  }, [dispatch, products])

  return { products }
};
