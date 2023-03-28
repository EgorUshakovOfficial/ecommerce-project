import {createContext, useState} from 'react';

// Initialize search context
const SearchContext = createContext({});

// Search provider
const SearchProvider = ({children}) => {
    // Search state
    const [hide, setHide] = useState(false);

    return (
        <SearchContext.Provider value={{hide, setHide}}>
            {children}
        </SearchContext.Provider>
    );
}

export {SearchContext, SearchProvider};
