import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import {Checkout, Confirmation, Home, ProductPage} from './pages';

export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success" element={<Confirmation />} />
                <Route path="/product-page/:productId" element={
                    <ProductPage
                        name="Airpods- Max"
                        description="a perfect balance of exhiliarating high-fidelity audio and the effortless magic of AirPods"
                        yearlyPrice={599}
                        monthlyPrice={99.99}
                        numReviews={121}
                        avgRating={4}
                    />
                } />
                <Route path="/checkout/:section" element={<Checkout />} />
            </Routes>
        </Router>
    );
}