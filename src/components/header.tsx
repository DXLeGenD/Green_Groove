// import { Link } from "react-router-dom";
// import {
//     FaSearch,
//     FaShoppingBag,
//     FaSignInAlt,
//     FaUser,
//     FaSignOutAlt,
// } from "react-icons/fa";
// import { useState } from "react";




// const Header = () => {
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const user = { _id: "ihasfh", role: "admin" }

//     const logoutHandler = async () => {
//         try {

//         } catch (error) {

//         }
//     };

//     return (
//         <nav className="header">
//             <Link onClick={() => setIsOpen(false)} to={"/"}>
//                 HOME
//             </Link>
//             <Link onClick={() => setIsOpen(false)} to={"/search"}>
//                 <FaSearch />
//             </Link>
//             <Link onClick={() => setIsOpen(false)} to={"/cart"}>
//                 <FaShoppingBag />
//             </Link>

//             {user?._id ? (
//                 <>
//                     <button onClick={() => setIsOpen((prev) => !prev)}>
//                         <FaUser />
//                     </button>
//                     <dialog open={isOpen}>
//                         <div>
//                             {user.role === "admin" && (
//                                 <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
//                                     Admin
//                                 </Link>
//                             )}

//                             <Link onClick={() => setIsOpen(false)} to="/orders">
//                                 Orders
//                             </Link>
//                             <button onClick={logoutHandler}>
//                                 <FaSignOutAlt />
//                             </button>
//                         </div>
//                     </dialog>
//                 </>
//             ) : (
//                 <Link to={"/login"}>
//                     <FaSignInAlt />
//                 </Link>
//             )}
//         </nav>
//     );
// };

// export default Header;
import { Link } from "react-router-dom";
import {
    FaSearch,
    FaShoppingBag,
    FaSignInAlt,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = { _id: "asafs", role: "admin" }; // Assuming user state here

    const logoutHandler = async () => {
        try {
            // Add logout logic here
        } catch (error) {
            // Handle error
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

            {user?._id ? (
                <>
                    <button onClick={() => setIsOpen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {user.role === "admin" && (
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
