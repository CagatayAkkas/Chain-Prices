import { createSlice } from '@reduxjs/toolkit';

const NAME = 'CashRegister';

const initialState = {
    basket: [],
    inventory: []
};

const CashRegisterSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      resetBasket: (state) => {
        state.basket = []
      },
      setBasket: (state, action) => {
        state.basket = [...state.basket, {...action.payload, amount: 1}]
      },
      increment(state, action) {
        state.basket = state.basket.map((basketObj) => {
          if(basketObj.id === action.payload) {
            return {...basketObj, amount: basketObj.amount + 1}
          }
          return basketObj
        })
      },
      removeFromBasket: (state, action) => {
        state.basket = state.basket.filter((obj) => obj.id !== action.payload)
      },
      decrement(state, action) {
        state.basket = state.basket.map((basketObj) => {
          if(basketObj.id === action.payload) {
            return {...basketObj, amount: basketObj.amount - 1}
          }
          return basketObj
        })
      },
      updateAmount(state, action) {
        state.basket = state.basket.map((basketObj) => {
          if(basketObj.id === action.payload.id) {
            return {...basketObj, price: action.payload.price}
            }
            return basketObj
        })
      },
      setInventory: (state, action) => {
        state.inventory = action.payload;
      },
   }
});

const { actions, reducer } = CashRegisterSlice;

export const CashRegisterActions = actions;
export default { [NAME]: reducer };