import styled from "@emotion/styled";
import { StyledPageWrapper } from "../../../Components/Layout/Layout.style";

export const StyledTransaction = styled(StyledPageWrapper)`
   display: flex;
   justify-content: center;
   flex-direction: column;
   position: relative;
`;

export const StyledTableHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 20px;
`;

export const StyledTransactionStatus = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
`;

export const StyledEtherscanLink = styled.a`
   color: #181D1F;
`;






