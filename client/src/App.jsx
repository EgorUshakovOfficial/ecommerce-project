import { useSelector } from 'react-redux';
import { AppRouter} from './components';

export default function App() {
    console.log(useSelector(state => state));
    return <AppRouter />;
}
