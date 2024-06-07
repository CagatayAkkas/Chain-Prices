import { StyledProductDetailHeader } from '../Style/ProductDetail.style'
import { IconButton,Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from "prop-types"

const ProductDetailHeader = ({ handleClose }) => {

   return (
      <StyledProductDetailHeader>
         <Typography fontWeight="bold" variant="h6"> Product Details </Typography>
         <IconButton onClick={handleClose}> 
            <CloseIcon />
         </IconButton>
      </StyledProductDetailHeader>
   )
}

export default ProductDetailHeader;

ProductDetailHeader.propTypes = {
   handleClose: PropTypes.func.isRequired
}