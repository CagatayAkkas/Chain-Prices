import ApiURL from "../../../Constants/ApiURL";
import { HttpMethodEnums } from "../../../Core/Constants";
import { request } from "../../../Core/Request";
import { SupplyActions } from "./Supply.slice";

const SupplyThunks = {
   getProducts: () => request({
      method: HttpMethodEnums.GET,
      url: `${ApiURL.PRODUCT}`,
      key: 'getProducts',
      success: ({ data, thunkAPI }) => {
         thunkAPI.dispatch(SupplyActions.setProducts(data));
      }
   }),
   makePayment: ({ payload, totalPrice }) => request({
      method: HttpMethodEnums.POST,
      url: `${ApiURL.VENDOR}/check-request-item`,
      key: 'makePayment',
      payload,
      success: ({ data, thunkAPI }) => {
         if (data?.finePrice === 0) {
            thunkAPI.dispatch(SupplyActions.setFinePrice(0));
            thunkAPI.dispatch(SupplyActions.setIsOpenConfirmModal(true));
         } else {
            thunkAPI.dispatch(SupplyActions.setFinePrice(data.finePrice + totalPrice));
            thunkAPI.dispatch(SupplyActions.setIsOpenErrorModal(true))
         }
      }
   }),
   finalizePayment: (payload) => request({
      method: HttpMethodEnums.POST,
      url: `${ApiURL.VENDOR}/finalize-request-item`,
      key: 'finalizePayment',
      payload,
      success: ({ thunkAPI }) => {
         thunkAPI.dispatch(SupplyActions.setIsOpenConfirmModal(false))
         thunkAPI.dispatch(SupplyActions.setIsOpenErrorModal(false))
         thunkAPI.dispatch(SupplyActions.resetBasket())
         thunkAPI.dispatch(SupplyActions.setFinePrice(0));
         thunkAPI.dispatch(SupplyActions.setIsOpenSuccessModal(true))
      }
   }),
};

export default SupplyThunks;
