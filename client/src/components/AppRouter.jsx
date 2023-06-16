import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Confirmation, Home, Information, Payment, ProductPage, Shipping} from '../pages';
import { useAppRouter } from '../hooks';
import getAuthComponent from '../helper/getAuthComponent';

export default function AppRouter(){
    const {isAuthenticated} = useAppRouter();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success" element={<Confirmation />} />
                <Route path="/checkout/information" element={getAuthComponent(isAuthenticated, Information)} />
                <Route path="/checkout/shipping" element={getAuthComponent(isAuthenticated, Shipping)} />
                <Route path="/checkout/payment" element={getAuthComponent(isAuthenticated, Payment)} />
                <Route path="/product-page/:productId" element={<ProductPage />} />
            </Routes>
        </Router>
    )
}