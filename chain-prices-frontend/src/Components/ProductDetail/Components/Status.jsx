import BadStatusIcon from '@mui/icons-material/Clear';
import GoodStatusIcon from '@mui/icons-material/Done';
import { Stack, alpha, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import TransactionStatusEnums from '../../../Constants/TransactionStatusEnums';

const Status = () => {
   const theme = useTheme();
   const product = useSelector((state) => state.ProductDetail.product);

   return (
      <Stack 
         bgcolor={alpha(theme.palette[product.status === TransactionStatusEnums.success ? "success" : "error"].main, 0.3)}
         color={theme.palette[product.status === TransactionStatusEnums.success ? "success" : "error"].main}
         flexDirection={'row'}
         alignItems={'center'}
         gap={'15px'}
         borderRadius={'5px'}
         padding={'10px'}
         marginBottom={'30px'}
      > 
         { product.status === TransactionStatusEnums.success ? <GoodStatusIcon /> : <BadStatusIcon /> }
         { product.status === TransactionStatusEnums.success ? "This product was sold at an valid price." : "This product was sold at a invalid price." }
      </Stack>
   )
}

export default Status