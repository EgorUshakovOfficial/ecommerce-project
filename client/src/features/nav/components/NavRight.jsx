import { useSelector } from "react-redux";
import {useLocation, Link} from 'react-router-dom';
import { Badge, IconButton} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavWrapper from "./NavWrapper";
import { Login } from "../../../features/auth";
import {ShoppingCart} from '../../../features/shopping';
import { UserMenu } from "../../settings";


export default function NavRight(){
    // Path name
    const {pathname} = useLocation();

    // Cart regex
    const cartRegex = /^\/cart$/g

    // User and cart states
    const {cart, user} = useSelector(state => state);

    // Number of items in the cart
    const numItems = cart.length;

    return (
        <NavWrapper>
            {(user.data === null) ? <Login /> : <UserMenu />}
            {cartRegex.test(pathname) ?
                <Link to="/cart">
                    <Badge
                        badgeContent={numItems}
                        color="primary"
                    >
                        <IconButton
                            disableRipple
                            style={{
                                color:"inherit",
                                size:"medium",
                                variant:"text",
                                textTransform:"none",
                                background:"transparent",
                                fontSize:"1em",
                            }}
                            aria-label="open cart"
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                    </Badge>
                </Link>
                :
                <ShoppingCart />
            }
        </NavWrapper>
    );
}