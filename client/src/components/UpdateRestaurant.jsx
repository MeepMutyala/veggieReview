import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import {usenavigate} from 'react-router-dom';

const UpdateRestaurant = (props) => {
    const restaurants = useContext(RestaurantsContext)
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const {id} = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
          const response = await RestaurantFinder.get(`/${id}`);
          console.log(response.data.data);
          setName(response.data.data.restaurant.name);
          setLocation(response.data.data.restaurant.location);
          setPriceRange(response.data.data.restaurant.price_range);
        };
    
        fetchData();
      }, []);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
          name,
          location,
          price_range: priceRange,
        });
        navigate("/");
      };

    return (
        <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
        </div>
    )
}

export default UpdateRestaurant