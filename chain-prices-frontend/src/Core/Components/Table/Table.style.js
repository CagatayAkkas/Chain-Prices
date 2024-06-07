import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import styled from "@emotion/styled";

// Add CSS here to customize table
export const Table = styled(AgGridReact)`
   .ag-root-wrapper {
      .ag-root {
         .ag-body {
            height: ${(props) => props.$height || "600px"};
         }
         .ag-header {
            .ag-header-cell-label {
               justify-content: center;
            }
         }
         .ag-row {
            .ag-cell {
               text-align: center;
               line-height: 55px;
            }
         }
         .ag-pinned-right-cols-container {
            .ag-row {
               background: #FFFFFF;
            }
         }
         .ag-horizontal-right-spacer {
            display: none; // Todo : check
         }
      }
   }
`;