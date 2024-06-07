import PropTypes from "prop-types";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { CashRegisterActions } from "../Store/CashRegister.slice";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { snackbar } from "../../../Core/Utils";
import { SnackbarEnums } from "../../../Core/Constants";

const Product = ({ product, setPricesStatus, pricesStatus, index }) => {
   const dispatch = useDispatch();
   const [error, setError] = useState(false);
   const inventory = useSelector((state) => state.CashRegister.inventory)

   const changePrice = (e, id) => {
      const newPrice = e.target.value;
      const errorValue = newPrice === "" || newPrice.startsWith("0") || Number(newPrice) <= 0
      //* Set error to display error messages on the screen
      setError(errorValue);

      //* Set error to check when the sell button is triggered
      const newPricesStatus = [...pricesStatus];
      newPricesStatus[index] = !errorValue;
      setPricesStatus(newPricesStatus);

      //* Update price of the item in the basket
      dispatch(CashRegisterActions.updateAmount({ id, price: newPrice === "" ? "" : Number(newPrice) }));
   };

   const incrementHandler = (productDetail) => {
      const count = inventory.find((item) => item.Product.id === productDetail.id)?.count
      if (productDetail.amount === count) {
         snackbar("You cannot exceed the amount of the product you have", { variant: SnackbarEnums.ERROR })
         return;
      }
      dispatch(CashRegisterActions.increment(productDetail.id))
   }; 

   const decrementHandler = (productDetail) => {
         if(productDetail.amount === 1) {
            dispatch(CashRegisterActions.removeFromBasket(productDetail.id))
         } else {
            dispatch(CashRegisterActions.decrement(productDetail.id))
         }
   };

   return (
      <div key={product.id} className='product-line'>
         <img style={{width: 200, height: 200}} src={product.image_url} />
         <div className='product-info'> 
            <span>{product.name}</span>
            <span>Product Code: {product.productCode}</span>
         </div>
         <Button variant='contained' onClick={() => decrementHandler(product)}>
            { product.amount > 1 ? <RemoveIcon /> : <DeleteIcon /> }
         </Button>
         <Button disableRipple sx={{fontSize:19}}>{product.amount === 1 ? product.amount + ' piece' : product.amount + ' pieces'}</Button>
         <Button variant='contained' onClick={() => incrementHandler(product)}><AddIcon /></Button>
         <TextField 
            label='Price'
            type='number' 
            value={product.price}
            onChange={(e) => changePrice(e, product.id)}
            InputLabelProps={{
               shrink: true,
               error,
            }}
            error={error}
            helperText={error && "Price must be positive number"}
         />
   </div>
   )
}

export default Product

Product.propTypes = {
   product: PropTypes.object.isRequired,
   pricesStatus: PropTypes.array.isRequired,
   setPricesStatus: PropTypes.func.isRequired,
   index: PropTypes.number.isRequired,
}