import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
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
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, sentData)
            console.dir(res.data.products);
            console.log(`已成功加入購物車`);
            getCart();
        } catch (error) {
            console.log("資料錯誤", error.response.data)
        };
    };

    return (<>
        <div className="container mt-5">
            <div className="row gx-3 gy-5">

                {products.map((product) => {
                    return (
                        <div className="col-4" key={product.id}>
                            <div className="card">
                                <img src={product.imageUrl} className="card-img-top object-fit-cover" style={{ 'height': '250px' }} alt="主圖" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.category}</p>
                                    <p className="card-text">原價 : <del>{product.origin_price} 元</del> / 售價 : {product.price} 元</p>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-outline-primary" onClick={() => handleView(product.id)}>查看更多</button>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => { addToCart(product.id, 1) }}><i className="bi bi-cart-fill"></i>加入購物車</button>
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
