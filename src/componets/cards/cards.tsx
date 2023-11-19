import React from "react";
import Card from "../card/card";
import { Prod } from "../../interfaces/interfaces";
import "./cards.css";

export default function Cards({ products, setNotification }) {
  return (
    <div className="cards-container">
      {products.map((product: Prod) => {
        return (
          <Card
            key={product._id}
            data={product}
            setNotification={setNotification}
          />
        );
      })}
    </div>
  );
}
