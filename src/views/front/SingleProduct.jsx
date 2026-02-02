import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const SingleProduct = () => {
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
                    <img src={product.imageUrl} className="card-img-top object-fit-cover mb-3" style={{ 'height': '400px', 'width': '400px' }} alt="主圖" />

                    {product.imagesUrl?.map((image, index) => { return <img src={image} key={index} className="card-img-top object-fit-cover" style={{ 'height': '200px', 'width': '200px' }} alt="更多圖片" /> })}
                </div>
                <div className="col-8">
                    <div id='colorBox' className="p-5 mb-3  rounded" style={{ 'backgroundColor': 'rgb(253, 247, 245)' }}>
                        <h3 className="card-title mb-2">{product.title}</h3><button type="button" className="btn btn-light mb-3">{product.category}</button>
                        <h5 className="card-text">{product.content}</h5>
                        <p className="card-text">{product.description}</p>
                        <h4 className="card-text mb-3">原價 : <del>{product.origin_price} 元</del> / 售價 : {product.price} 元</h4>
                        <h5>數量：{product.num}{product.unit}</h5>
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-primary" onClick={() => { addToCart(product.id, 1) }}><i className="bi bi-cart-fill"></i>加入購物車</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        {/* {
    "category": "身心靈與核心",
    "content": "結合體位法與呼吸法，放鬆壓力並提升身體柔軟度。",
    "description": "專業導師帶領，適合各種程度的學員，透過身心流動找回內心的平靜。",
    "id": "course-003",
    "is_enabled": 1,
    "origin_price": 1200,
    "price": 800,
    "title": "基礎流動瑜珈",
    "unit": "堂",
    "num": 1,
    "imageUrl": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1171&auto=format&fit=crop",
    "imagesUrl": ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1171&auto=format&fit=crop"]
  }, */}
    </>);
};

export default SingleProduct;