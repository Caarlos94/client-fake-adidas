import React from "react";
import "./card.css";
import { AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";

export default function Card({ data, setNotification }) {
  const [aux, setAux] = React.useState(false);

  function handlerFav() {
    setAux((prevStatus) => !prevStatus);
    if (localStorage[`fav_${data._id}`]) {
      localStorage.removeItem(`fav_${data._id}`);
      let initialValueFav = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("fav")) initialValueFav++;
      }
      setNotification(initialValueFav);
    } else {
      localStorage.setItem(`fav_${data._id}`, data._id);
      let initialValueFav = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("fav")) initialValueFav++;
      }
      setNotification(initialValueFav);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div className="fav-icon-container">
        <IconContext.Provider
          value={
            localStorage[`fav_${data._id}`]
              ? { size: "23px", color: "red" }
              : { size: "23px" }
          }
        >
          <AiOutlineHeart onClick={handlerFav} />
        </IconContext.Provider>
      </div>
      <NavLink style={{ all: "unset" }} to={`detail/${data._id}`}>
        <div className="card-container">
          <img style={{ width: "275px" }} src={data.image[0]} alt="product" />
          <div className="card-price-container">
            <p className="card-price">${data.price}</p>
          </div>
          <p>{data.name}</p>
          <p>{data.keys[0]}</p>
          <p>{data.category}</p>
        </div>
      </NavLink>
    </div>
  );
}
