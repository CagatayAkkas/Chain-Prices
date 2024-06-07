import { createSlice } from '@reduxjs/toolkit';
import { ModalEnums } from '../../../Core/Constants';

const NAME = 'Supply';

const initialState = {
    basket: [],
    products: [],
    finePrice: 0,
    isOpenErrorModal: ModalEnums.CLOSE,
    isOpenSuccessModal: ModalEnums.CLOSE,
    isOpenConfirmModal: ModalEnums.CLOSE,
};

const SupplySlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      increment(state, action) {
        state.basket = state.basket.map((basketObj) => {
          if(basketObj.id === action.payload) {
            return {...basketObj, amount: basketObj.amount + 1}
          }
          return basketObj
        })
      },
      decrement(state, action) {
        state.basket = state.basket.map((basketObj) => {
          if(basketObj.id === action.payload) {
            return {...basketObj, amount: basketObj.amount - 1}
          }
          return basketObj
        })
      },
      resetBasket: (state) => {
        state.basket = []
      },
      setBasket: (state, action) => {
        state.basket = [...state.basket, {...action.payload, amount: 1}]
      },
      setFinePrice: (state, action) => {
        state.finePrice = action.payload;
      },
      removeFromBasket: (state, action) => {
        state.basket = state.basket.filter((obj) => obj.id !== action.payload)
      },
      setProducts: (state, action) => {
        state.products = action.payload;
      },
      setIsOpenErrorModal: (state, action) => {
        state.isOpenErrorModal = action.payload;
      },
      setIsOpenSuccessModal: (state, action) => {
        state.isOpenSuccessModal = action.payload;
      },
      setIsOpenConfirmModal: (state, action) => {
        state.isOpenConfirmModal = action.payload;
      },
   }
});
const { actions, reducer } = SupplySlice;

export const SupplyActions = actions;
export default { [NAME]: reducer };