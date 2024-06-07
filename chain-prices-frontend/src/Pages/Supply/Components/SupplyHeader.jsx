import { Button, OutlinedInput, IconButton } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { useThunk } from '../../../Core/Hooks';

const SupplyHeader = ({ searchState }) => {
  const basket = useSelector((state) => state.Supply.basket);
  const navigate = useNavigate();
  const [search, setSearch] = searchState;
  const basketValue = basket.reduce((acc, current) => {
    return acc + current.amount
  }, 0);

  const { isLoading } = useThunk("getProducts");
  
  const goBasketHandler = () => {
    navigate('/basket');
  };

  const setSearchHandler = (event) => {
    setSearch(event.target.value);
 }

 const clearSearchHandler = () => {
    setSearch("");
 }

  return (
    <div className="supply-header">
        <div className="search-bar">
            <OutlinedInput
                id="filter-text-box" 
                value={search}
                onChange={setSearchHandler} 
                placeholder="Search..."
                disabled={isLoading}
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
        </div>
        <div className="basket">
            <Button onClick={goBasketHandler}>
                <ShoppingBasketIcon style={{'fontSize': 32}} />
                <span>({basketValue})</span>
            </Button>
        </div>  
    </div>
  );
}

SupplyHeader.propTypes = {
    searchState: PropTypes.array
};

export default SupplyHeader;