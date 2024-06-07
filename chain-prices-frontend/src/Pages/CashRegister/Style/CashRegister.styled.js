import styled from "@emotion/styled";
import { StyledPageWrapper } from "../../../Components/Layout/Layout.style";

export const CashRegisterWrapper = styled(StyledPageWrapper)`
    .cash-container {
        position: relative;
        .barcode {
            display: flex;
            align-items: center;
            gap: 15px 30px;
            width: 100%;
            .barcode-input {
                width: 100%;
                .scan-barcode {
                    display: flex;
                    align-items: center;
                }
            }
        }
        .product-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
            margin-top: 50px;
            .product-line {
                display: flex;
                align-items: center;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                padding: 15px;
                gap: 50px;
                .product-info {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
            }
        }
        .payment-button {
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
        }
    }
    @media (max-width: 600px) {
        .cash-container {
            .barcode {
                flex-direction: column;
                align-items: stretch;
            }
        }
    }
`;