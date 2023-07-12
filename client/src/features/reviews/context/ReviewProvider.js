import { createContext } from "react";

// Review Context
const ReviewContext = createContext([]);

// Review Provider
const ReviewProvider = ({children, reviews}) => {
    return (
        <ReviewContext.Provider value={reviews}>
            {children}
        </ReviewContext.Provider>
    );
}

export {ReviewContext, ReviewProvider};