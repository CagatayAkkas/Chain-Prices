import { useDispatch, useSelector } from "react-redux"
import { ModalWrapper } from "../Style/Supply.styled"
import { Button, Modal } from "@mui/material";
import { SupplyActions } from "../Store/Supply.slice";
import { ModalEnums, SnackbarEnums } from "../../../Core/Constants";
import ErrorIcon from '@mui/icons-material/Error';
import SupplyThunks from "../Store/Supply.thunk";
import { ethers } from "../../CashRegister/ethers-5.6.esm.min";
import { useState } from "react";
import contractAbi from "../../../Constants/ContractAbi";
import { snackbar } from "../../../Core/Utils";
import { useThunk } from "../../../Core/Hooks";
import Loading from "../../../Components/Loading/Loading";

const ErrorModal = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const isOpenErrorModal = useSelector((state) => state.Supply.isOpenErrorModal);
    const finePrice = useSelector((state) => state.Supply.finePrice);
    const basket = useSelector((state) => state.Supply.basket);

    const { isLoading: isLoadingFinalize } = useThunk("finalizePayment");

    const handleClose = () => {
        dispatch(SupplyActions.setIsOpenErrorModal(ModalEnums.CLOSE));
    };

    const handleConfirm = async () => {
        setLoading(true)
        try {
            // The contract address will be the same until we change the smart contract.
            const contractAddress = "0xE61e3151b10b689822E7F5fEdcF243ffD80c06b3";            
            //The provider value will come from the metamask extension
            const provider2 = new ethers.providers.Web3Provider(window.ethereum);
            //The signer is the one that will sign the transaction.
            const signer2 = provider2.getSigner();
            //The address who BUYS THE PRODUCT -> Normally this code needs to be the market address. However when we use the demo this will act as a customer.
            const _marketAddress = await signer2.getAddress();
            //The contract which made by releated parameters. Which we already deployed to on chain.
            const contract2 = new ethers.Contract(contractAddress, contractAbi, signer2);
            // the hard coded parameters will come from the gui
            const tx = await contract2.punish(100, _marketAddress);
            
            const txReceipt = await provider2.waitForTransaction(tx.hash);
        
            if (txReceipt && txReceipt.status === 1) {
                const payload = {
                    items: basket.map((sellingProduct) => (
                        {
                            productId: sellingProduct.id,
                            count: sellingProduct.amount
                        }
                    )),
                    totalPrice: basket.reduce((acc, current) => {
                        return acc + current.amount * current.maxPrice;
                    }, 0)
                }
                SupplyThunks.finalizePayment(payload)
            }
        } catch (error) {
            snackbar(error?.message || "Error occurs!", { variant: SnackbarEnums.ERROR })
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <Modal open={isOpenErrorModal} onClose={handleClose}>
                <ModalWrapper>
                    <div className="errorIcon">
                     { (loading || isLoadingFinalize) ? <Loading size={70} /> : <ErrorIcon /> }
                    </div>
                    <div className="warning-message">
                        <p>You have some fine that you need to pay. If you still want to order, you can pay fine. In total, this amount: </p>
                        <br />
                        <span className="fine-amount">{finePrice} TL</span>
                    </div>
                    <div className="button-container">
                        <Button 
                            variant="outlined" 
                            color="error" 
                            onClick={handleClose} 
                            disabled={loading || isLoadingFinalize}
                        >
                            End Process
                        </Button>
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={handleConfirm}
                            disabled={loading || isLoadingFinalize}
                        >
                            Pay Fine
                        </Button>
                    </div>
                </ModalWrapper>
            </Modal>
        </div>
    )
}

export default ErrorModal;