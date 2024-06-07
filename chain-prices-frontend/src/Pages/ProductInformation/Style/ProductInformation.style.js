import styled from "@emotion/styled";
import { StyledPageWrapper } from "../../../Components/Layout/Layout.style";

export const StyledProductInformation = styled(StyledPageWrapper)`
   
`;

export const StyledTableHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 20px;
   gap: 10px;
   @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
   }
`;