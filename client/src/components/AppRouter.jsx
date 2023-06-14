import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Checkout, Confirmation, Home, ProductPage } from '../pages';
import getAuthComponent from '../helper/getAuthComponent';

export default function AppRouter(){
    // User state
    const user = useSelector(state => state.user.data);

    // Checks if the user is authenticated
    const isAuthenticated = (user !== null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success" element={<Confirmation />} />
                <Route path="/checkout/:section" element={getAuthComponent(isAuthenticated, Checkout)} />
                <Route path="/product-page/:productId" element={<ProductPage />} />
            </Routes>
        </Router>
    )
}