// Ваш файл api.ts
import md5 from 'md5';

const apiUrl = 'http://api.valantis.store:40000/';

const generateAuthHeader = () => {
  const password = 'Valantis'; // Ваш пароль
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Текущая дата в формате "yyyyMMdd"
  const authString = `${password}_${timestamp}`;
  return md5(authString);
};

const fetchApi = async (endpoint: string, requestData: any) => {
  const authHeader = generateAuthHeader();
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': authHeader,
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status(ошибка 1) ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('API request error(оштбка 2):', error);
    throw error;
  }
};

export const getProductsIds = async (offset: number, limit: number) => {
  const requestData = {
    action: 'get_ids',
    params: { offset, limit },
  };
  return fetchApi('', requestData);
};

export const getProductsDetails = async (ids: string[]) => {
  const requestData = {
    action: 'get_items',
    params: { ids },
  };
  return fetchApi('', requestData);
};

export const filterProductsByPrice = async (price: number) => {
  const requestData = {
    action: 'filter',
    params: { price },
  };
  return fetchApi('', requestData);
};
