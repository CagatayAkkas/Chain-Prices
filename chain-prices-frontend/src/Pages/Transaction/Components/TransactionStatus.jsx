import PropTypes from 'prop-types';
import BadStatusIcon from '@mui/icons-material/Clear';
import GoodStatusIcon from '@mui/icons-material/Done';
import { StyledTransactionStatus } from '../Style/Transaction.style';
import TransactionStatusEnums from '../../../Constants/TransactionStatusEnums';

const TransactionStatus = ({ data }) => {

   return (
      <StyledTransactionStatus>
         { 
            data.status === TransactionStatusEnums.success
               ? <GoodStatusIcon sx={{ color: "success.main" }} />
               : <BadStatusIcon sx={{ color: "error.main" }} /> 
         }
      </StyledTransactionStatus>
   )
}

export default TransactionStatus;

TransactionStatus.propTypes = {
   data: PropTypes.object.isRequired
}

