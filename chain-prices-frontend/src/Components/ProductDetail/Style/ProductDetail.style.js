import styled from "@emotion/styled";

export const StyledProductDetailModal = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   outline: none;
   background: ${(props) => props.theme.palette.background.default};
   width: 900px;
   height: auto;
   border-radius: 10px;
   transition: width 350ms;
   .container {
      padding: 30px 40px;
      max-height: 85vh;
      overflow: auto;
   }
   @media (max-width: 900px) {
      width: 95%;
   }
   @media (max-width: 600px) {
      .container {
         padding: 30px 20px;
      }
   }
`;

export const StyledProductDetailTable = styled.div`
   
`;

export const StyledProductDetailView = styled.div`
   margin-bottom: 30px;
   .product-view {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .group {
         border-bottom: 1px solid rgba(0, 0, 0, 0.12);
         display: flex;
         align-items: center;
         padding: 10px 0;
         .key {
            font-weight: bold;
            width: 180px;
         }
         .value {
            flex: 1;
         }
      }
   }
   @media (max-width: 600px) {
      .transaction-view {
         grid-template-columns: 1fr;
      }
   }
`;

export const StyledProductDetailHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 10px;
   padding: 20px;
`;