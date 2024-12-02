import React, { useEffect, useState } from "react";
import axios from "axios";

const teamStyles = {
    RCB: { bg: "bg-red-600", text: "Welcome to the RCB Fan Store!" },
    MI: { bg: "bg-blue-600", text: "Welcome to the MI Fan Store!" },
    CSK: { bg: "bg-yellow-500", text: "Welcome to the CSK Fan Store!" },
    Neutral: { bg: "bg-gray-300", text: "Welcome to the Fan Store!" },
};

const Dashboard = ({ user }) => {
    const [products, setProducts] = useState([]);
    const team = (user && user.team && teamStyles[user.team]) || teamStyles.Neutral;


    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={`min-h-screen ${team.bg} text-white`}>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">{team.text}</h1>
                <div className="grid grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white text-black p-4 rounded shadow">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p>{product.description}</p>
                            <p className="text-lg font-bold">${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
