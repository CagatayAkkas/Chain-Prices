import { SupplyWrapper } from "./Style/Supply.styled"
import Product from "./Components/Product";
import SupplyHeader from "./Components/SupplyHeader";
import { useEffect, useState } from "react";
import SupplyThunks from "./Store/Supply.thunk";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { useThunk } from "../../Core/Hooks";

const Supply = () => {
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const products = useSelector((state) => state.Supply.products);

    const { isLoading } = useThunk("getProducts");

    useEffect(() => {
        if (search) {
          setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
        } else {
          setFilteredProducts(products);
        }
    }, [search, products]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        SupplyThunks.getProducts();
    }, []);

    return (
        <SupplyWrapper>
            <SupplyHeader searchState={[search, setSearch]} products={products} />
            { 
                isLoading 
                    ? <Loading size={80} /> 
                    : (
                        <div className="product-container"> 
                            {filteredProducts.map((product) => (
                                <Product key={product.id} product={product} /> 
                            ))}
                        </div>
                    )
            }
        </SupplyWrapper>
    )
}


export default Supply;