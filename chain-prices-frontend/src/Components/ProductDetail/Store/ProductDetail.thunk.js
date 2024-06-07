import ApiURL from "../../../Constants/ApiURL";
import { HttpMethodEnums, ModalEnums } from "../../../Core/Constants";
import { request } from "../../../Core/Request";
import { ProductDetailActions } from "./ProductDetail.slice";

const ProductDetailThunks = {
   getProductById: ({ id, status }) => request({
      method: HttpMethodEnums.GET,
      url: `${ApiURL.PRODUCT}/${id}`,
      key: 'getProductById',
      noToken: true,
      success: ({ data, thunkAPI }) => {
         thunkAPI.dispatch(ProductDetailActions.setProduct({ ...data, status }));
         thunkAPI.dispatch(ProductDetailActions.setIsOpenProductDetailModal(ModalEnums.OPEN));
      }
   }),
};

export default ProductDetailThunks;
