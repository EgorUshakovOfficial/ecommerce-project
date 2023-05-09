import {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from '../../../context/SearchProvider';

const StyledSearchWrapper = styled('div')({
    position: "relative",
    display: "flex",
    alignItems: "center",
});

export default function SearchBar(){
    // State of the search filter
    const [filter, setFilter] = useState('');

    const {setFocus} = useContext(SearchContext);

    // On change callback
    const handleFilterOnChange = event => setFilter(event.target.value);

    return (
        <StyledSearchWrapper id="search-bar-div">
            <input
                id="search-bar"
                placeholder="Search Product"
                type="text"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={handleFilterOnChange}
                value={filter}
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