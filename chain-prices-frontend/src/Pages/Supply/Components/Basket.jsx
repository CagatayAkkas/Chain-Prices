import { useDispatch, useSelector } from "react-redux"
import { BasketWrapper } from "../Style/Supply.styled"
import { Button, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { SupplyActions } from "../Store/Supply.slice";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import SupplyThunks from "../Store/Supply.thunk";
import ConfirmModal from "./ConfirmModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Basket = () => {
    const basket = useSelector((state) => state.Supply.basket);
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const showButton = basket.length > 0;

    const totalPrice = basket.reduce((acc, current) => {
        return acc + current.amount * current.price;
    }, 0);

    const decrementHandler = (productDetail) => {
        if(productDetail.amount === 1) {
            dispatch(SupplyActions.removeFromBasket(productDetail.id))
        } else {
            dispatch(SupplyActions.decrement(productDetail.id))
        }
    };

    const incrementHandler = (productDetail) => {
        dispatch(SupplyActions.increment(productDetail.id))
    };  

    const goBack = () => {
        navigate("/supply")
    }

    const handlePayment = () => {
        const sellingItems = {
            items: basket.map((sellingProduct) => (
                {
                    productId: sellingProduct.id,
                    count: sellingProduct.amount
                }
            ))
        }
        dispatch(SupplyThunks.makePayment({ payload: sellingItems, totalPrice }))
    }

    return (
        <BasketWrapper>
            <ErrorModal />
            <SuccessModal />
            <ConfirmModal />
            <div className="basket-header">
                <IconButton onClick={goBack}>
                    <ArrowBackIcon sx={{ color: "#1976d2"}} />
                </IconButton>
                <Typography sx={{ color: "#1976d2" }} variant="h5" fontWeight={'bold'}> Basket </Typography>
            </div>
            <div className="basket-list-container">
                {
                    basket.length === 0
                    ? <div className="no-product-message"> No  product in basket! </div>
                    : basket.map((obj) => (
                        <div key={obj.id} className="product-details">
                            <img src={obj.image_url} />
                            <div className="product-name">{obj.name}</div>
                            <div className="button-group">
                                <Button variant='contained' onClick={() => decrementHandler(obj)}>
                                    { obj.amount > 1 ? <RemoveIcon /> : <DeleteIcon /> }
                                </Button>
                                <Button disableRipple sx={{fontSize:19}}>{obj.amount === 1 ? obj.amount + ' piece' : obj.amount + ' pieces'}</Button>
                                <Button variant='contained' onClick={() => incrementHandler(obj)}><AddIcon /></Button>
                            </div>
                            <div className="price">{obj.amount * obj.price} TL</div>
                        </div>
                      ))
                }
            </div>
            <div className="payment-container">
             {
                showButton 
                &&
                <Button variant="contained" onClick={handlePayment}>
                    {totalPrice} TL BUY NOW
                </Button> 
             }
            </div>
        </BasketWrapper>
    )
}

export default Basket;