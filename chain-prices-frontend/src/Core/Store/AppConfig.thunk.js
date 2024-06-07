import ApiURL from "../../Constants/ApiURL";
import { HttpMethodEnums } from "../Constants";
import { request } from "../Request";
import { snackbar } from "../Utils";

const AppConfigThunk = {
   auth: (identifier) => request({
      method: HttpMethodEnums.POST,
      url: `${ApiURL.AUTH}`,
      key: 'auth',
      noToken: true,
      payload: { identifier },
      success: ({ data }) => {
         localStorage.setItem("token", data.token);
         localStorage.setItem("role", data.role);
         snackbar("Metamask connected successfully");
      }
   })
};

export default AppConfigThunk;
