import { createSlice } from '@reduxjs/toolkit';

const NAME = 'Transaction';

const initialState = {
   transactions: []
};

const TransactionSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      setTransactions: (state, action) => {
         state.transactions = action.payload;
      }
   }
});

const { actions, reducer } = TransactionSlice;

export const TransactionActions = actions;
export default { [NAME]: reducer };