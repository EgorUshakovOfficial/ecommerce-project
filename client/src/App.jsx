import {Fragment} from 'react';
import {Home, ProductPage} from './pages';

export default function App(){
    return(
        <Fragment>
            <ProductPage
                name="Airpods- Max"
                description="a perfect balance of exhiliarating high-fidelity audio and the effortless magic of AirPods"
                yearlyPrice={599}
                monthlyPrice={99.99}
                numReviews={121}
                avgRating={4}
            />
        </Fragment>
    );
}