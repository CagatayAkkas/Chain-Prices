import { HttpResponseEnums, ThunkEnums } from '../Constants';
import { AppConfigActions } from '../Store/AppConfig.slice';

const getStatus = (actionStatus) => {
   switch (actionStatus) {
      case ThunkEnums.PENDING:
         return HttpResponseEnums.LOADING;
      case ThunkEnums.FULFILLED:
         return HttpResponseEnums.SUCCESS;
      case ThunkEnums.REJECTED:
         return HttpResponseEnums.FAILURE;
   default:
      throw new Error('Unknown actionStatus parameter!');
  }
};

const thunkMiddleware = (store) => (next) => (action) => {

   if (!action.type.includes('request')) {
      next(action);
      return;
   }
  
   const [, actionName, actionStatus] = action.type.split('/');

   store.dispatch(AppConfigActions.setRequestResult({ 
      actionName, 
      loadingValue: actionStatus === ThunkEnums.PENDING, 
      requestStatusValue: getStatus(actionStatus),
      errorValue: actionStatus === ThunkEnums.REJECTED ? action.payload : null
   }));

   next(action);
};

export default thunkMiddleware;