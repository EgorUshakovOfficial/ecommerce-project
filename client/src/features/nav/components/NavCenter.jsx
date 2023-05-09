import { SearchProvider } from "../../../context/SearchProvider";
import NavWrapper from "./NavWrapper";
import CategoriesDropdown from "./CategoriesDropdown";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

export default function NavCenter(){
    return (
        <SearchProvider>
            <NavWrapper>
                <CategoriesDropdown />
                <NavLinks />
                <SearchBar />
            </NavWrapper>
        </SearchProvider>
    );
}