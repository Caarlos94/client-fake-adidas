import React from "react";
import "./card-fav.css";
import { NavLink } from "react-router-dom";

export default function CardFav({ fav }) {
  return (
    <NavLink style={{ all: "unset" }} to={`/detail/${fav._id}`}>
      <div className="cardFav-container">
        <img style={{ width: "100%" }} src={fav.image[0]} alt="product" />
        <div className="cardFav-price-container">
          <p className="cardFav-price">${fav.price}</p>
        </div>
        <p style={{ paddingLeft: "10px" }}>{fav.name}</p>
      </div>
    </NavLink>
  );
}
