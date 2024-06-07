import { StyledTableHeader } from '../Style/Transaction.style';
import {  IconButton, OutlinedInput, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useThunk } from '../../../Core/Hooks';

const TableHeader = ({ searchState }) => {
   const [search, setSearch] = searchState;
   
   const { isLoading } = useThunk("getTransactions");
   const { isLoading: isLoadingGetProductById } = useThunk("getProductById");

   const setSearchHandler = (event) => {
      setSearch(event.target.value);
   }

   const clearSearchHandler = () => {
      setSearch("");
   }

   return (
      <StyledTableHeader>
         <div className="filter-container">
            <Typography variant="h5" fontWeight={'bold'}> Transactions </Typography>
         </div>
         <OutlinedInput 
            id="filter-text-box" 
            value={search}
            onChange={setSearchHandler} 
            placeholder="Search..."
            disabled={isLoading || isLoadingGetProductById}
            startAdornment={<SearchIcon sx={{ color: "rgb(71 71 71 / 50%)", marginRight: "5px" }} />}
            endAdornment={
               <IconButton 
                  sx={{ opacity: search.length ? 1 : 0, visibility: search.length ? "visible" : "hidden" }} 
                  disabled={!search.length} 
                  onClick={clearSearchHandler}
               > 
                  <ClearIcon /> 
               </IconButton>
            }
         />
      </StyledTableHeader>
   )
}

export default TableHeader;

TableHeader.propTypes = {
   searchState: PropTypes.array.isRequired,
}