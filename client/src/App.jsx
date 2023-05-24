import { AppRouter, Loading} from './components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccessToken } from './app/state/authenticationSlice';

export default function App() {
    // Dispatch API
    // const dispatch = useDispatch();

    // User state
    // const {isLoading} = useSelector(state => state.authentication);

    // Application is loading
    // if (isLoading) return <Loading />

    return <AppRouter />
}
