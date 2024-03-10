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

export const getItems = async (ids: string[]) => {
  try {
    const result = await sendRequest('get_items', { ids });
    return result
  } catch (error) {
    console.error('Ошибка при получении информации о товарах:', error);
    throw error;
  }
};

export const filterDuplicates = (items: I_ProductsDetails[]) => {
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

// work with fields
export const getFields = async (field = "brand", offset = 0, limit = 100) => {
  try {
    return await sendRequest('get_fields', { field, offset, limit });
  } catch (error) {
    console.error('Ошибка при получении списка полей:', error);
    throw error;
  }
};

// Метод для получения значений определенного поля товаров
export const getFieldValues = async (field: string) => {
  try {
    return await sendRequest('get_fields', { field });
  } catch (error) {
    console.error(`Ошибка при получении значений поля "${field}":`, error);
    throw error;
  }
};

// Метод для фильтрации товаров по полю и значению
export const filterProductsByFieldValue = async (field: string, value: any) => {
  try {
    return await sendRequest('filter', { [field]: value });
  } catch (error) {
    console.error(`Ошибка при фильтрации товаров по полю "${field}" и значению "${value}":`, error);
    throw error;
  }
};

