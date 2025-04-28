import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Signup = () => {

  const [Data, setData] = useState({username: "", email: "", password: ""});
    const Change = (e) => {
        const { name, value} = e.target;
        setData({...Data, [name]: value});
    };

    const submit = async () => {
        if (Data.username === "" || Data.email === "" || Data.password === "") {
            alert("Please fill all the fields");
        } else {
            try {
                const res = await axios.post("http://localhost:5000/api/users/sign-in", Data);
                console.log(res.data); // success response
                alert("Signup Successful! Please login now.");
                // Optional: Redirect to login page
                // navigate('/login');
            } catch (error) {
                console.error(error.response.data);
                alert(error.response.data.message || "Signup failed");
            }
        }
    }    

    return (
        <div className=" h-[98vh] flex justify-center items-center "> 
               <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">Signup</div>
                <input type="text" 
                placeholder="Username"
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                 name="username"

                 value={Data.username}
                    onChange={Change}
                 />
                <input 
                type="email" 
                placeholder="email"
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                 name="email"

                    value={Data.email}
                    onChange={Change}
                 />
                <input 
                type="password" 
                placeholder="password"
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                 name="password"

                    value={Data.password}
                    onChange={Change}
                 />
                 <div className="w-full flex items-center justify-between">
                 <button className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
                 onClick={submit}>
                    Signup
                </button>
                 <Link to="/login">Already having an account ? login here</Link>
               </div>
               </div> 
        </div>
    );  
};

export default Signup