
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
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import ProductCard from "../components/product-card";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
// import { database, ref, set, get } from '../firebase';

// interface Product {
//     id: string;
//     name: string;
//     price: number;
//     stock: number;
//     photo: string;
// }

// interface CartItem {
//     productId: string;
//     quantity: number;
//     name: string;
//     price: number;
//     photo: string;
// }

// const Home = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const userId = 'exampleUserId'; // Replace with actual user ID retrieval

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const productsCollection = collection(db, "products");
//                 const productsSnapshot = await getDocs(productsCollection);
//                 const productsList = productsSnapshot.docs.map((doc): Product => ({
//                     id: doc.id,
//                     name: doc.data().name,
//                     price: doc.data().price,
//                     stock: doc.data().stock,
//                     photo: doc.data().photo,
//                 }));
//                 setProducts(productsList);
//             } catch (error) {
//                 console.error("Error fetching products from Firestore:", error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const addToCartHandler = async (
//         productId: string,
//         name: string,
//         price: number,
//         photo: string
//     ) => {
//         // Reference to the user's cart in Firebase
//         const cartRef = ref(database, `cart/${userId}`);

//         // Get the current cart data
//         const cartSnapshot = await get(cartRef);
//         let cart: CartItem[] = cartSnapshot.exists() ? cartSnapshot.val() : [];

//         // Find index of the product in the cart
//         const existingProductIndex = cart.findIndex(item => item.productId === productId);

//         if (existingProductIndex !== -1) {
//             // Product already in cart, just update the quantity
//             cart[existingProductIndex].quantity += 1;
//         } else {
//             // Product not in cart, add new item
//             cart.push({
//                 productId,
//                 quantity: 1,
//                 name,
//                 price,
//                 photo
//             });
//         }

//         // Update cart data in Firebase
//         await set(cartRef, cart);

//         // Show toast notification
//         toast.success(`${name} added to cart`);

//         console.log(`Product ${productId} added to cart.`);
//     };

//     return (
//         <>
//             <div className="home">
//                 <section></section>

//                 <h1>
//                     Latest Products
//                     <Link to="/search" className="findmore">
//                         More
//                     </Link>
//                 </h1>

//                 <main>
//                     {products.length > 0 ? (
//                         products.map((product) => (
//                             <ProductCard
//                                 key={product.id}
//                                 name={product.name}
//                                 price={product.price}
//                                 stock={product.stock}
//                                 photo={product.photo}
//                                 productId={product.id}
//                                 handler={() => addToCartHandler(product.id, product.name, product.price, product.photo)}
//                             />
//                         ))
//                     ) : (
//                         <p>No products available</p>
//                     )}
//                 </main>
//                 <ToastContainer />
//             </div>
//         </>
//     );
// };

// export default Home;




// // import { toast } from 'react-toastify';
// // import { db } from '../firebase'; // Ensure this imports your Firestore instance
// // import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// // interface CartItem {
// //     productId: string;
// //     quantity: number;
// //     name: string;
// //     price: number;
// //     photo: string;
// // }

// // const addToCartHandler = async (
// //     userId: string,
// //     productId: string,
// //     name: string,
// //     price: number,
// //     photo: string
// // ) => {
// //     try {
// //         // Reference to the cart item document in Firestore
// //         const cartItemRef = doc(db, `cart/${userId}/${productId}`);

// //         // Get the current cart item data
// //         const cartItemSnapshot = await getDoc(cartItemRef);
// //         const cartItemData = cartItemSnapshot.exists() ? cartItemSnapshot.data() as CartItem : null;

// //         if (cartItemData) {
// //             // Product already in cart, just update the quantity
// //             await updateDoc(cartItemRef, {
// //                 quantity: cartItemData.quantity + 1
// //             });
// //         } else {
// //             // Product not in cart, add new item
// //             await setDoc(cartItemRef, {
// //                 productId,
// //                 quantity: 1,
// //                 name,
// //                 price,
// //                 photo
// //             });
// //         }

// //         // Show toast notification
// //         toast.success(`${name} added to cart`);

// //         console.log(`Product ${productId} added to cart.`);
// //     } catch (error) {
// //         console.error("Error updating cart:", error);
// //         toast.error("Failed to add item to cart.");
// //     }
// // };

// // export default addToCartHandler;
