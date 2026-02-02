import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const SingleProduct = () => {
    const [qty, setQty] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [product, setproduct] = useState({});
    const { id } = useParams();


    const getCart = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            setCartItem(res.data.data.carts)
        } catch (error) {
            console.log("資料錯誤", error.response.data);
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

            console.log(`已成功加入購物車`);
            getCart();
        } catch (error) {
            console.log("資料錯誤", error.response.data)
        };
    };

    useEffect(() => {
        const productDetail = async (id) => {
            try {
                const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
                setproduct(res.data.product);
            } catch (error) {
                console.dir("資料錯誤", error?.response?.data)
            }
        }
        productDetail(id);
        getCart();
    }, [id])

    return (<>
        <div className="container mt-5">
            <div className="row gx-5">
                <div className="col-4">
                    <div className="main-image-container">
                        <img src={product.imageUrl} className="product-main-img" alt="主圖" />
                    </div>
                    <div className="thumb-scroll-container">
                        <img src={product.imageUrl} className="thumb-item" alt="主圖" />
                        {product.imagesUrl?.map((image, index) => { return <img src={image} key={index} className="thumb-item" alt="更多圖片" /> })}
                    </div>
                </div>
                <div className="col-8">
                    <div id='colorBox' className="p-5 mb-3  rounded custom-color-box " style={{ 'backgroundColor': 'rgb(253, 247, 245)' }}>
                        <h3 className="card-title mb-2">{product.title}</h3><button type="button" className="btn btn-deepPink mb-3">{product.category}</button>
                        <h5 className="card-text">{product.content}</h5>
                        <p className="card-text">{product.description}</p>
                        <h4 className="card-text mb-3">原價 : <del>{product.origin_price} 元</del> / 售價 : {product.price} 元</h4>
                        <div className="mb-3">
                            <label htmlFor="qtySelect" className="form-label"></label>
                            <div className="d-flex align-items-center">
                                <select className="form-select w-auto" id="qtySelect" value={qty} onChange={(e) => { setQty(Number(e.target.value)) }}>
                                    {Array.from({ length: 15 }, (_, i) => {
                                        const num = i + 1;
                                        return (<option key={num} value={num}>{num}</option>)
                                    })}</select><span className="ms-2 fs-5 mb-0" style={{ 'color': 'rgb(109, 77, 67)' }} >{product.unit}</span>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-brown" onClick={() => { addToCart(product.id, qty) }}><i className="bi bi-cart-fill"></i>加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default SingleProduct;