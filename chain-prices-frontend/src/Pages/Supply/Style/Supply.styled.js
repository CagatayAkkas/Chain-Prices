import styled from "@emotion/styled";
import { StyledPageWrapper } from "../../../Components/Layout/Layout.style";

export const SupplyWrapper = styled(StyledPageWrapper)`
    display: flex;
    flex-direction: column;
    .supply-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .basket {
            .MuiButtonBase-root {
                padding: 10px 40px;
                font-size: 24px; 
            }
            .basket-wrapper {
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                padding: 20px;
                .product-names-container {
                    display: flex;
                    flex-direction: column;
                }
                .add-button {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }
            }
        }
    }
    .product-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 60px;
        margin-top: 50px;
        .product-wrapper {
            width: 100%;
            .product-info-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid #DCDCDC;
                border-radius: 15px;
                padding: 30px;
                height: 100%;
                .product-information {
                    flex: 1;
                    width: 100%;
                    .product-image {
                        text-align: center;
                        img {
                            width: 100%;
                            max-width: 300px;
                            aspect-ratio: 1 / 1;
                        }
                    }
                    .product-name {
                        text-align: center;
                        margin: 10px 0;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        abbr {
                            text-decoration: none;
                        }
                        /* display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical; */
                    }
                    .box-bottom {
                        font-weight: bold;
                        .product-number {
                            display: flex;
                            gap: 10px;
                            padding: 10px;
                        }
                        .price {
                            padding: 10px;
                            text-align: center;
                        }
                    }
                }
                .add-button-wrapper {
                    margin-top: 10px;
                }   
            }
        }  
    } 
`;

export const BasketWrapper = styled(StyledPageWrapper)`
    .basket-header {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .basket-list-container {
        display: flex; 
        flex-direction: column;
        gap: 30px;
        margin-top: 50px;
        .no-product-message {
            color: gray;
            display: flex;
            justify-content: center;
            font-size: 22px;
            margin-top: 30px;
        }
        .product-details {
            display: flex;
            gap: 20px;
            align-items: center;
            justify-content: space-between;
            font-weight: bold;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            padding: 30px;
            .product-name {
                white-space: normal;
            }
            img {
                max-width: 250px;
                min-width: 150px;
                aspect-ratio: 1 / 1;
            }
            .button-group {
                display: flex;
                align-items: center;
                gap: 10px;
                .MuiButton-root {
                    white-space: nowrap;
                }
            }
            .price {
                white-space: nowrap;
            }
        }
    }
    .payment-container {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
    @media (max-width: 900px) {
        .basket-list-container {
            .product-details {
                flex-direction: column;
            }
        }
        .payment-container {
            justify-content: stretch;
            button {
                width: 100%;
            }
        }
    }
`;

export const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: #FFFFFF;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    outline: none;
    gap: 20px;
    color: gray;
    .errorIcon {
        .MuiSvgIcon-root {
            fill: #d32f2f;
            width: 80px;
            height: 80px;
        }
    }
    .successIcon {
        svg {
            fill: green;
            width: 80px;
            height: 80px;
        }
    }
    .confirmIcon {
        .MuiSvgIcon-root {
            fill: #1976D2;
            width: 80px;
            height: 80px;
        }
    }
    .warning-message {
        font-size: 22px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            text-align: center;
        }
        .fine-amount {
            font-weight: bold;
        }
    }
    .button-container {
        margin-top: 20px;
        width: 100%;
        display: flex;
        gap: 50px;
        justify-content: center;
    }
    @media (max-width: 600px) {
        width: 95%;
    }
`;