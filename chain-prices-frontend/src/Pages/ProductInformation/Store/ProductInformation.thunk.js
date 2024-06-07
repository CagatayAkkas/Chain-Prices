import ApiURL from "../../../Constants/ApiURL";
import { HttpMethodEnums } from "../../../Core/Constants";
import { request } from "../../../Core/Request";
import { ProductInformationActions } from "./ProductInformation.slice";

const ProductInformationThunks = {
   getProducts: () => request({
      method: HttpMethodEnums.GET,
      url: `${ApiURL.PRODUCT}`,
      key: 'getProducts',
      noToken: true,
      success: ({ data, thunkAPI }) => {
         thunkAPI.dispatch(ProductInformationActions.setProducts(data));
      }
   })
};

export default ProductInformationThunks;
