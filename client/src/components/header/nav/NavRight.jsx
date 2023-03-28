import NavWrapper from "./NavWrapper";
import NavLink from './NavLink';
import ShoppingCart from '../../cart/ShoppingCart';

export default function NavRight(){
    return (
        <NavWrapper>
            <NavLink name="Sign in" icon={null} />
            <ShoppingCart  />
        </NavWrapper>
    );
}