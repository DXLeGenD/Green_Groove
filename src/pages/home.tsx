
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged, User } from "firebase/auth";

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    photo: string;
}

interface CartItem {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    photo: string;
}

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map((doc): Product => ({
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price,
                    stock: doc.data().stock,
                    photo: doc.data().photo,
                }));
                setProducts(productsList);
            } catch (error) {
                console.error("Error fetching products from Firestore:", error);
            }
        };

        fetchProducts();




    }, []);



    const addToCartHandler = (
        productId: string,
        name: string,
        price: number,
        photo: string
    ) => {
        // Get the current cart data from localStorage
        let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

        // Find the index of the product in the cart
        const existingProductIndex = cart.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            // Product already in cart, just update the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Product not in cart, add new item
            cart.push({
                productId,
                quantity: 1,
                name,
                price,
                photo
            });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Show toast notification
        toast.success(`${name} added to cart`);

        console.log(`Product ${productId} added to cart.`);
    };




    return (
        <>
            <div className="home">
                <section></section>

                <h1>
                    Latest Products
                    <Link to="/search" className="findmore">
                        More
                    </Link>
                </h1>

                <main>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                stock={product.stock}
                                photo={product.photo}
                                productId={product.id}
                                handler={() => addToCartHandler(product.id, product.name, product.price, product.photo)}
                            />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}

                </main>
                <ToastContainer />
            </div>
        </>
    );
};

export default Home;