import NavWrapper from "./NavWrapper";
import NavLink from './NavLink';
import { Login } from "../../../features/auth";
import {ShoppingCart} from '../../../features/shopping';

export default function NavRight(){
    return (
        <NavWrapper>
            <Login />
            <ShoppingCart  />
        </NavWrapper>
    );
}