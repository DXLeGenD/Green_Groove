


import { useState } from "react";
import ProductCard from "../components/product-card";

// Sample data for products
const products = [
    { id: 3, name: "Washing Machine", price: 56000, stock: 3, photo: "https://m.media-amazon.com/images/I/71YUsr5ZlNL._AC_UL480_FMwebp_QL65_.jpg", category: "Home Appliances" },
    { id: 4, name: "Headphones", price: 15000, stock: 10, photo: "https://m.media-amazon.com/images/I/618Z0eTNM6L._AC_UL480_FMwebp_QL65_.jpg", category: "Accessories" },
];

const Search = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    // Number of products per page
    const productsPerPage = 3;

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

    // Paginate products
    const paginatedProducts = filteredProducts//.slice((page - 1) * productsPerPage, page * productsPerPage);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const addToCardHandler = (productId: number) => {
        // Logic to add product to cart
        console.log(`Product ${productId} added to cart.`);
    };

    return (
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
                            productId={product.id + ""}
                            handler={() => addToCardHandler(product.id)}
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
    );
};

export default Search;
