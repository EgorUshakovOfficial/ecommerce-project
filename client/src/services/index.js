import authenticationApi from './authenticationApi';
import ordersApi from './orders';
import productsApi from './products';
import usersApi from './usersApi';


const api = {
    authentication: authenticationApi,
    orders: ordersApi,
    products: productsApi,
    users: usersApi
}

export default api;
