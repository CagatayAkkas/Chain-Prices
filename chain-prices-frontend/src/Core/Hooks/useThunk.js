import { useDispatch, useSelector } from 'react-redux';
import { HttpResponseEnums } from '../Constants';
import { AppConfigActions } from '../Store/AppConfig.slice';

const useThunk = (actionName) => {
   const dispatch = useDispatch();
   if (!actionName) {
      throw new Error('Missing params in useThunk: actionName is undefined!');
   }

   const { loadings, requestStatuses, errors } = useSelector((state) => state.AppConfig);
   const isLoading = loadings?.[actionName] || false;
   const requestStatus = requestStatuses?.[actionName] || HttpResponseEnums.IDLE;
   const error = errors?.[actionName] || null;
   const isError = error !== null;
   const isSuccess = requestStatuses?.[actionName] === HttpResponseEnums.SUCCESS;
   const isIdle = requestStatuses?.[actionName] === HttpResponseEnums.IDLE;

   const setIdle = () => dispatch(AppConfigActions.setIdle({ actionName }));

   return { isLoading, requestStatus, error, isError, isSuccess, isIdle, setIdle };
};

export default useThunk;