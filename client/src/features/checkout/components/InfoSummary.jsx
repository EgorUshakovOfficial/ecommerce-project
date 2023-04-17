import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';
import createShippingAddress from '../utils/createShippingAddress';

const StyledTable = styled(Box)({
    border:"1px solid lightgray",
    borderRadius:"0.5em",
});


const Row = styled(Box)({
    display:"grid",
    gridTemplateColumns:"max-content minmax(180px, 3fr) max-content",
    alignItems:"center",
    padding:"0.5em 1em"
});

export default function SummaryInfo(props){
    // Theme API
    const theme = useTheme();

    // Matches screen width size of at most 600px
    const matchMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Personal information in checkout
    const {personal} = useSelector(state => state.checkout);

    // Personal information fields
    const {email, address, city, region, postalCode, countryRegion} = personal;

    // Creates shipping address
    const shippingAddress = createShippingAddress(address, city, region, postalCode, countryRegion);

    return (
        <StyledTable {...props}>
            <Row
                borderBottom="1px solid lightgray"
            >
                <Typography variant="body1" color="gray">Contact</Typography>
                <Typography
                    variant="body1"
                    pl="1em"
                    sx={{wordWrap:"break-word"}}
                 >
                    {email}
                </Typography>
                <Link to="/checkout/information" style={{textAlign:"right"}}>
                    Change
                </Link>
            </Row>
            <Row>
                <Typography
                    variant="body1"
                    color="gray"
                >
                    Ship to
                </Typography>
                <Typography
                    variant="body1"
                    pl="1em"
                >
                    {shippingAddress}
                </Typography>
                <Link to="/checkout/information" style={{textAlign:"right"}}>Change</Link>
            </Row>
        </StyledTable>
    );
};