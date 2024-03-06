import md5 from 'md5';
import axios from 'axios';

// Интерфейс для детальной информации о продукте
import { I_ProductsDetails } from '../types';

const PASSWORD = 'Valantis';
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const authString = md5(`${PASSWORD}_${timestamp}`);

const API_BASE_URL = 'http://api.valantis.store:40000/';

const sendRequest = async (action: string, params: object) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      action,
      params,
    }, {
      headers: {
        'X-Auth': authString,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error);
    throw error;
  }
};

export const getIds = async (offset = 0, limit = 100) => {
  try {
    const result = await sendRequest('get_ids', { offset, limit });
    return result;
  } catch (error) {
    console.error('Ошибка при получении списка идентификаторов товаров:', error);
    throw error;
  }
};

const getItems = async (ids: string[]) => {
  try {
    const result = await sendRequest('get_items', { ids });
    return result;
  } catch (error) {
    console.error('Ошибка при получении информации о товарах:', error);
    throw error;
  }
};

const filterDuplicates = (items: I_ProductsDetails[]) => {
  const uniqueIds = new Set<string>();
  const filteredItems: I_ProductsDetails[] = [];

  for (const item of items) {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      filteredItems.push(item);
    }
  }

  return filteredItems;
};

export const apiGetUniqueItems = async () => {
  const ids = await getIds();
  const items = await getItems(ids);
  return filterDuplicates(items)
}

const getFields = async (field = "brand", offset = 0, limit = 100) => {
  try {
    return await sendRequest('get_fields', { field, offset, limit });
  } catch (error) {
    console.error('Ошибка при получении списка полей:', error);
    throw error;
  }
};
// Теперь вы можете вызывать getFields с нужными параметрами, например:

// const fields = await getFields("brand", 3, 5);
// console.log(fields);

// Метод для получения значений определенного поля товаров
const getFieldValues = async (field: string) => {
  try {
    return await sendRequest('get_fields', { field });
  } catch (error) {
    console.error(`Ошибка при получении значений поля "${field}":`, error);
    throw error;
  }
};

// Метод для фильтрации товаров по полю и значению
const filterProductsByFieldValue = async (field: string, value: any) => {
  try {
    return await sendRequest('filter', { [field]: value });
  } catch (error) {
    console.error(`Ошибка при фильтрации товаров по полю "${field}" и значению "${value}":`, error);
    throw error;
  }
};

// Пример использования
export const consoleGetUniqueFields = async () => {
  try {
    // Получить список имеющихся полей товаров
    const fields = await getFields();
    console.log('Список полей товаров:', fields);

    // Получить значения поля "brand"
    const brandValues = await getFieldValues('product');
    console.log('Значения поля "product":', brandValues);

    // Фильтрация товаров по полю "price" и значению 17500.0
    const filteredByPriceProducts = await filterProductsByFieldValue('price', 17500.0);
    console.log('Отфильтрованные товары:', filteredByPriceProducts);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};




// EXAMPLE
export const consoleGetUniqueIds = async () => {
  try {
    const ids = await getIds();
    console.log('Список идентификаторов товаров:', ids);

    const items = await getItems(ids);
    const uniqueItems = filterDuplicates(items);
    console.log('Информация о товарах без дубликатов:', uniqueItems);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};
