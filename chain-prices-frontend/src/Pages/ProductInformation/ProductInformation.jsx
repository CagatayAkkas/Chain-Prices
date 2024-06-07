import { useSelector } from "react-redux";
import { Table } from "../../Core/Components/Table/Table.style";
import { ThemeEnums } from "../../Core/Constants";
import { StyledProductInformation } from "./Style/ProductInformation.style"
import { useCallback, useEffect, useRef, useState } from "react";
import NoDataOverlay from "../../Components/NoDataOverlay/NoDataOverlay";
import TableHeader from "./Components/TableHeader";
import ProductDetail from "../../Components/ProductDetail/ProductDetail";
import useProductInformationColumns from "./Hooks/useProductInformationColumns";
import ProductInformationThunks from "./Store/ProductInformation.thunk";
import { useThunk } from "../../Core/Hooks";
import Loading from "../../Components/Loading/Loading";

const defaultColDef = {
   flex: 1,
};

const ProductInformation = () => {
   const themeMode = useSelector((state) => state.AppConfig.theme);
   const products = useSelector((state) => state.ProductInformation.products);
   const gridRef = useRef();
   const [search, setSearch] = useState("");
   const [rowData, setRowData] = useState([]);
   const colDefs = useProductInformationColumns();

   const { isLoading } = useThunk("getProducts");
   const { isLoading: isLoadingGetProductById } = useThunk("getProductById");

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
      setRowData(products);
   }, [products]);

   useEffect(() => {
      ProductInformationThunks.getProducts();
   }, []);

   return (
      <StyledProductInformation>
         <TableHeader searchState={[search, setSearch]} gridRef={gridRef} />
         <div className={themeMode === ThemeEnums.LIGHT ? "ag-theme-quartz" : "ag-theme-quartz-dark"}>
            { (isLoading || isLoadingGetProductById) && <Loading blur /> }
            <Table 
               ref={gridRef}
               rowData={rowData}
               columnDefs={colDefs} 
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
      </StyledProductInformation>
   )
}

export default ProductInformation