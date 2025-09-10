import React, { useEffect, useState } from "react";
import { GET_RES_API_URL, restaurantList } from "../../utils/config.js";
import RestaurantCard from "../components/RestaurantCard";
import Shimmer from "../components/Shimmer";
import useOnlinestatus from "../../utils/useOnlinestatus.js";

  const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  function filterData(searchText, restaurants) {
    return restaurants.filter((restaurant) =>
      restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const data = await fetch(GET_RES_API_URL);
      const json = await data.json();
      const restList = [];

      json?.data?.cards.forEach((value) => {
        const items = value?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (Array.isArray(items)) {
          items.forEach((val) => restList.push(val));
        }
      });

      if (restList && restList.length > 0) {
        setListOfRestaurant(restList);
        setFilteredList(restList);
      } else {
        const mockRestaurants = restaurantList.map((item) => ({ info: item.data }));
        setListOfRestaurant(mockRestaurants);
        setFilteredList(mockRestaurants);
      }
    } catch {
      const mockRestaurants = restaurantList.map((item) => ({ info: item.data }));
      setListOfRestaurant(mockRestaurants);
      setFilteredList(mockRestaurants);
    } finally {
      setLoadingData(false);
    }
  };

  const isOnline = useOnlinestatus();

  if (!isOnline) {
    return (
      <div className="flex justify-center items-center h-64">
        <h1 className="text-xl font-semibold text-red-500">You are currently offline. Please check your internet connection.</h1>
      </div>
    );
  }

  if (loadingData) {
    return <Shimmer />;
  }

  const handleSearch = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    setFilteredList(filterData(newSearchText, listOfRestaurant));
  };

  const handleFilter = () => {
    const topRated = listOfRestaurant.filter((data) => {
      const rating = Number(
        data?.info?.avgRating ?? data?.info?.avgRatingString ?? 0
      );
      return rating >= 4.5;
    });
    setFilteredList(topRated);
  };


  return (
    <div className="max-w-7xl mx-auto m-5 px-4 py-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Left: Filter Buttons */}
        <div className="flex gap-2 md:order-1 order-2 md:w-auto w-full">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition font-semibold"
            onClick={handleFilter}
          >
            Top Rated Restaurant
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition font-semibold"
            onClick={() => setFilteredList(listOfRestaurant)}
          >
            Reset Filter
          </button>
        </div>
        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center md:order-2 order-1">
          <input
            type="text"
            placeholder="Search restaurants"
            value={searchText}
            className="w-full md:w-96 px-4 py-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition mx-auto"
            onChange={handleSearch}
            style={{ marginBottom: "0.25rem" }}
          />
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:place-items-center md:grid-cols-3 lg:grid-cols-4 gap-6 bg-grey-50 p-4 rounded-lg">
        {filteredList.length > 0 ? (
          filteredList.map((restaurant, index) => (
            <RestaurantCard data={restaurant} key={index} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No restaurants available</p>
        )}
      </div>
    </div>
  );
};

export default Body;