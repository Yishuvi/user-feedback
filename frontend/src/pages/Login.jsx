import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [Data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate(); // to redirect after login

    const Change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault(); // important to prevent page reload
        if (Data.email === "" || Data.password === "") {
            alert("Please fill all the fields");
        } else {
            try {
                const res = await axios.post("http://localhost:5000/api/users/login", Data);
                console.log(res.data); // success response

                const token = res.data.token; // Assuming the backend sends the token in the response
            if (token) {
                localStorage.setItem("authToken", token); // Save the token in localStorage
                console.log("Token saved to localStorage:", token);
            }


                alert("Login Successful!");
                navigate("/"); // example: navigate to dashboard after login
            } catch (error) {
                console.error("Login Error:", error.response?.data || error.message);
                alert(error.response.data.error || "Login failed");
            }
        }
    };

    return (
        <div className=" h-[98vh] flex justify-center items-center "> 
               <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">Login</div>
                <input type="email" 
                placeholder="email"
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                 name="email"

                    value={Data.email}
                 onChange={Change}
                 />
                  <input type="password" 
                placeholder="password"
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                 name="password"
                   
                    value={Data.password}
                 onChange={Change}
                 />
                 <div className="w-full flex items-center justify-between">
                 <button className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
                 onClick={submit}>
                    Login
                </button>
                 <Link to="/signup">Not having an account ? signup here</Link>
               </div>
               </div>
            </div>
    );
}

export default Login;
