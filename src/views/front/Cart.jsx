import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {

    const [cartItem, setCartItem] = useState([]);

    const getCart = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            setCartItem(res.data.data.carts)
        } catch (error) {
            console.log("資料錯誤", error.response.data);
        }
    };

    useEffect(() => {
        getCart();
    }, [])



    const updateCartItem = async (id, product_id, qty) => {
        const updateQty = {
            'data': {
                'product_id': product_id,
                'qty': qty
            },
        };
        try {
            const res = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, updateQty)
            console.log(`修改成功!`);
            getCart();
        } catch (error) {
            console.log("資料錯誤", error.response.data);
        };
    };

    const deleteCartItem = async (id) => {
        try {
            const res = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`)
            console.dir(res.data);
            console.log(`刪除成功!`);
            getCart();
        } catch (error) {
            console.log("資料錯誤", error.response.data);
        }
    }



    return (<>
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <h3 className="custom-cart">我的購物車</h3>
                    <table className="custom-cart-table">
                        <thead>
                            <tr>
                                <th scope="col"><h5>商品明細</h5></th>
                                <th scope="col"><h5 className="text-center">數量</h5></th>
                                <th scope="col"><h5 className="text-center">合計</h5></th>
                                <th scope="col"><h5 className="text-center">刪除</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItem.map((product) => {
                                return (
                                    <tr key={product.product.id}>
                                        <td className="d-flex align-items-center py-3"><img src={product.product.imageUrl} style={{ 'height': '150px', 'width': '150px', 'objectFit': 'cover', 'borderRadius': '8px' }} className="d-flex" alt="商品圖" />
                                            <div className="ms-5">
                                                <div className="fw-bold"><h3>{product.product.title}</h3></div>
                                                <div className="small text-muted">{product.product.content}</div>
                                                <div className="mt-2 text-danger">NT${product.product.price} 元</div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="d-flex justify-content-center">
                                                <div className="input-group" style={{ width: '120px' }}>
                                                    <button type="button" className="btn btn-outline-brown" disabled={product.qty <= 1} onClick={() => { updateCartItem(product.id, product.product.id, product.qty - 1) }}>-</button>
                                                    <input type="text" className="form-control text-center border-secondary" value={product.qty} readOnly />
                                                    <button type="button" className="btn btn-outline-brown" onClick={() => { updateCartItem(product.id, product.product.id, product.qty + 1) }}>+</button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="d-flex justify-content-center">
                                                <h5>{product.product.price * product.qty}元</h5>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="d-flex justify-content-center">
                                                <i className="bi bi-trash3-fill" onClick={() => { deleteCartItem(product.id) }}></i>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="text-end mt-5">
                        <h4>總金額 : {cartItem.reduce((acc, item) => { return acc + (item.product.price * item.qty) }, 0)} 元</h4>
                    </div>
                </div>
            </div>
        </div>

    </>);
};

export default Cart;