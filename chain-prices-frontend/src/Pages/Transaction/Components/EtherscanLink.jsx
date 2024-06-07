import PropTypes from 'prop-types';
import { StyledEtherscanLink } from '../Style/Transaction.style';

const EtherscanLink = (props) => {

   return (
      <StyledEtherscanLink target='_blank' href={props.data.etherscan}> { props.data.etherscan } </StyledEtherscanLink>
   )
};

export default EtherscanLink;

EtherscanLink.propTypes = {
   data: PropTypes.object.isRequired
}