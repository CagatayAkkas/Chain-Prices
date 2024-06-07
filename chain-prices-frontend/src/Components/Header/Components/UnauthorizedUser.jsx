import { Button } from "@mui/material"
import { StyledUnauthorizedUser } from "../Header.style"
import snackbar from "../../../Core/Utils/snackbar";
import { SnackbarEnums } from "../../../Core/Constants";
import AppConfigThunk from "../../../Core/Store/AppConfig.thunk";

const UnauthorizedUser = () => {

   const connectWithMetamask = async () => {
      if (typeof window.ethereum !== "undefined") {
         try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await  window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
               //* Select first account id always, if even user connects with multiple account
               const account = accounts[0];
               AppConfigThunk.auth(account);
            }
         } catch (error) {
            snackbar(error?.message || "Connection Failed!", { variant: SnackbarEnums.ERROR })
            console.log(error, " error");
         }
      } else {
         snackbar(
            "Please add the metamask extension to your browser", 
            { variant: SnackbarEnums.INFO }
         )
      }
   };

   return (
      <StyledUnauthorizedUser>
         <Button onClick={connectWithMetamask} variant="contained"> Connect With Metamask </Button>
      </StyledUnauthorizedUser>
   )
}

export default UnauthorizedUser