import PropTypes from 'prop-types';

const ProductImage = ({ data }) => {
   console.log(data, ' data');

   return (
      <div> ProductImage </div>
   )
}

export default ProductImage;

ProductImage.propTypes = {
   data: PropTypes.object.isRequired
}