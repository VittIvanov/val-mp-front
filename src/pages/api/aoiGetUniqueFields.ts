import md5 from 'md5';
import axios from 'axios';

// Указываем ваши учетные данные
const PASSWORD = 'Valantis';
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const authString = md5(`${PASSWORD}_${timestamp}`);

const API_BASE_URL = 'http://api.valantis.store:40000/';

// Функция для отправки запросов к API
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

// Получить список имеющихся полей товаров
const getFields = async () => {
  try {
    return await sendRequest('get_fields', {});
  } catch (error) {
    console.error('Ошибка при получении списка полей:', error);
    throw error;
  }
};

// Получить значения поля "brand"
const getBrandValues = async () => {
  try {
    return await sendRequest('get_fields', { field: 'brand' });
  } catch (error) {
    console.error('Ошибка при получении значений поля "brand":', error);
    throw error;
  }
};

// Фильтрация товаров по значению поля
const filterProductsByField = async (field: string, value: any) => {
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
    const brandValues = await getBrandValues();
    console.log('Значения поля "brand":', brandValues);

    // Фильтрация товаров по полю "price" и значению 17500.0
    const filteredProducts = await filterProductsByField('price', 17500.0);
    console.log('Отфильтрованные товары:', filteredProducts);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};

// Вызов примера использования
// example();
