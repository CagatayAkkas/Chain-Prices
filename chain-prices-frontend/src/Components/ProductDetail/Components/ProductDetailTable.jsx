import { useEffect, useRef, useState } from 'react'
import { StyledProductDetailTable } from '../Style/ProductDetail.style';
import { useSelector } from 'react-redux';
import { Table } from '../../../Core/Components/Table/Table.style';
import useIngredientsColumns from '../Hooks/useIngredientsColumns';
import { ThemeEnums } from '../../../Core/Constants';
import NoDataOverlay from '../../NoDataOverlay/NoDataOverlay';

const defaultColDef = {
   flex: 1
}

const ProductDetailTable = () => {
   const gridRef = useRef();
   const [rowData, setRowData] = useState([]);
   const themeMode = useSelector((state) => state.AppConfig.theme);
   const product = useSelector((state) => state.ProductDetail.product);
   const columnDefs = useIngredientsColumns();

   useEffect(() => {
      setRowData(product?.ingredients || []);
   }, [product]);

   return (
      <StyledProductDetailTable>
         <div className={themeMode === ThemeEnums.LIGHT ? "ag-theme-quartz" : "ag-theme-quartz-dark"}>
            <Table
               ref={gridRef}
               rowData={rowData}
               columnDefs={columnDefs} 
               defaultColDef={defaultColDef}
               domLayout='autoHeight'
               pagination
               paginationPageSize={5}
               paginationPageSizeSelector={false}
               rowHeight={60}
               headerHeight={60}
               $height={"300px"}
               noRowsOverlayComponent={NoDataOverlay}
               suppressCellFocus
               tooltipShowDelay={500}
               tooltipMouseTrack={true}
               tooltipInteraction={false}
            />
         </div>
      </StyledProductDetailTable>
   )
}

export default ProductDetailTable