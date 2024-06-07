import { Autocomplete, Box, Button, TextField } from '@mui/material';
import {CashRegisterWrapper} from './Style/CashRegister.styled';
import BarcodeScanner from '../../Components/BarcodeScanner/BarcodeScanner';
import { useDispatch, useSelector } from 'react-redux';
import { CashRegisterActions } from './Store/CashRegister.slice';
import SuccessModal from '../Supply/Components/SuccessModal';
import { useEffect, useState } from 'react';
import CashRegisterThunks from './Store/CashRegister.thunk';
import { ethers } from "./ethers-5.6.esm.min.js";
import contractAbi from '../../Constants/ContractAbi.js';
import snackbar from '../../Core/Utils/snackbar.js';
import SnackbarEnums from '../../Core/Constants/SnackbarEnums.js';
import Loading from '../../Components/Loading/Loading.jsx';
import Product from './Components/Product.jsx';

const CashRegister = () => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.CashRegister.basket);
    const inventory = useSelector((state) => state.CashRegister.inventory);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pricesStatus, setPricesStatus] = useState([]);
    const showSell = basket.length > 0;

    const incrementHandler = (productDetail) => {
        dispatch(CashRegisterActions.increment(productDetail.id))
    };  

    const addBasketHandler = () => {
        const newProduct = basket.find((basketProduct) => basketProduct.productCode === selectedProduct?.Product?.productCode)
        if(selectedProduct !== null && !newProduct) {
            dispatch(CashRegisterActions.setBasket(selectedProduct.Product));
            setSelectedProduct(null);
            return;
        }
        if(selectedProduct !== null && newProduct) {
            incrementHandler(newProduct);
            setSelectedProduct(null);
            return;
        }
    };

    const onDetectHandler = (barcode) => {
        const targetProduct = inventory.find((product) => product.Product.barcode === barcode) || null;
        setSelectedProduct(targetProduct)
    }

    const sellButtonHandler = async () => {
        const isNotValidPrice = pricesStatus.some((status) => status === false);
        if (isNotValidPrice) {
            snackbar("Prices must be positive!", { variant: SnackbarEnums.ERROR })
            return;
        }
        setLoading(true);
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

            const allTxReceipt = await Promise.all(basket.map(async (item) => {
                const tx = await contract2.transaction(item.amount, item.price, item.productCode, _marketAddress);
                return await provider2.waitForTransaction(tx.hash);
            }));

            const isAllSuccess = allTxReceipt.every((txReceipt) => txReceipt && txReceipt.status === 1);

            if (isAllSuccess) {
                snackbar("Transaction has been completed successfully")
                setSelectedProduct(null)
                dispatch(CashRegisterActions.resetBasket())
            } else {
                snackbar("Error occurs for some transactions", { variant: SnackbarEnums.ERROR })
            }
        } catch (error) {
            snackbar(error?.message || "Error occurs!", { variant: SnackbarEnums.ERROR })
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const getAddress = async () => {
            //The provider value will come from the metamask extension
            const provider2 = new ethers.providers.Web3Provider(window.ethereum);
            //The signer is the one that will sign the transaction.
            const signer2 = provider2.getSigner();
            //The address who BUYS THE PRODUCT -> Normally this code needs to be the market address. However when we use the demo this will act as a customer.
            const _marketAddress = await signer2.getAddress();
            return _marketAddress
        }
        getAddress().then((result) => {
            CashRegisterThunks.getInventory({ identifier: result });
        }).catch((err) => {
            snackbar(err?.message || "Error occurs", { variant: SnackbarEnums.ERROR })
        });
     }, []);

    return (
        <CashRegisterWrapper>
            <SuccessModal />
            <div className='cash-container'>
                { loading && <Loading blur size={70} /> }
                <div className='barcode'>
                    <Autocomplete 
                        className='barcode-input'
                        options={inventory}
                        getOptionLabel={(option) => option.Product.barcode}
                        onChange={(event, newValue) => {
                            setSelectedProduct(newValue);
                        }}
                        value={selectedProduct}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img
                                loading="lazy"
                                width="50"
                                src={option.Product.image_url}
                                alt=""
                              />
                              {option.Product.barcode} - {option.Product.name}
                            </Box>
                          )}
                        renderInput={(params) => (
                            <div className='scan-barcode'>
                                <TextField
                                    {...params}
                                    label="Enter Barcode Manually"
                                    inputProps={{
                                        ...params.inputProps
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                         endAdornment: (
                                            <>
                                                { params.InputProps.endAdornment }
                                                <BarcodeScanner onDetected={onDetectHandler} />
                                            </>
                                         )
                                      }}
                                />
                            </div>
                        )}
                    />
                    <Button sx={{padding: '15px 30px'}} variant='contained' onClick={(e) => addBasketHandler(e)}>
                        ADD
                    </Button>
                </div>
                <div className='product-container'>
                    {
                      basket.map((product, index) => (
                            <Product 
                                key={product.id} 
                                product={product} 
                                pricesStatus={pricesStatus}
                                setPricesStatus={setPricesStatus} 
                                index={index}
                            />
                        )
                       )
                    }
                </div>
                {
                    showSell &&
                    <div className='payment-button'>
                        <Button variant='contained' onClick={sellButtonHandler}> SELL </Button>
                    </div>
                }
            </div>
            
        </CashRegisterWrapper>
    )
}

export default CashRegister