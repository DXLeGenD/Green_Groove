import { useState, useEffect } from "react";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// import StripeCheckout from "react-stripe-checkout";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "../firebase"


interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    photo: string;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
    const [subtotal, setSubtotal] = useState<number>(0);
    const shippingCharges = 80;
    const [user, setUser] = useState<User | null>(null); // To store the current user
    const discount = -400; // Adjust this value based on coupon code logic

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Load cart items from local storage when the component mounts
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(storedCartItems);
    }, []);

    // Recalculate subtotal whenever cartItems change
    useEffect(() => {
        const newSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(newSubtotal);
    }, [cartItems]);

    const total = subtotal + (subtotal ? shippingCharges : 0) - (isValidCouponCode ? discount : 0);

    // Update the cart in both state and local storage
    const updateCart = (updatedCart: CartItem[]) => {
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Increase product quantity
    const increaseQuantity = (productId: string) => {
        const updatedCart = cartItems.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
    };

    // Decrease product quantity
    const decreaseQuantity = (productId: string) => {
        const updatedCart = cartItems.map(item =>
            item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        updateCart(updatedCart);
    };

    // Remove product from cart
    const removeFromCart = (productId: string) => {
        const updatedCart = cartItems.filter(item => item.productId !== productId);
        updateCart(updatedCart);
    };

    //payment through Stripe
    // const makePayment = (token: any) => {
    //     const body = {
    //         product: {
    //             price: total
    //         },
    //         token
    //     };

    //     const headers = {
    //         "Content-Type": "application/json"
    //     };

    //     return fetch("http://localhost:5000/payment", {
    //         method: "POST",
    //         headers,
    //         body: JSON.stringify(body)
    //     })
    //         .then((response: any) => response.json())
    //         .then(async (data: any) => {
    //             console.log(data);
    //             if (data.error) {
    //                 throw new Error(data.error);
    //             }
    //             localStorage.removeItem("cart");

    //             const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    //             setCartItems(storedCartItems);
    //             const temp = cartItems.toString()

    //             // Save the cart items in Firebase Realtime Database
    //             const userDoc = await getDoc(doc(db, "users", user ? user.uid : "abc"));
    //             if (!userDoc.exists()) {
    //                 await setDoc(doc(db, "users", user ? user.uid : "abc"), {
    //                     data: temp
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             alert("Error occurred");
    //             console.error(err);
    //         });
    // };


    return (
        <div className="cart">
            <main>
                {cartItems.map(item => (
                    <CartItemCard
                        key={item.productId}
                        photo={item.photo}
                        name={item.name}
                        productId={item.productId}
                        price={item.price}
                        quantity={item.quantity}
                        incHandler={() => increaseQuantity(item.productId)}
                        decHandler={() => decreaseQuantity(item.productId)}
                        remHandler={() => removeFromCart(item.productId)}
                    />
                ))}
            </main>
            <aside>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping Charges: ₹{subtotal ? shippingCharges : 0}</p>
                <p>
                    Discount: <em className="red"> - ₹{isValidCouponCode ? discount : 0}</em>
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
                {/* <button className="btn">
                    <StripeCheckout
                        token={makePayment}
                        stripeKey="pk_test_51Po0L02NDuVlVmYHCzMCsiUk2qn8JO7VjhMAYwgU9OJPq7tbW77XcsdoSqGoSoi7MzRScRb1Kws1V4iGH6OuU4AH00ADz3F7mc"
                        name="Payment"
                        currency="INR"
                        amount={total * 100} // Stripe expects amount in cents (paise for INR)
                    />
                </button> */}

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
