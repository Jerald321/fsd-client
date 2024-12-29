


import React, { useState } from "react";
import axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/restaurant`, {
                params: { q: searchTerm },
            });
            setResults(response.data); // Assuming the API returns a JSON array
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <form 
                onSubmit={handleSearch} 
                className="flex items-center gap-4 bg-white p-4 shadow-md rounded-lg"
            >
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Search
                </button>
            </form>


            
            <div className="mt-6">
                {results.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((restaurant, index) => (
                            <li 
                                key={index} 
                                className="bg-white p-4 shadow rounded-lg border hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {restaurant.restaurantName}
                                </h3>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {restaurant.location}
                                </h3>
                                <button className="bg-teal-600 text-white py-2 mt-10 px-4 rounded-md hover:bg-teal-700 w-full" onClick={()=>{navigate ("/Allresturant")}}>view more details</button>
                             
                                
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">
                        No results found. Try searching for something else.
                    </p>
                )}
            </div>





        </div>
    );
};

export default SearchBar;



