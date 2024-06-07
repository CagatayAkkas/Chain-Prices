import { useSelector } from 'react-redux'
import { StyledProductDetailView } from '../Style/ProductDetail.style'

const ProductDetailView = () => {
   const product = useSelector((state) => state.ProductDetail.product);

   return (
      <StyledProductDetailView>
         <div className="product-view">
            <div className="group">
               <span className="key"> Net Grammage (g): </span>
               <span className="value"> { product.netWeight_g } </span>
            </div>
            <div className="group">
               <span className="key"> Energy (kcal): </span>
               <span className="value"> { product.kcal } </span>
            </div>
            <div className="group">
               <span className="key"> Carbohydrate (g): </span>
               <span className="value"> { product.carbohydrate_g } </span>
            </div>
            <div className="group">
               <span className="key"> Protein (g): </span>
               <span className="value"> { product.protein_g } </span>
            </div>
            <div className="group">
               <span className="key"> Fat (g): </span>
               <span className="value"> { product.fat_g } </span>
            </div>
            <div className="group">
               <span className="key"> Sugar (g): </span>
               <span className="value"> { product.sugar_g } </span>
            </div>
            <div className="group">
               <span className="key"> Fiber (g): </span>
               <span className="value"> { product.fiber_g } </span>
            </div>
            <div className="group">
               <span className="key"> Salt (g): </span>
               <span className="value"> { product.fiber_g } </span>
            </div>
         </div>
      </StyledProductDetailView>
   )
}

export default ProductDetailView