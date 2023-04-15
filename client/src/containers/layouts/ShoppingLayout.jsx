import Container from '../Container';
import {Nav} from "../../components";


export default function ShoppingLayout({children}){
    return (
        <Container>
            <Nav />
            {children}
        </Container>
    )
}