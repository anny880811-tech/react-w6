import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
    const [isLoading, setIsLoading] = useState('');
    const [products, setproducts] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`)
                setproducts(res.data.products);
                getCart();
            } catch (error) {
                console.dir("資料錯誤", error?.response?.data)
            };
        };
        getProducts();
    }, []);

    const handleView = (id) => { navigate(`/product/${id}`) }

    const getCart = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            setCartItem(res.data.data.carts);
        } catch (error) {
            console.dir("資料錯誤", error?.response?.data)
        }
    };

    const addToCart = async (product_id, qty) => {
        const sentData = {
            'data': {
                'product_id': product_id,
                'qty': qty
            }
        }
        try {
            setIsLoading(product_id);
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, sentData)
            getCart();
        } catch (error) {
            console.log("資料錯誤", error.response.data)
        } finally {
            setIsLoading('');
        }
    };

    return (<>
        <div className="container mt-5">
            <div className="row gx-3 gy-5">

                {products.map((product) => {
                    return (
                        <div className="col-4" key={product.id}>
                            <div className="custom-card">
                                <img src={product.imageUrl} className="custom-card-img" alt="主圖" />
                                <div className="custom-card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.category}</p>
                                    <p className="card-text mb-3">原價 : <del>{product.origin_price} 元</del> / 售價 : {product.price} 元</p>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-outline-brown" onClick={() => handleView(product.id)}>查看更多</button>
                                        <button type="button" className="btn btn-outline-brown" onClick={() => { addToCart(product.id, 1) }} disabled={isLoading === product.id}>
                                            {isLoading === product.id ? <div className="custom-loading"><Loading height={20} width={20} /> 正在加入購物車</div> : <div><i className="bi bi-cart-fill"></i>加入購物車</div>}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>


        </div>


    </>);
};

export default Products
