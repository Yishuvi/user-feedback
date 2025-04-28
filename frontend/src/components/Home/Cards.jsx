import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cards = ({ home, setInputDiv, data }) => {
    const navigate = useNavigate();
    console.log(data);  // Log data to ensure it's coming through correctly

    // Function to toggle the 'important' status
    const handleImportant = async (id, currentImportant) => {
      try {
       const token = localStorage.getItem("authToken");
       console.log("Token:", token); 
       if (!token) {
        alert("You need to login first!");
    navigate("/login");
        console.error("No auth token found");
        return;
      }
       console.log(localStorage.getItem("authToken"));
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",  // optional but good
      
    };
       const res = await axios.put(`http://localhost:5000/api/feedback/update-important/${id}`, 
            {important: !currentImportant},  // Assuming you want to set it to true
            {headers}
        );
        console.log(res);
      } catch (error) {
        console.error("Error updating feedback importance", error);
      }
    };

    const deleteFeedback = async (id) => {
        try {
          const token = localStorage.getItem("authToken");
          console.log("Token:", token); 
          if (!token) {
            alert("You need to login first!");
    navigate("/login");
            console.error("No auth token found");
            return;
          }
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          
          const res = await axios.delete(`http://localhost:5000/api/feedback/${id}`, { headers });
          console.log(res.data.message);
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data && data.length > 0 ? (
                data.map((items, i) => (
                    <div className="flex flex-col justify-between bg-gray-400 rounded p-4" key={i}>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{items.title}</h3>
                            <p className="text-gray-600 my-2">{items.description}</p>
                        </div>
                        <div className="p-2 w-5/6 text-2xl flex justify-around">
                            <button onClick={() => handleImportant(items._id, items.important)}>
                                {items.important === false ? (
                                    <CiHeart />
                                ) : (
                                    <FaHeart className="text-red-500" />
                                )}
                                </button>
                            <button >
                                <CiEdit />
                            </button>
                            <button onClick={() => deleteFeedback(items._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No feedback available</p>
            )}

            {home === "true" && (
                <button
                    className="flex flex-col4 justify-between bg-gray-400 rounded p-4 items-center hover:scale-105 transition-transform duration-300  hover:cursor-pointer"
                    onClick={() => setInputDiv("flex")}
                >
                    <h2 className="text-2xl font-semibold items-center">Add New Feedback</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;