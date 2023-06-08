import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./FoodCatalog.css";

const FoodCatalog = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const location = useLocation();
  const foodEndpoint = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodType = async () => {
      const res = await fetch(
        `http://localhost:8080/product?category=${foodEndpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setFilteredFoods(data);
    };
    fetchFoodType();
  }, []);

  return (
    <div className="food-catalog-container">
      <div className="food-catalog-wrapper">
        {filteredFoods?.length !== 0 && (
          <h2 className="food-catalog-title">
            The best {foodEndpoint} in the region
          </h2>
        )}
        <div className="food-catalog-foods">
          {filteredFoods.length !== 0 ? (
            filteredFoods.map((f) => (
              <NavLink
                to={`/food/${f._id}`}
                key={f._id}
                className="food-catalog-food"
              >
                <div className="food-catalog-imgContainer">
                  <img
                    src={`http://localhost:8080/images/${f?.img}`}
                    alt="foodImg"
                    className="food-catalog-foodImg"
                  />
                </div>
                <div className="food-catalog-foodDetails">
                  <h4 className="food-catalog-foodTitle">{f?.title}</h4>
                  <span className="food-catalog-price">
                    <span>$</span> {f?.price}
                  </span>
                </div>
              </NavLink>
            ))
          ) : (
            <h1 className="food-catalog-noQuantity">
              No {foodEndpoint} right now
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCatalog;
