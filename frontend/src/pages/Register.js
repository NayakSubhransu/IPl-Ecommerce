import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", favoriteColor: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            setMessage(`You have been assigned to ${response.data.team}`);
        } catch (err) {
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input type="text" name="name" onChange={handleChange} required className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" name="email" onChange={handleChange} required className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input type="password" name="password" onChange={handleChange} required className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Favorite Color</label>
                    <input type="text" name="favoriteColor" onChange={handleChange} required className="border rounded w-full py-2 px-3" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Register</button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Register;
