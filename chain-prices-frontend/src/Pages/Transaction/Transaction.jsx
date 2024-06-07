import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { alpha } from "@mui/material";
import { ThemeEnums } from "../../Core/Constants";
import { Table } from '../../Core/Components/Table/Table.style';
import TableHeader from "./Components/TableHeader";
import NoDataOverlay from "../../Components/NoDataOverlay/NoDataOverlay";
import { StyledTransaction } from "./Style/Transaction.style";
import { useTheme } from "@emotion/react";
import Loading from "../../Components/Loading/Loading";
import TransactionThunks from "./Store/Transaction.thunk";
import { useThunk } from "../../Core/Hooks";
import useTransactionColumns from "./Hooks/useTransactionColumns";
import ProductDetail from "../../Components/ProductDetail/ProductDetail";
import TransactionStatusEnums from "../../Constants/TransactionStatusEnums";

const defaultColDef = {
   flex: 1,
   minWidth: 150
};

const Transaction = () => {
   const themeMode = useSelector((state) => state.AppConfig.theme);
   const transactions = useSelector((state) => state.Transaction.transactions);
   const theme = useTheme();
   const gridRef = useRef();
   const [search, setSearch] = useState("");

   const { isLoading } = useThunk("getTransactions");
   const { isLoading: isLoadingGetProductById } = useThunk("getProductById");

   const [rowData, setRowData] = useState([]);
    
   const colDefs = useTransactionColumns();

   const getRowStyle = useCallback((params) => {
      if (params.data.status === TransactionStatusEnums.success) {
         return { background: alpha(theme.palette.success.main, 0.5) }
      }
      return { background: alpha(theme.palette.error.main, 0.5) }
   }, [theme]);

   const onModalUpdated = useCallback((event) => {
      event.api.getDisplayedRowCount() === 0 ? 
        event.api.showNoRowsOverlay() : 
        event.api.hideOverlay();
   }, []);

   useEffect(() => {
      if (gridRef?.current?.api) {
         gridRef.current.api.setQuickFilter(search);
      }
   }, [search]);

   useEffect(() => {
      setRowData(transactions);
   }, [transactions]);

   useEffect(() => {
      TransactionThunks.getTransactions();
   }, []);

   return (
      <StyledTransaction>
         <TableHeader searchState={[search, setSearch]} gridRef={gridRef} />
         <div style={{ position: "relative"}} className={themeMode === ThemeEnums.LIGHT ? "ag-theme-quartz" : "ag-theme-quartz-dark"} >
            { (isLoading || isLoadingGetProductById) && <Loading blur size={80} /> }
            <Table 
               ref={gridRef}
               rowData={rowData}
               columnDefs={colDefs} 
               getRowStyle={getRowStyle}
               defaultColDef={defaultColDef}
               domLayout='autoHeight'
               pagination
               paginationPageSize={10}
               paginationPageSizeSelector={false}
               rowHeight={60}
               headerHeight={60}
               noRowsOverlayComponent={NoDataOverlay}
               onModelUpdated={onModalUpdated}
               suppressCellFocus
               tooltipShowDelay={500}
               tooltipMouseTrack={true}
               tooltipInteraction={false}
            />
         </div>
         <ProductDetail />
      </StyledTransaction>
   )
}

export default Transaction;