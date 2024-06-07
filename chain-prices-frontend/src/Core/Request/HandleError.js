import { AxiosError } from 'axios';
import { snackbar } from '../Utils';
import { SnackbarEnums } from '../Constants';

export const handleError = (error) => {

   if (error instanceof AxiosError) {
      const { message } = error;

      if (error.response?.status === 404) {
         return snackbar(message || 'Page Not Found', { variant: SnackbarEnums.ERROR });
      }
   
      if (error?.response?.status === 401) {
         snackbar(message || 'Unauthorized!', { variant: SnackbarEnums.ERROR });
         localStorage.clear();
         window.location.reload();
         return; 
      }
   }

   return snackbar(error.message || "Something went wrong with the server", { variant: SnackbarEnums.ERROR });
};