import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const validateEmail = (email: any) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const signUpHandler = async () => {
        if (!validateEmail(email)) {
            alert("Invalid email address");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                phone,
                gender,
                dateOfBirth: date,
                role: "normal"
            });

            console.log("Account created successfully");
            navigate("/");
        } catch (error: any) {
            let errorMessage = "Error creating account";
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "The email address is already in use by another account.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "The email address is not valid.";
                    break;
                case "auth/weak-password":
                    errorMessage = "The password is too weak.";
                    break;
                default:
                    errorMessage = error.message;
            }
            alert(errorMessage);
            console.error(errorMessage, error);
        }
    };

    const loginHandler = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    phone: "",
                    gender: "",
                    dateOfBirth: "",
                });
            }

            console.log("Login Successful with Google");
            navigate("/");
        } catch (error: any) {
            let errorMessage = "Error logging in with Google";
            switch (error.code) {
                case "auth/popup-closed-by-user":
                    errorMessage = "The popup was closed before completing the sign-in.";
                    break;
                case "auth/cancelled-popup-request":
                    errorMessage = "Only one popup request is allowed at a time.";
                    break;
                default:
                    errorMessage = error.message;
            }
            alert(errorMessage);
            console.error(errorMessage, error);
        }
    };

    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label>Email ID</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div>
                    <button onClick={signUpHandler}>
                        <span>Create Account</span>
                    </button>
                </div>

                <div>
                    <p>Already have an account</p>
                    <button onClick={loginHandler}>
                        <FcGoogle /> <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
