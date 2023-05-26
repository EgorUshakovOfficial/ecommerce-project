import { useSelector } from "react-redux";
import NavWrapper from "./NavWrapper";
import { Login } from "../../../features/auth";
import {ShoppingCart} from '../../../features/shopping';
import { UserMenu } from "../../settings";

export default function NavRight(){
    // User
    const user = useSelector(state => state.user.data);

    return (
        <NavWrapper>
            {(user === null) ? <Login /> : <UserMenu />}
            <ShoppingCart  />
        </NavWrapper>
    );
}