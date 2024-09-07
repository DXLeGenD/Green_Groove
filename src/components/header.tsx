import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Link } from "react-router-dom";
import {
    FaSearch,
    FaShoppingBag,
    FaSignInAlt,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";


const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            setIsOpen(false);
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <nav className="header">
            <Link onClick={() => setIsOpen(false)} to={"/"}>
                HOME
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/search"}>
                <FaSearch />
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/cart"}>
                <FaShoppingBag />
            </Link>

            {user ? (
                <>
                    <button onClick={() => setIsOpen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {user?.email === "1si22cs401@sit.ac.in" && (
                                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                                    Admin
                                </Link>
                            )}

                            <Link onClick={() => setIsOpen(false)} to="/orders">
                                Orders
                            </Link>
                            <button onClick={logoutHandler}>
                                <FaSignOutAlt />
                            </button>
                        </div>
                    </dialog>
                </>
            ) : (
                <Link to={"/login"} onClick={() => setIsOpen(false)}>
                    <FaSignInAlt />
                </Link>
            )}
        </nav>
    );
};

export default Header;
