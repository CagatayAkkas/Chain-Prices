import { Box, Divider, IconButton, Drawer as MuiDrawer, Stack, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";
import { StyledNavLink } from "../Header.style";
import Roles from "../../../Constants/Roles";
import MenuIcon from '@mui/icons-material/Menu';
import UnauthorizedUser from "./UnauthorizedUser";

const Drawer = () => {
   const [drawerOpen, setDrawerOpen] = useState(false);
   const down900px = useMediaQuery('(max-width: 900px)');
   const token = localStorage.getItem("token");
   const role = localStorage.getItem("role") || Roles.USER;

   const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }
      setDrawerOpen(open);
   };
   
   useEffect(() => {
      if (!down900px) {
         setDrawerOpen(false);
      }
   }, [down900px]);

   return (
      <div className="drawer-wrapper">
         <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon fontSize="large" sx={{ color: "#1976d2" }} />
         </IconButton>
         <MuiDrawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
               sx={{ width: 250 }}
               role="presentation"
               onClick={toggleDrawer(false)}
               onKeyDown={toggleDrawer(false)}
            >
               <Stack
                  padding={"30px 10px"}
                  gap={"10px"}
               >
                  <StyledNavLink 
                     to="/transactions" 
                     className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                  > 
                     Transactions 
                  </StyledNavLink>
                  <StyledNavLink to="/productInformation"> Product Information </StyledNavLink>
                  { (role === Roles.VENDOR || role === Roles.ADMIN) 
                        && <StyledNavLink to="/supply"> Supply  </StyledNavLink> }
                  { (role === Roles.VENDOR || role === Roles.ADMIN) 
                        && <StyledNavLink to="/cashRegister"> Cash Register </StyledNavLink> }
                  { !token && down900px && <> <Divider sx={{ margin: "15px 0" }} /> <UnauthorizedUser /> </> }
               </Stack>
            </Box>
         </MuiDrawer>
      </div>
   )
}

export default Drawer