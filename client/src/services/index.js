import authenticationApi from './authenticationApi';
import ordersApi from './orders';
import productsApi from './products';
import reviewsApi from './reviewsApi';
import shoppingApi from './shoppingApi';
import usersApi from './usersApi';


const api = {
    authentication: authenticationApi,
    orders: ordersApi,
    products: productsApi,
    reviews:reviewsApi,
    shopping:shoppingApi,
    users: usersApi,
}

export default api;
