import styled from "@emotion/styled";
import { alpha } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledHeader = styled.div`
   width: 100%;
   height: 80px;
   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
   padding: 10px 200px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: padding 350ms;
   .title {
      color: #1976d2;
   }
   .pages {
      display: flex;
      align-items: center;
      gap: 15px;
   }
   .drawer-wrapper {
      display: none;
   }

   @media (max-width: 1536px) {
      padding: 10px 150px;
   }
   @media (max-width: 1206px) {
      padding: 10px 100px;
   }
   @media (max-width: 900px) {
      padding: 10px 50px;
      .pages {
         display: none;
      }
      .drawer-wrapper {
         display: block;
      }
   }
   @media (max-width: 600px) {
      padding: 10px 25px;
      justify-content: space-between;
   }
`;

export const StyledNavLink = styled(NavLink)`
   text-decoration: none;
   color: ${(props) => props.theme.palette.primary.main};
   padding: 5px 20px;
   border-radius: 5px;
   transition: color 350ms, background-color 350ms;
   &.active {
      background-color: ${(props) => alpha(props.theme.palette.primary.main, 0.2)};
      font-weight: bold;
   }
   :hover {
      background-color: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
   }
`;

export const StyledAuthorizedUser = styled.div`
   
`;


export const StyledUnauthorizedUser = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
`;