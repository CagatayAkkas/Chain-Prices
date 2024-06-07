import Modal from '@mui/material/Modal';
import { StyledProductDetailModal } from './Style/ProductDetail.style';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailHeader from './Components/ProductDetailHeader';
import { Divider, Typography } from '@mui/material';
import ProductDetailView from './Components/ProductDetailView';
import ProductDetailTable from './Components/ProductDetailTable';
import Status from './Components/Status';
import { ProductDetailActions } from './Store/ProductDetail.slice';
import { ModalEnums } from '../../Core/Constants';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpenProductDetailModal = useSelector((state) => state.ProductDetail.isOpenProductDetailModal);
  const product = useSelector((state) => state.ProductDetail.product);

  const handleClose = () => {
    dispatch(ProductDetailActions.setIsOpenProductDetailModal(ModalEnums.CLOSE));
  };

  return (
    <div>
      <Modal
        open={isOpenProductDetailModal}
        onClose={handleClose}
      >
        <StyledProductDetailModal>
          <ProductDetailHeader handleClose={handleClose} />
          <Divider width={"calc(100% - 50px)"} sx={{ margin: "0 20px" }} />
          <div className="container">
            { location.pathname === "/transactions" && <Status /> }
            <Typography sx={{ marginBottom: "30px"}} fontSize={30} variant="h4"> { product.name } </Typography>
            <ProductDetailView />
            <ProductDetailTable />
          </div>
        </StyledProductDetailModal>
      </Modal>
    </div>
  );
};

export default ProductDetail;