import { createSlice } from '@reduxjs/toolkit';

const NAME = 'ProductInformation';

const initialState = {
   products: []
};

const ProductInformationSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      setProducts: (state, action) => {
         state.products = action.payload;
      }
   }
});

const { actions, reducer } = ProductInformationSlice;

export const ProductInformationActions = actions;
export default { [NAME]: reducer };