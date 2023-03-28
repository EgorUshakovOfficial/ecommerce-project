import {useContext, useEffect, useState} from 'react';
import { SearchContext } from '../context/SearchProvider';

export default function useSearch(){
    // State of the search filter and focus
    const [filter, setFilter] = useState('');

    const [focus, setFocus] = useState('');

    // Retrieve state from the search context
    const {setHide} = useContext(SearchContext);

    // Callbacks on specific events
    const handleFilterOnChange = event => setFilter(event.target.value);

    const onFocus = () => setFocus(true);

    const onBlur = () => setFocus(false);

    useEffect(() => {
        setHide(prevState => {
            if (prevState === false && focus === true)
                return true;

            else if (prevState === true && focus === false)
                return false;

            return prevState;
        });
    }, [focus])

    return {
        filter,
        focus,
        handleFilterOnChange,
        onBlur,
        onFocus
    }
}