import { Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux"

const PrivateRoute = ({component:Component, ...rest}) => {
    // User state
    const user = useSelector(state => state.user.data);

    // Checks if user is authenticated
    const isAuthenticated = (user !== null);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/" replace={true} />
                )
            }
        />
    )
}

export default PrivateRoute;