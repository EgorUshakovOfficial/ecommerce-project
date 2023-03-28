import {createContext, useState} from 'react';

// Initialize search context
const SearchContext = createContext({});

// Search provider
const SearchProvider = ({children}) => {
    // Search state
    const [focus, setFocus] = useState(false);

    return (
        <SearchContext.Provider value={{focus, setFocus}}>
            {children}
        </SearchContext.Provider>
    );
}

export {SearchContext, SearchProvider};
