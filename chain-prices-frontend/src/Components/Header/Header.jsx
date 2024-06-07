import { useEffect } from "react";
import UnauthorizedUser from "./Components/UnauthorizedUser";
import { StyledHeader, StyledNavLink } from "./Header.style"
import Roles from "../../Constants/Roles";
import Drawer from "./Components/Drawer";
import { useMediaQuery } from "@mui/material";

const Header = () => {
   const token = localStorage.getItem("token");
   const role = localStorage.getItem("role") || Roles.USER;
   const up900px = useMediaQuery('(min-width: 900px)');

   useEffect(() => {
      const accountsChangedHandler = (accounts) => {
         if (!accounts.length) {
            localStorage.clear()
            window.location.reload();
         }
      }
      if (window.ethereum) {
         window.ethereum.on('accountsChanged', accountsChangedHandler);
      } else {
         console.log('metamask does not exist')
      }
   }, []);

   return (
      <StyledHeader>
         <h2 className="title"> Chain Prices </h2>
         <div className="pages">
            <StyledNavLink to="/transactions" className={({ isActive }) => (isActive ? 'active' : 'inactive')}> Transactions </StyledNavLink>
            <StyledNavLink to="/productInformation"> Product Information </StyledNavLink>
            { (role === Roles.VENDOR || role === Roles.ADMIN) && <StyledNavLink to="/supply"> Supply  </StyledNavLink> }
            { (role === Roles.VENDOR || role === Roles.ADMIN) && <StyledNavLink to="/cashRegister"> Cash Register  </StyledNavLink> }
         </div>
         <Drawer />
         { !token && up900px && <UnauthorizedUser /> }
      </StyledHeader>
   )
}

export default Header