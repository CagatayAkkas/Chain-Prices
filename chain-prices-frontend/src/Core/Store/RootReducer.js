import SupplySlice from "../../Pages/Supply/Store/Supply.slice";
import AppConfigSlice from "./AppConfig.slice";
import TransactionSlice from "@/Pages/Transaction/Store/Transaction.slice";
import ProductDetailSlice from "@/Components/ProductDetail/Store/ProductDetail.slice";
import ProductInformationSlice from "@/Pages/ProductInformation/Store/ProductInformation.slice";
import CashRegisterSlice from "../../Pages/CashRegister/Store/CashRegister.slice";

const reducers = {
  ...AppConfigSlice,
  ...TransactionSlice,
  ...SupplySlice,
  ...ProductDetailSlice,
  ...ProductInformationSlice,
  ...CashRegisterSlice
}

export default reducers;