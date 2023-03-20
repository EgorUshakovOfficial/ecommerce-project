import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledSearchWrapper = styled('div')({
    position: "relative",
    display: "flex",
    alignItems: "center",
});

export default function SearchBar(){
    return (
        <StyledSearchWrapper id="search-bar-div">
            <input
                id="search-bar"
                placeholder="Search Product"
                type="text"
                style={{
                    borderRadius:"1em",
                    background:"#F1F3F4",
                    border:"none",
                    height:"40px"
                }}
            />
            <Box
                variant="div"
                position="absolute"
                display="flex"
                height="100%"
                alignItems="center"
                left="calc(100% - 2em)"
            >
                <SearchIcon />
            </Box>
        </StyledSearchWrapper>
    )
}