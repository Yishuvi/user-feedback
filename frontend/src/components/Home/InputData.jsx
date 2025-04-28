import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv }) => {

    const [Data, setData] = useState({ title: "", description: "" });
     const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headerslocalStorage.getItem("token"),
    };
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }

    const submiData = async () => {
        if (Data.title === "" || Data.description === "") {
            alert("please fill all the fields");
        } else {
            const feedbackData = {
                title: Data.title,
                description: Data.description,
                important: false, // Default value or replace with user input if necessary
                suggestion: "", // Default or user input
                bugreport: "", // Default or user input
            };
            try {
            await axios.post("http://localhost:5000/api/feedback", Data, {
                headers,
            })
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
        }
    }

    return (
        <>
            {InputDiv === "flex" && (
                <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full bg-gray-800 bg-opacity-80 z-50">
                    <div className="w-[400px] bg-gray-900 p-6 rounded-lg relative">
                        <button 
                            onClick={() => setInputDiv("hidden")} 
                            className="absolute top-2 right-2 text-white text-2xl"
                        >
                            <RxCross1 />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Title" 
                            name="title"
                            className="w-full py-2 px-3 rounded mb-4 text-black"
                            value={Data.title}
                            onChange={change}
                        />
                        <textarea
                            name="description"
                            placeholder="Enter your feedback..."
                            className="w-full py-2 px-3 rounded mb-4 text-black"
                            rows="6"
                            value={Data.description}
                            onChange={change}
                        />
                        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={submiData}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default InputData;
