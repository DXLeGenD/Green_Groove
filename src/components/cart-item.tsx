import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItems = (props: { photo: any; productId: any; price: any; name: any; quantity: any; incHandler: () => void; decHandler: () => void; remHandler: () => void; }) => {
    const {
        photo,
        productId,
        price,
        name,
        quantity,
        incHandler,
        decHandler,
        remHandler
    } = props


    return (
        <div className="cart-item">
            <img src={photo} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>

            <div>
                <button onClick={() => decHandler()}>-</button>
                <p>{quantity}</p>
                <button onClick={() => incHandler()}>+</button>
            </div>

            <button onClick={() => remHandler()}>
                <FaTrash />
            </button>
        </div>
    );
}

export default CartItems;
