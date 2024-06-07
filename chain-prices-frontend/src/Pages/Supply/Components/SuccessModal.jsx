import { Button, Modal } from '@mui/material';
import { ModalWrapper } from '../Style/Supply.styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { SupplyActions } from '../Store/Supply.slice';
import { ModalEnums } from '../../../Core/Constants';

const SuccessModal = () => {
    const dispatch = useDispatch();
    const isOpenSuccessModal = useSelector((state) => state.Supply.isOpenSuccessModal);

    const handleClose = () => {
        dispatch(SupplyActions.setIsOpenSuccessModal(ModalEnums.CLOSE));
    };

    return (
        <div>
            <Modal open={isOpenSuccessModal} onClose={handleClose}>
                <ModalWrapper>
                    <div className="successIcon"> <CheckCircleIcon /> </div>
                    <div className="warning-message">
                        <p> You bought the products successfully </p>
                    </div>
                    <div className='button-container'>
                        <Button variant='contained' onClick={handleClose} color='success'>
                            Got it!
                        </Button>
                    </div>
                </ModalWrapper>
            </Modal>
        </div>
    )
}

export default SuccessModal;