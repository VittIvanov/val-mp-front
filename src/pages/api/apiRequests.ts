import {
  getIds,
  getItems,
  filterDuplicates,
  getFields,
  getFieldValues,
  filterProductsByFieldValue
} from "./apiGetUniqueItems"


export const apiGetUniqueItems = async () => {
  const ids = await getIds()
  const items = await getItems(ids)
  return filterDuplicates(items)
}

// Пример использования(тест)
export const consoleGetUniqueFields = async () => {
  try {
    // Получить список имеющихся полей товаров
    const fields = await getFields()
    console.log('Список полей товаров:', fields)

    // Получить значения поля "brand"
    const brandValues = await getFieldValues('product')
    console.log('Значения поля "product":', brandValues)

    // Фильтрация товаров по полю "price" и значению 17500.0
    const filteredByPriceProducts = await filterProductsByFieldValue('price', 17500.0)
    console.log('Отфильтрованные товары(цена):', filteredByPriceProducts)
  } catch (error) {
    console.error('Произошла ошибка:', error)
  }
}




// EXAMPLE
export const consoleGetUniqueIds = async () => {
  try {
    const ids = await getIds()
    console.log('Список идентификаторов товаров:', ids)

    const items = await getItems(ids)
    const uniqueItems = filterDuplicates(items)
    console.log('Информация о товарах без дубликатов:', uniqueItems)
  } catch (error) {
    console.error('Произошла ошибка:', error)
  }
};
