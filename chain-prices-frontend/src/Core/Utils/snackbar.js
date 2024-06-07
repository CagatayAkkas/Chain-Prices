import { store } from "../../main";
import { AppConfigActions } from "../Store/AppConfig.slice";

const snackbar = (message, options) => store.dispatch(AppConfigActions.enqueueSnackbar({ message, options }));

export default snackbar;