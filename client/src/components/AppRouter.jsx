import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Checkout, Confirmation, Home, ProductPage } from '../pages';

export default function AppRouter(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success" element={<Confirmation />} />
                <Route path="/checkout/:section" element={<Checkout />} />
                <Route path="/product-page/:productId" element={<ProductPage />} />
            </Routes>
        </Router>
    )
}