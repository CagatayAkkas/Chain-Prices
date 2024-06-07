import { css } from "@emotion/react";
import styled from "@emotion/styled"

export const StyledLoading = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   ${(props) => props.blur && css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(1px); 
      z-index: 9999;
   `}
`