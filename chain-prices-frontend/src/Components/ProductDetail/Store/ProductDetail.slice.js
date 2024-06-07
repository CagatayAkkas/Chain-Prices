import { createSlice } from '@reduxjs/toolkit';
import { ModalEnums } from '../../../Core/Constants';

const NAME = 'ProductDetail';

const initialState = {
   isOpenProductDetailModal: ModalEnums.CLOSE,
   product: {},
};

const ProductDetailSlice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      setIsOpenProductDetailModal: (state, action) => {
         state.isOpenProductDetailModal = action.payload;
      },
      setProduct: (state, action) => {
         state.product = action.payload;
      }
   }
});

const { actions, reducer } = ProductDetailSlice;

export const ProductDetailActions = actions;
export default { [NAME]: reducer };