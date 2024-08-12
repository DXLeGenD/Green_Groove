import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";


const Home = () => {
    const addToCardHandler = () => { }
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
                    <ProductCard name="MacBook" price={354553} stock={4} photo="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1685966374/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256711_umnwok.png?tr=w-480" productId="asd" handler={addToCardHandler} />

                </main>
            </div>
        </>
    );
};

export default Home;
