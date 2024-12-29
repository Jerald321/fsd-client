
// ReservationManagement.jsx
import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import axiosInstance from './axios';

const ReservationManagement = () => {
  const navigate =useNavigate();
  const { id } = useParams(); // Retrieve restaurant ID
  // const [restaurant, setRestaurant] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [availability, setAvailability] = useState([]);
  const [reservations, setReservations] = useState([]);
  const socket = io("http://localhost:3000");

  const fetchRestaurant = async () => {
    try {
      const response = await axiosInstance.get(`/restaurant/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };



  useEffect(() => {
    

    socket.on("tableUpdate", (data) => {
      console.log("Table update received:", data);
      fetchReservations(); // Refresh reservations on update
      handleCancelReservation
  });


  }, [bookingDate, bookingTime, reservations,id,reservations, setReservations]);
 





 

  const handleReservation = async () => {
    
    try {
      if (!bookingDate || !bookingTime || !partySize) {
        alert("All fields are required. Please fill them in.");
     
      }
      
      const response = await axiosInstance.post(`/reservation/checkAvailability/${id}`,
     {"bookingDate":bookingDate, "bookingTime":bookingTime, "partySize" :partySize})


     if (response.data?.error) {
      setErrorMessage(response.data.error); // Server error message if no rooms available
      alert("Rooms not available. Please choose a different time or date.");
      return;
    }
     
      setAvailability(response.data);
      alert("booking successfully")
   
     
      if (response.ok) {
        const newReservation = await response.json();
        setReservations([...reservations, newReservation]);
        alert('Reservation confirmed!');
      } 
      else{
        alert("tables not available")
        console.error("Error making reservation:", error);
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while making the reservation.";
        
      setErrorMessage(errorMsg);
      }
        
     
      

    }
     catch (error) {
      console.log('Error making reservation:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axiosInstance.get('reservation/allreservation');
      
      setReservations(response.data);
    } catch (error) {
      console.log('Error fetching reservations:', error);
    }
  };

 

  const handleCancelReservation = async (id) => {
    try {
      if (!id) {
        throw new Error('Invalid reservation ID');
      }
  
      const response = await axiosInstance.delete(`/reservation/${id}`);
      console.log('Response:', response);
  
      if (response.status === 200) {
        setReservations(reservations.filter((reservation) => reservation.id !== id));
        alert('Reservation canceled successfully!');
      } else {
        alert('Failed to cancel reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error canceling reservation:', error);
      alert('An error occurred while canceling the reservation. Please try again later.');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Restaurant Reservation System</h1>
         {/* // checkAvailability */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Make a Reservation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-gray-700">Date:</span>
            <input 
              type="date" 
              value={bookingDate}
              required 
              onChange={(e) => setBookingDate(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Time:</span>
            <input 
              type="time" 
              value={bookingTime} 
              required 
              onChange={(e) => setBookingTime(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Party Size:</span>
            <input 
              type="number" 
              min="1" 
              required 
              value={partySize} 
              onChange={(e) => setPartySize(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            />
          </label>
        </div>
        <button 
          onClick={handleReservation} 
          // disabled={!availability.includes(time)} 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          Book Now
        </button>
      </div>


      {/* your reservation */}

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Reservations</h2>
        <button 
          onClick={fetchReservations} 
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
        >
          Refresh
        </button>
        
        <ul className="divide-y block">
  {reservations.map((reservation) => (
    <li
      key={reservation.id}
      className="py-4 flex justify-between items-center hover:bg-gray-100 transition-colors duration-300"
    >
      <div>
        <p className="text-gray-700 capitalize">
          <span className="capitalize text-blue-600 font-semibold">Restaurant name: </span>
          {reservation.restaurantName}
        </p>
        <p className="text-lg font-medium text-gray-800">
          <span className="capitalize text-blue-600 text-base">Booking date: </span>
          {reservation.bookingDate} at {reservation.bookingTime}
        </p>
        <p className="text-gray-700">
          <span className="capitalize text-blue-600 font-semibold">People: </span>
          {reservation.partySize}
        </p>
      </div>
      <button
        onClick={() => handleCancelReservation(reservation._id)}
        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
      >
        Cancel
      </button>

      {/* <button
       
        onClick={() =>  navigate(`/UserReview`) } 
        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
      >
        Review
      </button> */}
    </li>
  ))}
</ul>

      </div>
    </div>
  );
};

export default ReservationManagement;

