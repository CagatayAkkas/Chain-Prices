import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ResponsivePadding = css`
   padding: 50px 200px;
   @media (max-width: 1536px) {
      padding: 50px 150px;
   }
   @media (max-width: 1206px) {
      padding: 50px 100px;
   }
   @media (max-width: 900px) {
      padding: 50px;
   }
   @media (max-width: 600px) {
      padding: 50px 25px;
   }
`;

export const StyledMainWrapper = styled.div`
   width: 100%;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
`;

export const StyledPageWrapper = styled.div`
   min-height: calc(100vh - 80px - 100px);
   transition: padding 350ms;
   ${ResponsivePadding};
`;