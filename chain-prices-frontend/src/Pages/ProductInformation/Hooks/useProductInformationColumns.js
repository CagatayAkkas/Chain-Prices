import DetailButton from "../Components/DetailButton"
import Image from "../Components/Image"

const useProductInformationColumns = () => {

   return (
      [
         {
            field: "image", 
            headerTooltip: "Image", 
            cellRenderer: Image, 
            tooltipValueGetter: (row) => row.data.name || '',
            sortable: false
         },
         {
            field: "name", 
            headerName: "Product Name",
            headerTooltip: "Product Name", 
            tooltipField: "name"
         },
         {
            field: "origin", 
            headerName: "Origin",
            headerTooltip: "Origin", 
            tooltipValueGetter: () => "Türkiye",
            valueGetter: () => "Türkiye"
         },
         {
            field: "barcode", 
            headerName: "Barcode",
            headerTooltip: "Barcode", 
            tooltipField: "barcode"
         },
         {
            field: "id", 
            headerName: "Product Id",
            headerTooltip: "Product Id", 
            tooltipField: "id"
         },
         { 
            field: "", 
            suppressMovable: true, 
            filter: false, 
            sortable: false,
            resizable: false, 
            width: 150,
            cellRenderer: DetailButton, 
            pinned: "right", 
            lockPosition: "right" 
         }
      ]
   )
}

export default useProductInformationColumns