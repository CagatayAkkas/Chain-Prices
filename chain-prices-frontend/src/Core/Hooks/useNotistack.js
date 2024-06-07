import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppConfigActions } from '../Store/AppConfig.slice';

let displayed = [];

const useNotistack = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.AppConfig);
  const { enqueueSnackbar  } = useSnackbar();

  const addSnackbar = (key) => {
    displayed.push(key);
  };

  const removeSnackbar = (key) => {
    displayed = [...displayed.filter((id) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      const { message, options } = notification;

      // do nothing if snackbar is already displayed
      if (displayed.includes(options.key)) {
        return;
      }

      // display snackbar using notistack
      enqueueSnackbar(message, {
        ...options,
        // remove this snackbar from redux store and displayed
        onExited: (_, key) => {
          dispatch(AppConfigActions.closeSnackbar(key));
          removeSnackbar(key);
        }
      });

      addSnackbar(options.key);
    });
  }, [notifications]);

};

export default useNotistack;