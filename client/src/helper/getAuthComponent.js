import { Navigate } from "react-router-dom"

// Checks if the user is authenticated and returns the appropriate response
const getAuthComponent = (isAuthenticated, Component) => {
    // If user is not authenticated, redirect the user back to the Home page
    if (isAuthenticated === false){
        return <Navigate to="/" replace={true} />
    }

    return <Component />
}

export default getAuthComponent;