import { createSlice } from '@reduxjs/toolkit';
import { HttpResponseEnums, SnackbarEnums, ThemeEnums } from '../Constants';

const NAME = 'AppConfig';

const initialState = {
  notifications: [],
  theme: ThemeEnums.LIGHT,
  loadings: {},
  requestStatuses: {},
  errors: {},
};

const AppConfigSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      enqueueSnackbar: (state, action) => {
         const newNotification = {
            message: action.payload?.message || '',
            options: {
               ...(action.payload?.options || {}),
               key: crypto.randomUUID(),
               variant: action.payload?.options?.variant || SnackbarEnums.SUCCESS
            }
         };      
         state.notifications.push(newNotification);
      },
      closeSnackbar: (state, action) => {
        state.notifications = state.notifications.filter((notification) => notification.options.key !== action.payload);
      },
      toggleTheme: (state) => {
         state.theme = state.theme === ThemeEnums.DARK ? ThemeEnums.LIGHT : ThemeEnums.DARK;
      },
      setRequestResult: (state, action) => {
        const { actionName, loadingValue, requestStatusValue, errorValue } = action.payload;
        state.loadings[actionName] = loadingValue;
        state.requestStatuses[actionName] = requestStatusValue;
        state.errors[actionName] = errorValue;
      },
      setIdle: (state, action) => {
        const { actionName } = action.payload;
        state.requestStatuses[actionName] = HttpResponseEnums.IDLE;
        state.errors[actionName] = null;
        state.loadings[actionName] = false;
      }
   }
});

const { actions, reducer } = AppConfigSlice;

export const AppConfigActions = actions;
export default { [NAME]: reducer };