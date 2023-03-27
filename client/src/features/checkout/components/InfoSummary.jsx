import {Link} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

const StyledTable = styled(Box)({
    border:"1px solid lightgray",
    borderRadius:"0.5em",
});


const Row = styled(Box)({
    display:"grid",
    gridTemplateColumns:"max-content 3fr 1fr",
    alignItems:"center",
    padding:"0.5em 1em",
});

export default function SummaryInfo(props){
    return (
        <StyledTable {...props}>
            <Row borderBottom="1px solid lightgray">
                <Typography variant="body1" color="gray">Contact</Typography>
                <Typography variant="body1" pl="1em">egorushakov@gmail.com</Typography>
                <Link to="#" style={{textAlign:"right"}}>
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
                <Typography variant="body1" pl="1em"> 584 Stonegate Way Northwest, Airdrie AB T4B 3C9, Canada</Typography>
                <Link to="#" style={{textAlign:"right"}}>Change</Link>
            </Row>
        </StyledTable>
    );
};