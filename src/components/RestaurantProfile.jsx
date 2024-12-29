
import { useEffect, useState } from "react";
import axiosInstance  from "./axios";


const RestaurantManager = () => {
   const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ tableNumber: "", capacity: "" });
    const [editingTableIndex, setEditingTableIndex] = useState(null);
  
  const [restaurants, setRestaurants] = useState([]);
  
  const [newRestaurant, setNewRestaurant] = useState({
    restaurantName: "",
    location: "",
    cuisine: "",
    priceRange: "",
    ambiance: "",
    specialFeatures: "",
    image: null,
    tables: []
  });


  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };





  // const handleImageUpload = (e) => {
  //   setNewRestaurant({ ...newRestaurant, image: e.target.files[0] });
  // };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRestaurant({ ...newRestaurant, image: reader.result }); // Base64 encoding
      };
      reader.readAsDataURL(file);
    }
  };

  const createOrUpdateRestaurant = async() => {
    try {
      const updatedRestaurant = {
        ...newRestaurant,
        tables: tables, // Include current tables state
      };
      console.log(updatedRestaurant);
      
      
      
      const response = await axiosInstance.post('/restaurant',{
     
      ...updatedRestaurant
      
      })

      alert("Restaurant created successfully");
      setRestaurants(response.data);
       
     
    
  
      if (
        newRestaurant.restaurantName &&
        newRestaurant.location &&
        newRestaurant.cuisine
      ) {
        if (editingIndex !== null) {
          // Update existing restaurant
          const updatedRestaurants = [...restaurants];
          updatedRestaurants[editingIndex] = newRestaurant;
          setRestaurants(updatedRestaurants);
          setEditingIndex(null);
        } else {
          // Add new restaurant
          setRestaurants([...restaurants, newRestaurant]);
        }
        setNewRestaurant({
          restaurantName: "",
          location: "",
          cuisine: "",
          priceRange: "",
          ambiance: "",
          specialFeatures: "",
          image: null,
          tables : []
        });
      } else {
        alert("Please fill in all required fields.");
      }
      
    } catch (error) {
      console.log("not created restaurant " ,error);
      alert("Failed to create/update restaurant. Please try again.");
      
    }
  
  };

  const editRestaurant = (index) => {
    setNewRestaurant(restaurants[index]);
    setNewRestaurant(newRestaurant);

    setTables(newRestaurant.tables || []); 
    setEditingIndex(index);
  };

  const deleteRestaurant = (index) => {
    setRestaurants(restaurants.filter((_, i) => i !== index));
  };

  // const renderImagePreview = (image) => {
  //   return image ? (
  //     <img
  //       src={typeof image === "string" ?image :URL.createObjectURL(image)}
  //       alt="Preview"
  //       className="h-32 w-32 object-cover rounded-md"
  //     />
  //   ) : (
  //     <span className="text-gray-500">No Image Uploaded</span>
  //   );
  // };

  const renderImagePreview = (image) => {
    if (!image) {
      return <span className="text-gray-500">No Image Uploaded</span>;
    }
  
    // Check if the image is a valid base64 string
    if (image.startsWith("data:image")) {
      return (
        <img
          src={image}
          alt="Preview"
          className="h-32 w-32 object-cover rounded-md"
        />
      );
    }
  
    // Handle URLs (e.g., from the backend or a public path)
    return (
      <img
        src={image}
        alt="Preview"
        className="h-32 w-32 object-cover rounded-md"
      />
    );
  };
  


  const addOrUpdateTable = () => {
    if (newTable.tableNumber && newTable.capacity) {
      if (editingTableIndex !== null) {
        // Update existing table
        const updatedTables = editingTableIndex !== null ? [...tables] : tables;
        // updatedTables[editingTableIndex] = {
        //   ...newTable,
        //   isAvailable: tables[editingTableIndex].isAvailable,
        //   status: tables[editingTableIndex].status,
        // };

        if (editingTableIndex !== null) {
          updatedTables[editingTableIndex] = newTable;
          setEditingTableIndex(null);
        } else {
          updatedTables.push({ ...newTable, isAvailable: true });
        }
        setTables(updatedTables);

        setNewTable({
          tableNumber: "",
          capacity: "",

        });
        console.log(tables);
        
        setEditingTableIndex(null);
      } else {
        // Add new table
        setTables([
          ...tables,
          { ...newTable, isAvailable: true, status: "available" },
        ]);
      }
      setNewTable({ tableNumber: "", capacity: "" });
    }
  };

  const toggleTableStatus = (index) => {
    const updatedTables = [...tables];
    updatedTables[index].isAvailable = !updatedTables[index].isAvailable;
    updatedTables[index].status = updatedTables[index].isAvailable
      ? "available"
      : "booked";
    setTables(updatedTables);
  };

  const editTable = (index) => {
    setNewTable({
      tableNumber: tables[index].tableNumber,
      capacity: tables[index].capacity,
    });
    setEditingTableIndex(index);
  };

  const deleteTable = (index) => {
    setTables(tables.filter((_, i) => i !== index));
  };

// useEffect(()=>{
//   // createOrUpdateRestaurant()

// },[tables , newTable,editingTableIndex, ])


  return (

     

    <div className="container mx-auto p-6 bg-white shadow-md rounded-md space-y-6">

        

      <h1 className="text-3xl font-bold text-gray-800">Restaurant Manager</h1>

      {/* Restaurant Form */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {editingIndex !== null ? "Edit Restaurant Profile" : "Create Restaurant Profile"}
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-800">Restaurant Name</label>
            <input
              type="text"
              name="restaurantName"
              value={newRestaurant.restaurantName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter restaurant name"
            />
          </div>
          <div>
            <label className="block text-gray-800">Location</label>
            <input
              type="text"
              name="location"
              value={newRestaurant.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block text-gray-800">Cuisine</label>
            {/* <input
              type="text"
              name="cuisine"
              value={newRestaurant.cuisine}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter cuisines (e.g., Italian, Chinese)"
            /> */}


         <select
              name="cuisine"
              value={newRestaurant.cuisine}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="Italaian">Italaian</option>
              <option value="Chinese">Chinese</option>
              <option value="south indian meals">South Indian Meals</option>
              
            </select>
          </div>
          <div>
            <label className="block text-gray-800">Price Range</label>
            <select
              name="priceRange"
              value={newRestaurant.priceRange}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="500">500</option>
              <option value="1500">1500</option>
              <option value="2000">2000</option>
              <option value="2500">2500</option>
              <option value="3000">3000</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-800">Ambiance</label>
            <input
              type="text"
              name="ambiance"
              value={newRestaurant.ambiance}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="E.g., Romantic, Casual"
            />
          </div>
          <div>
            <label className="block text-gray-800">Special Features</label>
            <input
              type="text"
              name="specialFeatures"
              value={newRestaurant.specialFeatures}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="E.g., Outdoor Seating, Live Music"
            />
          </div>
          <div>
            <label className="block text-gray-800">Upload Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
    
    {/* <table></table> */}

        <div>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 capitalize  text-center">table create</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          { console.log(tables)}
          {tables.map((table, index) => (
           
            
            <div
              key={index}
              className={`p-4 rounded-md shadow-md ${
                table.isAvailable ? "bg-green-100" : "bg-red-100"
              } transition-all`}
            >
              <h3 className="text-lg font-bold text-gray-800">
                Table {table.tableNumber}
              </h3>
              <p className="text-gray-600">Capacity: {table.capacity}</p>
              <p
                className={`font-bold ${
                  table.isAvailable ? "text-green-700" : "text-red-700"
                }`}
              >
                Status: {table.status}
              </p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => toggleTableStatus(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {table.isAvailable ? "Book" : "Make Available"}
                </button>
                <button
                  onClick={() => editTable(index)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTable(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">
            {editingTableIndex !== null ? "Edit Table" : "Add a Table"}
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              placeholder="Table Number"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={newTable.tableNumber}
              onChange={(e) =>
                setNewTable({ ...newTable, tableNumber: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Capacity"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={newTable.capacity}
              onChange={(e) =>
                setNewTable({ ...newTable, capacity: e.target.value })
              }
            />
            <button
              onClick={addOrUpdateTable}
              type="button"
              className={`px-6 py-2 ${
                editingTableIndex !== null ? "bg-yellow-500" : "bg-green-500"
              } text-white rounded-md`}
            >
              {editingTableIndex !== null ? "Update Table" : "Add Table"}
            </button>
          </div>
        </div>
      </div>

       <div className="text-center mt-6">

       
        <button
          onClick={createOrUpdateRestaurant}
          className={`mt-4 px-6 py-2  ${
            editingIndex !== null ? "bg-yellow-500" : "bg-green-500"
          } text-white rounded-md `}
        >
          {editingIndex !== null ? "Update Restaurant" : "Done"}
        </button>
      </div>
      </div>


    

      {/* Restaurant List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Restaurant Profiles</h2>
        {restaurants.length === 0 ? (
          <p className="text-gray-600 mt-4">No restaurants added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-md shadow-md space-y-4"
              >
                <h3 className="text-lg font-bold text-gray-800">
                 Resturant name : {restaurant.restaurantName}
                </h3>
                <p className="text-gray-600">Location: {restaurant.location}</p>
                <p className="text-gray-600">Cuisine: {restaurant.cuisine}</p>
                <p className="text-gray-600">
                  Price Range: {restaurant.priceRange}
                </p>
                <p className="text-gray-600">Ambiance: {restaurant.ambiance}</p>
                <p className="text-gray-600">
                  Special Features: {restaurant.specialFeatures}
                </p>
                {renderImagePreview(restaurant.image)}
                <div className="space-x-2 mt-4">
                  <button
                    onClick={() => editRestaurant(index)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRestaurant(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantManager;
