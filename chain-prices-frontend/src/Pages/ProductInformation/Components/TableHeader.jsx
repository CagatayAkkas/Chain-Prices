import { IconButton, OutlinedInput, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { StyledTableHeader } from '../Style/ProductInformation.style';
import SearchIcon from '@mui/icons-material/Search';
import BarcodeScanner from '../../../Components/BarcodeScanner/BarcodeScanner';
import { useThunk } from '../../../Core/Hooks';

const TableHeader = ({ searchState }) => {
   const [search, setSearch] = searchState;

   const { isLoading } = useThunk("getProducts");
   const { isLoading: isLoadingGetProductById } = useThunk("getProductById");

   const setSearchHandler = (event) => {
      setSearch(event.target.value);
   }

   const clearSearchHandler = () => {
      setSearch("");
   }

   const setBarcode = (barcode) => {
      setSearch(barcode)
   }

   return (
      <StyledTableHeader>
         <div className="filter-container">
            <Typography variant="h5" fontWeight={'bold'}> Product Information </Typography>
         </div>
         <OutlinedInput 
            id="filter-text-box" 
            value={search}
            onChange={setSearchHandler} 
            placeholder="Search..."
            disabled={isLoading || isLoadingGetProductById}
            startAdornment={<SearchIcon sx={{ color: "rgb(71 71 71 / 50%)", marginRight: "5px" }} />}
            endAdornment={
               <>
                  <IconButton 
                  sx={{ opacity: search.length ? 1 : 0, visibility: search.length ? "visible" : "hidden" }} 
                  disabled={!search.length} 
                  onClick={clearSearchHandler}
                  > 
                     <ClearIcon /> 
                  </IconButton>
                  <BarcodeScanner onDetected={(barcode) => setBarcode(barcode)} />
               </>
            }
         />
      </StyledTableHeader>
   )
}

export default TableHeader;

TableHeader.propTypes = {
   searchState: PropTypes.array.isRequired,
}