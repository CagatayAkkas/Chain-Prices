import { convertTimestampToDate, convertTimestampToTime } from "../../../Constants/Helpers";
import TransactionStatusEnums from "../../../Constants/TransactionStatusEnums";
import DetailButton from "../Components/DetailButton"
import EtherscanLink from "../Components/EtherscanLink";
import TransactionStatus from "../Components/TransactionStatus"

const useTransactionColumns = () => {
   return (
      [
         {
            field: "status", 
            headerTooltip: "Status", 
            cellRenderer: TransactionStatus, 
            tooltipValueGetter: (row) => row.data.status === TransactionStatusEnums.success ? "Valid transaction" : "Invalid transaction",
         },
         { 
            field: "date",
            headerTooltip: "Date", 
            valueGetter: (row) => convertTimestampToDate(row.data.timestamp),
            tooltipValueGetter: (row) => convertTimestampToDate(row.data.timestamp),
            comparator: (...[, , rowA, rowB]) => {
               return (rowA.data.timestamp == rowB.data.timestamp) ? 0 : (rowA.data.timestamp > rowB.data.timestamp) ? 1 : -1;
           },
         },
         { 
            field: "time",
            headerTooltip: "Time", 
            valueGetter: (row) => convertTimestampToTime(row.data.timestamp),
            tooltipValueGetter: (row) => convertTimestampToTime(row.data.timestamp),
         },
         { 
            field: "marketAddress", 
            headerName: "Market Address", 
            headerTooltip: "Market Address", 
            tooltipField: "marketAddress" 
         },
         { 
            field: "transactionHash", 
            headerName: "Transaction Hash", 
            headerTooltip: "Transaction Hash", 
            tooltipField: "transactionHash" 
         },
         { 
            field: "etherscan", 
            headerTooltip: "Etherscan", 
            tooltipValueGetter: (row) => row.data.etherscan,
            cellRenderer: EtherscanLink, 
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

export default useTransactionColumns;