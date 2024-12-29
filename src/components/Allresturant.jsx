


import React, { useEffect, useState } from "react";
import axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const navigate = useNavigate();
  const [allrestaurants, setallrestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchallrestaurants = async () => {
      try {
        const response = await axiosInstance.get("/restaurant");
        setallrestaurants(response.data);
       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchallrestaurants();
  }, []);
  console.log(allrestaurants);

  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.round(rating); // Round rating to nearest integer
    const emptyStars = maxStars - filledStars;

    return (
      <div className="flex items-center space-x-1">
        {Array(filledStars)
          .fill()
          .map((_, index) => (
            <svg
              key={`filled-${index}`}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.857 1.414 8.23L12 18.896 4.586 23.51 6 15.28 0 9.423l8.332-1.268z" />
            </svg>
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <svg
              key={`empty-${index}`}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.857 1.414 8.23L12 18.896 4.586 23.51 6 15.28 0 9.423l8.332-1.268z" />
            </svg>
          ))}
      </div>
    );
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-10">Restaurant List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allrestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={restaurant.image}
              alt=""
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-teal-800 mb-2">{restaurant.restaurantName}</h2>
              <p className="text-gray-600 mb-2"><span className="font-medium">Location:</span> {restaurant.location}</p>
              <p className="text-gray-600 mb-2"><span className="font-medium">Price Range:</span> {restaurant.priceRange}</p>
              <div className="flex items-center mb-2">
                <span className="font-medium text-gray-600 mr-2">Average Rating:</span>
                {renderStars(restaurant.averageRating)}
              </div>
              <p className="text-gray-600 mb-2"><span className="font-medium">Special Features:</span> {restaurant.specialFeatures}</p>
              <p className="text-gray-600 mb-4"><span className="font-medium">Ambiance:</span> {restaurant.ambiance}</p>
              <ul className="space-y-2">
                {restaurant.tables.map((table) => (
                  <li key={table._id}>
                    <button
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                        table.status === "available"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                      disabled={table.status !== "available"}
                    >
                      Table {table.tableNumber}: {table.status}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="bg-teal-600 text-white font-medium py-2 px-4 mt-6 w-full rounded-lg hover:bg-teal-700"
                onClick={() =>  navigate(`/Reservation/${restaurant._id}`) } 
              >
                Book a Table
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;

