import React from "react";
import CardFav from "../card-fav/card-fav";
import { Prod } from "../../interfaces/interfaces";
import "./favs.css";
import BtnComenzar from "../utils/btn-comenzar";

export default function Fav() {
  const [favs, setFavs] = React.useState<Prod[]>([]);

  React.useEffect(() => {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("fav")) {
          fetch(`http://apirest-fakeadidas.onrender.com/products/${value}`)
            .then((data) => data.json())
            .then((product) => {
              setFavs((prevState) => {
                return [...prevState, product];
              });
            });
        }
      }
    }
  }, []);

  function EmptyFavs() {
    return (
      <div style={{ fontSize: "20px" }}>
        <p>0 ARTÍCULOS</p>
        <p>
          Aún no has añadido ningún artículo a tu lista de deseos. Comienza a
          comprar y añade tus favoritos.
        </p>
        <BtnComenzar text={"COMENZAR"} />
      </div>
    );
  }

  return (
    <div className="favs-container">
      <h2 style={{ fontSize: "28px" }}>MI LISTA DE DESEOS</h2>
      {favs.length ? (
        <>
          <p>
            {localStorage.length}
            {localStorage.length === 1 ? " ARTICULO" : " ARTICULOS"}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {favs.map((favProduct, index) => {
              return <CardFav key={index} fav={favProduct} />;
            })}
          </div>
        </>
      ) : (
        <EmptyFavs />
      )}
    </div>
  );
}
