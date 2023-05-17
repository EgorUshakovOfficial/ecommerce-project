import authenticationReducer from './authenticationSlice';
import cartReducer from './cartSlice';
import { clearCart } from './cartSlice';
import checkoutReducer from './checkoutSlice';
import orderReducer from './orderSlice';
import productReducer from './productsSlice';

export {
    authenticationReducer,
    cartReducer,
    checkoutReducer,
    clearCart,
    orderReducer,
    productReducer
};