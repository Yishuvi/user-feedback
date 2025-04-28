import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import { IoIosAddCircle } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";

const Allfeedback = () => {
    const [InputDiv, setInputDiv] = useState("hidden");
    const [Data, setData] = useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headerslocalStorage.getItem("token"),
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/feedback", { headers });
                console.log(res.data);  // Log the full response to see its structure
                setData(res.data);  // Assuming `data` contains the `username` and `email`
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };
        fetch();
    }, []);

    Data && console.log(Data.Allfeedback)

    const handleOpen = () => {
        setInputDiv("flex");
    };

    return (
        <> 
        <div>
            <div className="w-full flex justify-end p-4">
                <button onClick={handleOpen}>
                    <IoIosAddCircle className="text-3xl hover:text-gray-100 transition-all duration-300" />
                </button>
            </div>
            {Data && (
                <Cards home={"true"} setInputDiv={setInputDiv} data={Data}/>
            )}
        </div>
        <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} />
        </>
    );
}

export default Allfeedback;
