import styled from "@emotion/styled";

export const StyledBarcodeScanner = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background: #FFFFFF;
   border-radius: 10px;
   padding: 20px;
   outline: none;
   .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      margin-bottom: 15px;
   }
   .drawingBuffer {
      height: 0;
      overflow: hidden;
   }
`;