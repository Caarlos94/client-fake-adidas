import React from "react";
import "./card-car.css";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function CardCar({ product, talla, handleClose }) {
  const cantidad = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [localPrice, setLocalPrice] = React.useState(product.price);

  function handleCantidad(e) {
    const cantidadSeleccionada = e.target.value;
    const totalIndividual =
      parseInt(product.price.replace(",", "")) * cantidadSeleccionada;
    setLocalPrice(totalIndividual.toLocaleString("en-US"));
    localStorage.setItem(`cantidad_${product._id}`, cantidadSeleccionada);
  }

  return (
    <div className="card-car-container">
      <NavLink to={`/detail/${product._id}`}>
        <div className="card-car-image-container">
          <img src={product.image[0]} alt="product" />
        </div>
      </NavLink>

      <div className="card-car-info-container">
        <NavLink to={`/detail/${product._id}`} style={{ all: "unset" }}>
          <p className="card-car-info-name">{product.name.toUpperCase()}</p>
          <p className="card-car-info-key">{product.keys[0].toUpperCase()}</p>
        </NavLink>
        <p>TALLA: {talla}</p>
        <select onChange={handleCantidad} className="select-talla-card">
          {cantidad.map((cant, index) => {
            return (
              <option key={index} value={cant}>
                {cant}
              </option>
            );
          })}
        </select>
      </div>
      <div className="card-car-button">
        <p>${localPrice}.00</p>
        <button onClick={() => handleClose(product._id)}>
          <IoMdClose size={23} />
        </button>
      </div>
    </div>
  );
}
