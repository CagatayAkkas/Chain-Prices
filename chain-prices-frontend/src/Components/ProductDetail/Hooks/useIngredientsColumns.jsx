import { Button } from "@mui/material"

const useIngredientsColumns = () => {
   return (
      [
         {
            field: "ingredientId", 
            headerName: "Ingredient Id",
            headerTooltip: "Ingredient Id",
            tooltipField: "ingredientId"
         },
         {
            field: "name", 
            headerName: "Ingredient Name",
            headerTooltip: "Ingredient Name", 
            tooltipField: "name"
         },
         {
            field: "origin", 
            headerName: "Origin",
            headerTooltip: "Origin", 
            tooltipField: "origin"
         },
         {
            field: "certificate", 
            headerName: "Certificate",
            headerTooltip: "Certificate", 
            sortable: false,
            cellRenderer: (row) => (
               <Button href={row.data.certificate} target="_blank" variant="contained"> Certificate </Button>
            )
         }
      ]
   )
}

export default useIngredientsColumns;