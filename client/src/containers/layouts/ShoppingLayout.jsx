import Container from '../Container';
import {Nav} from "../../features/nav";


export default function ShoppingLayout({children}){
    return (
        <Container>
            <Nav />
            {children}
        </Container>
    )
}