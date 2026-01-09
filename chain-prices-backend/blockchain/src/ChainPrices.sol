// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// @title ChainPrices
// @dev This contract allows users to manage transactions, balances, and penalties.
// @author CagatayAkkas
contract ChainPrices {
    address public admin;
    uint256 marketId = 1;
    uint256 sellerId = 1;
    uint256 requestId = 1;

    // @dev Represents the price of the product.
    uint256 public s_priceOfTheProduct;

    // @dev Maps an address to its stored money.
    mapping(address => uint256) public vault;

    // @dev Maps an address to its debt (possibly owed money).
    mapping(address => uint256) public debt;

    // @dev Maps products id's to related IPFS hashes.
    mapping(uint256 => bytes32) public productToIPFS;

    // @dev Maps market id's to related market addresses.
    mapping(address => uint256) public idToMarket;

    mapping(address => uint256) public idToSeller;


    mapping(address => mapping(uint256 => bool)) buyRequests;

    // @dev Event to log transactions with product code and price.
    event Transaction(
        uint256[] _amountOfProduct,
        uint256[] _priceOfTheProduct,
        uint256[] _productCode,
        address _marketAddress
    );
    event buyRequest(
        uint256[] _amountOfProduct,
        address[] _productCode,
        address _marketAddress,
        address _sellerAddress,
        uint256 _requestId
    );

    event buyRequestAccepted(
        address _sellerAddress,
        address _marketAddress, 
        uint256 _requestId
    );

    event punishment(bool indexed _punishment);

    modifier onlyAdmin(){
       require(msg.sender == admin , "Only admin can call this function");
       _;
    }

    modifier onlyMarket(address _caller){
        require(msg.sender == admin || idToMarket[_caller] != 0 , "Only admin or valid market");
        _;
    }

    modifier onlySeller(address _caller){
        require(msg.sender == admin || idToSeller[_caller] != 0 , "Only admin or valid market");
        _;
    }

    constructor(address _admin) public {
        admin = _admin;
    }

    // @dev Function to add money to a market's vault.
    // @param moneyAmount Amount of money to add.
    // @param marketAddress Address of the market.
    function addMoney(address marketAddress) public payable {
        vault[marketAddress] += msg.value;
    }

    // @dev Records the market transactions on-chain via events.
    // @notice This function is not called by customers but the markets at the payment period.
    // @param _amountOfProduct amount of the product.
    // @param _priceOfTheProduct Price of the product.
    // @param _productCode Address representation of the product code.
    // @param _marketAddress address of the market.
    function transaction(
        uint256[] memory _amountOfProducts,
        uint256[] memory _priceOfProducts,
        uint256[] memory _productCodes
    ) public onlyMarket(msg.sender) {

        require(
        _amountOfProducts.length == _priceOfProducts.length && 
        _priceOfProducts.length == _productCodes.length, 
        "Array lengths must match"
        );

        emit Transaction(
            _amountOfProducts,
            _priceOfProducts,
            _productCodes,
            msg.sender
        );
    }

    // @dev Function to apply a penalty to an address.
    // @param penaltyFee Amounts of the penalty.
    // @param guiltyAddress Addresses to be penalized.
    function punish(
        address[] memory guiltyAddress,
        uint256[] memory penaltyFee
    ) public onlyAdmin returns (bool) {
        require(guiltyAddress.length == penaltyFee.length, "Array lengths must match");

        for (uint256 i = 0 ; i < guiltyAddress.length ; i++){
            if (vault[guiltyAddress[i]] < penaltyFee[i]) {
                debt[guiltyAddress[i]] += penaltyFee[i] - vault[guiltyAddress[i]];
                vault[guiltyAddress[i]] = 0;
            } else {
                vault[guiltyAddress[i]] = vault[guiltyAddress[i]] - penaltyFee[i];
            }
            emit punishment(true);
        }
        return true;
    }

    // @dev Function to buy a product, deducting the cost from the vault.
    // @param marketAddress Address of the market.
    // @param priceOfTheProduct Price of the product to be bought.
    function requestProduct(
        uint256[] memory amountOfProducts,
        address[] memory addressOfProducts,
        address marketAddress,
        address sellerAddress
    ) public onlyMarket(msg.sender) {

            requestId++;
            buyRequests[sellerAddress][requestId] = false;
            emit buyRequest(
                amountOfProducts,
                addressOfProducts,
                msg.sender,
                sellerAddress,
                requestId
            );
    }
    

    //@dev Function to decrease the money from market's account when market's buy request accepted.
    //@param totalPrice for the amount of money market send for buying new product.
    //@param marketAddress is for the address of market which buys the products.
    function buyProduct(address marketAddress , uint256 _requestId) public onlySeller(msg.sender){
        buyRequests[msg.sender][_requestId] = true;
        emit buyRequestAccepted(msg.sender , marketAddress, _requestId);
    }

    function rejectRequest(address _seller, uint256 _requestId) public onlyAdmin(){
        delete buyRequests[_seller][_requestId];
    }

    function withdrawMoney() public onlyAdmin{
        msg.sender.call{value: address(this).balance}("");
    }

    // @dev Function to check the money stored in a market's vault.
    // @param marketAddress Address of the market.
    // @return Amount of money in the vault.
    function checkVault(address marketAddress) public view returns (uint256) {
        return vault[marketAddress];
    }

    // @dev Function to check the debt (owed money) of a market.
    // @param marketAddress Address of the market.
    // @return Amount of money in the debt.
    function checkdebt(address marketAddress) public view returns (uint256) {
        return debt[marketAddress];
    }

    function addMarket(address _market) public onlyAdmin{
        idToMarket[_market] = marketId;
        marketId++;
    }

    function addSeller(address _seller) public onlyAdmin{
        idToSeller[_seller] = sellerId;
        sellerId++;
    }

    function removeMarket(address _marketAddress) public onlyAdmin{
        delete idToMarket[_marketAddress];
    }

    function removeSeller(address _sellerAddress) public onlyAdmin{
        delete idToSeller[_sellerAddress];
    }

    function addProductToIPFS(uint256 _id , bytes32 _hash) public onlyAdmin{
        productToIPFS[_id]= _hash; 
    }

    function RemoveProductToIPFS(uint256 _id) public onlyAdmin{
        delete productToIPFS[_id];
    }
}
