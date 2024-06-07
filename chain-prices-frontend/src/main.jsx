import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './Core/Store/RootReducer.js'
import thunkMiddleware from './Core/Middleware/ThunkMiddleware.js'
import { SnackbarProvider } from 'notistack'

export const store = configureStore({
  reducer: { ...reducers },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
  </BrowserRouter>
)
