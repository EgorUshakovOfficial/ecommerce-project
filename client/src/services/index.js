import ordersApi from './orders';
import productsApi from './products';
import authenticationApi from './authenticationApi';

const api = {
    orders: ordersApi,
    products: productsApi,
    authentication: authenticationApi
}

export default api;
