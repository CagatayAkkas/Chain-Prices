import { useDispatch, useSelector } from 'react-redux';
import { SupplyActions } from '../Store/Supply.slice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Product = ({product}) => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.Supply.basket);
    const basketProduct = basket.find((item) => item.id === product.id);

    const decrementHandler = () => {
        if(basketProduct.amount === 1) {
            dispatch(SupplyActions.removeFromBasket(product.id))
        } else {
            dispatch(SupplyActions.decrement(product.id))
        }
    };

    const incrementHandler = () => {
        dispatch(SupplyActions.increment(product.id))
    };  

    const addBasketHandler = () => {
        dispatch(SupplyActions.setBasket(product));
    };

    return (
        <div className='product-wrapper'>
            <div className="product-info-container">
                <div className='product-information'>
                    <div className="product-image">
                        <img src={product.image_url} />
                    </div>
                    <h3 className="product-name"><abbr title={product.name}> {product.name} </abbr></h3>
                    <div className="box-bottom"> 
                        <div className="price">
                            <span>{product.price} TL</span>
                        </div>
                    </div>
                </div>
                <div className='add-button-wrapper'>
                    {
                        basketProduct === undefined
                        ?
                        <Button
                            variant='contained'
                            onClick={addBasketHandler}
                        >
                        ADD
                        </Button>
                        : 
                        <div className="product-number"> 
                            <Button variant='contained' onClick={decrementHandler}>
                                {
                                    basketProduct.amount > 1 ? <RemoveIcon /> : <DeleteIcon />
                                }
                            </Button>
                            <Button disableRipple sx={{fontSize:19}}>{basketProduct.amount}</Button>
                            <Button variant='contained' onClick={incrementHandler}><AddIcon /></Button>
                        </div>
                    }
                </div>
            </div>    
        </div>
    )
}

export default Product;


Product.propTypes = {
    product: PropTypes.object.isRequired
 }