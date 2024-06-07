import ApiURL from "../../../Constants/ApiURL";
import { HttpMethodEnums } from "../../../Core/Constants";
import { request } from "../../../Core/Request";
import { CashRegisterActions } from "./CashRegister.slice";

const CashRegisterThunks = {
   getInventory: (payload) => request({
      method: HttpMethodEnums.POST,
      url: `${ApiURL.VENDOR}/inventory`,
      key: 'getInventory',
      payload,
      success: ({ data, thunkAPI }) => {
         thunkAPI.dispatch(CashRegisterActions.setInventory(data));
      }
   })
};

export default CashRegisterThunks;
