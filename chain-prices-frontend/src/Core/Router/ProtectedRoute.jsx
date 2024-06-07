import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../Components/Header/Header';
import { StyledMainWrapper } from '../../Components/Layout/Layout.style';
import Fallback from '../../Components/Fallback/Fallback';

const ProtectedRoute = ({ isAllowed, redirectPath, state }) => {

   if (!isAllowed) {
      return <Navigate to={redirectPath} replace state={state} />;
   }

   return (
      <StyledMainWrapper>
         <Header />
         <Suspense fallback={<Fallback />}>
            <Outlet />
         </Suspense>
      </StyledMainWrapper>
   );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  state: PropTypes.any,
};

ProtectedRoute.defaultProps = {
  isAllowed: true,
  redirectPath: '/transactions',
  state: null
};