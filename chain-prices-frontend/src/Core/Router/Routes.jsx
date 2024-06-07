import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Suspense, lazy, useEffect } from 'react';
import Roles from '../../Constants/Roles';

const Transaction = lazy(() => import("../../Pages/Transaction/Transaction"));
const ProductInformation = lazy(() => import("../../Pages/ProductInformation/ProductInformation"));
const Supply = lazy(() => import("../../Pages/Supply/Supply"))
const Basket = lazy(() => import("../../Pages/Supply/Components/Basket"));
const CashRegister = lazy(() => import("../../Pages/CashRegister/CashRegister"));

const RouteList = () => {
  const location = useLocation();
  const role = localStorage.getItem("role") || Roles.USER;

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location.pathname]);

   return (
      <Suspense fallback={<div />}>
         <Routes>
               <Route element={<ProtectedRoute />}>
                  <Route path='/' element={<Navigate to="/transactions" replace />} />
                  <Route path='/transactions' element={<Transaction />} />
                  <Route path='/productInformation' element={<ProductInformation />} />
                  <Route path='/*' element={<div> 404 PAGE </div>} />
               </Route>

               <Route element={<ProtectedRoute isAllowed={role === Roles.VENDOR || role === Roles.ADMIN} />}>
                  <Route path='/supply' element={<Supply />} />
                  <Route path='/basket' element={<Basket />} />
                  <Route path='/cashRegister' element={<CashRegister />}  />
               </Route>
         </Routes>
      </Suspense>
   );
};

export default RouteList;
