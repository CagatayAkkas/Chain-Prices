import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import ProductDetailThunks from '../../../Components/ProductDetail/Store/ProductDetail.thunk';

const DetailButton = (props) => {

   const onClickHandler = () => {
      ProductDetailThunks.getProductById({ id: props.data.id });
   }

   return (
      <Button variant="contained" onClick={onClickHandler}> Detail </Button>
   )
};

export default DetailButton;

DetailButton.propTypes = {
   data: PropTypes.object.isRequired
}