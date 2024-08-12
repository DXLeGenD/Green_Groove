import { useState } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";


const Cart = () => {
    const subtotal = 444;
    const shippingCharges = 80;
    const tax = subtotal * 0.18;
    const discount = -400;
    const total = subtotal + shippingCharges + tax - discount;
    const [couponCode, setCouponCode] = useState("")
    const cartItems = []
    const isValidCouponCode = false



    return (
        <div className="cart">
            <main>
                <CartItemCard photo="https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UL480_FMwebp_QL65_.jpg" name="Macbook Air" productId="123" price={400} quantity={10} />

            </main>
            <aside>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>
                    Discount: <em className="red"> - ₹{discount}</em>
                </p>
                <p>
                    <b>Total: ₹{total}</b>
                </p>

                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponCode &&
                    (isValidCouponCode ? (
                        <span className="green">
                            ₹{discount} off using the <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className="red">
                            Invalid Coupon <VscError />
                        </span>
                    ))}

                {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
            </aside>
        </div>
    );
};

export default Cart;
