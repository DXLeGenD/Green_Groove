// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";

// const Login = () => {
//     const [gender, setGender] = useState("");
//     const [date, setDate] = useState("");

//     const loginHandler = () => {
//         console.log("Login Successful")
//     }


//     return (
//         <div className="login">
//             <main>
//                 <h1 className="heading">Login</h1>

//                 <div>
//                     <label>Gender</label>
//                     <select value={gender} onChange={(e) => setGender(e.target.value)}>
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label>Date of birth</label>
//                     <input
//                         type="date"
//                         value={date}
//                         onChange={(e) => setDate(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <p>Already Signed In Once</p>
//                     <button onClick={loginHandler}>
//                         <FcGoogle /> <span>Sign in with Google</span>
//                     </button>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default Login

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const loginHandler = () => {
        console.log("Login Successful");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Password:", password);
        console.log("Gender:", gender);
        console.log("Date of Birth:", date);
    };
    const signUpHandler = () => {
        console.log("Login Successful");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Password:", password);
        console.log("Gender:", gender);
        console.log("Date of Birth:", date);
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
