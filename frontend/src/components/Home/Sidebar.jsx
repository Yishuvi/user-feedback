import React, { useEffect, useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import { MdLabelImportant } from "react-icons/md";
import { FaBug } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";
import { FcFeedback } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
    const dispatch = useDispatch();
    const data = [
        {
            title: "All Feedback",
           icon: <VscFeedback />,
            Link: "/",
        },

        {
            title: "Important Feedback",
            icon: <MdLabelImportant />,
            Link: "/importantfeedback",
        },
        {
            title: "Suggestions",
            icon:  <MdSettingsSuggest />,
            Link: "/suggestions",
        },
        {
            title: "Bug Report",
            icon: <FaBug />,
            Link: "/bugreports",
        },
        {
            title: "Sumbit new Feedback",
             icon: <FcFeedback />,
            Link: "/sumbitnewfeedback",
        },
    ];

    const navigate = useNavigate();
                      
      const [Data, setData] = useState();
        const logout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("token");
       // window.location.href = "/login";
        navigate("/signup");
    }

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headerslocalStorage.getItem("token"),
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/feedback", { headers });
                console.log(res.data);  // Log the full response to see its structure
                setData(res.data.data);  // Assuming `data` contains the `username` and `email`
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };
        fetch();
    }, []);
        
    return (
        <>
            {Data && Data.username && (
                <div>
                <h1 className="text-xl font-semibold">{Data.username}</h1>
                 <h4 className="mb-1 text-l">{Data.email}</h4>
                 <hr />
            </div>
            )}
            <div>
                {data.map((items, i) => (
                    <Link 
                    to={items.Link} key={i}
                    className="my-2 flex items-center p-2 rounded hover:bg-gray-300 cursor-pointer">
                    {items.icon}&nbsp;{items.title}
                </Link> 
                ))}
            </div>
            <div>
                <button onClick={logout} className="bg-gray-400 w-full p-2 rounded">Logout</button>
            </div>
        </>
    );
};

export default Sidebar;