import { useEffect, useState } from "react";
import ProductCard from "../components/product-card";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    photo: string;
    category: string;
}
interface CartItem {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    photo: string;
}

const Search = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<number>(100000);
    const [category, setCategory] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const productsPerPage = 3;

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const fetchedProducts: Product[] = [];
            querySnapshot.forEach((doc) => {
                const product = doc.data() as Product;
                fetchedProducts.push({ ...product, id: doc.id });
            });
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    // Function to filter and sort products
    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            product.price <= maxPrice &&
            (category === "" || product.category === category)
        )
        .sort((a, b) => {
            if (sort === "asc") return a.price - b.price;
            if (sort === "dsc") return b.price - a.price;
            return 0;
        });

    const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
        toast.success(`${name} is added to the cart!`, {
            position: "top-right"
        });

        console.log(`Product ${productId} added to cart.`);
    };


    return (
        <>
            <ToastContainer />
            <div className="product-search-page">
                <aside>
                    <h2>Filters</h2>
                    <div>
                        <h4>Sort</h4>
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            <option value="">None</option>
                            <option value="asc">Price (Low to High)</option>
                            <option value="dsc">Price (High to Low)</option>
                        </select>
                    </div>

                    <div>
                        <h4>Max Price: {maxPrice || ""}</h4>
                        <input
                            type="range"
                            min={100}
                            max={100000}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <h4>Category</h4>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">ALL</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home Appliances">Home Appliances</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                </aside>
                <main>
                    <h1>Products</h1>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="search-product-list">
                        {paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                stock={product.stock}
                                photo={product.photo}
                                productId={product.id}
                                handler={() => addToCartHandler(product.id, product.name, product.price, product.photo)}
                            />
                        ))}
                    </div>

                    <article className="pagination">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <span>
                            {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </article>
                </main>

            </div>
        </>
    );
};

export default Search;
