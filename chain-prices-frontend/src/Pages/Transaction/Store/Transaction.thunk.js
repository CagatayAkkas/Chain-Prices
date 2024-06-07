import ApiURL from "../../../Constants/ApiURL";
import { HttpMethodEnums } from "../../../Core/Constants";
import { request } from "../../../Core/Request";
import { TransactionActions } from "./Transaction.slice";

const TransactionThunks = {
   getTransactions: () => request({
      method: HttpMethodEnums.GET,
      url: `${ApiURL.TRANSACTION}`,
      key: 'getTransactions',
      noToken: true,
      success: ({ data, thunkAPI }) => {
         data.sort((a, b) => b.timestamp - a.timestamp)
         thunkAPI.dispatch(TransactionActions.setTransactions(data));
      }
   })
};

export default TransactionThunks;
