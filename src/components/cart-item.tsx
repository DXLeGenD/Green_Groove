import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItems = (props: { photo: any; productId: any; price: any; name: any; quantity: any; }) => {
    const {
        photo,
        productId,
        price,
        name,
        quantity,
    } = props
    function incrementHandler() {
        setProductQuantity((prev: 0) => prev + 1);
    }
    function decrementHandler() {
        if (productQuantity > 0) {
            setProductQuantity((prev: 0) => prev - 1);
        }
    }
    function removeHandler(productId: any) {
        console.log(productId)
    }
    const [productQuantity, setProductQuantity] = useState(quantity)
    return (
        <div className="cart-item">
            <img src={photo} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>

            <div>
                <button onClick={() => decrementHandler()}>-</button>
                <p>{productQuantity}</p>
                <button onClick={() => incrementHandler()}>+</button>
            </div>

            <button onClick={() => removeHandler(productId)}>
                <FaTrash />
            </button>
        </div>
    );
}

export default CartItems;
