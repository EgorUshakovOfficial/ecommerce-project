import authenticationReducer from './authenticationSlice';
import cartReducer from './cartSlice';
import { clearCart } from './cartSlice';
import checkoutReducer from './checkoutSlice';
import orderReducer from './orderSlice';
import productReducer from './productsSlice';
import userReducer, {fetchUser, logoutUser} from './userSlice';

export {
    authenticationReducer,
    cartReducer,
    checkoutReducer,
    clearCart,
    fetchUser,
    logoutUser,
    orderReducer,
    productReducer,
    userReducer
};