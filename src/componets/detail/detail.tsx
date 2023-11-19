import React from "react";
import { useParams } from "react-router-dom";
import { Prod } from "../../interfaces/interfaces";
import {
  AiOutlineHeart,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import "./detail.css";
import toast, { Toaster } from "react-hot-toast";

export default function Detail({ setNotification, setNotificationCar }) {
  const [aux, setAux] = React.useState(false);
  const { id } = useParams();
  const [detail, setDetail] = React.useState<Prod>();
  const [tallaValue, setTallaValue] = React.useState("");
  const [tallaAlert, setTallaAlert] = React.useState("start");
  const [alert, setAlert] = React.useState(false);

  React.useEffect(() => {
    fetch(`https://apirest-fakeadidas.onrender.com/products/${id}`)
      .then((data) => data.json())
      .then((data) => {
        if (data) setDetail(data);
      });
  }, []);

  function handlerFav() {
    setAux((prevStatus) => !prevStatus);
    if (localStorage[`fav_${id}`]) {
      localStorage.removeItem(`fav_${id}`);
      let initialValueFav = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("fav")) initialValueFav++;
      }
      setNotification(initialValueFav);
    } else {
      localStorage.setItem(`fav_${id}`, `${id}`);
      let initialValueFav = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("fav")) initialValueFav++;
      }
      setNotification(initialValueFav);
    }
  }

  function handleTalla(talla: string) {
    setTallaAlert("done");
    setTallaValue(talla);
  }

  function handleCar() {
    if (tallaAlert === "start") {
      setAlert(true);
      setTallaAlert("wait");
      return;
    }
    setAux((prevStatus) => !prevStatus);
    if (localStorage[`car_${id}`]) {
      localStorage.removeItem(`car_${id}`);
      let initialValueCar = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("car")) initialValueCar++;
      }
      setNotificationCar(initialValueCar);
    } else {
      toast.success("Se añadio al carrito");
      localStorage.setItem(`car_${id}`, `${id}|${tallaValue}`);
      let initialValueCar = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("car")) initialValueCar++;
        setNotificationCar(initialValueCar);
      }
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      {detail ? (
        <div className="detail-container">
          <IconContext.Provider
            value={{
              size: "32px",
              color: "black",
              className: "arrow-icon-detail",
            }}
          >
            <NavLink to="/">
              <AiOutlineArrowLeft />
            </NavLink>
          </IconContext.Provider>
          <div className="detail-container-images">
            {detail.image.map((img) => {
              return <img key={img} className="detail-image" src={img} />;
            })}
          </div>
          <div className="detail-info-container">
            <p>{detail.keys[0]}</p>
            <p className="detail-name">{detail.name}</p>
            <p className="detail-price">${detail.price}</p>
            <p className="detail-unisex">
              ***UNISEX | NO APLICA NINGÚN DESCUENTO***
            </p>
            <p className="detail-recomendation">
              Para pies delgados recomendamos comprar la talla inferior. No
              aplica ningún tipo de descuento.
            </p>
            <h3 style={{ marginBottom: "10px" }}>Tallas</h3>
            <div className="detail-tallas-container">
              {detail.size.map((talla, index) => {
                return (
                  <div
                    className={tallaValue === talla ? "tallaActive" : ""}
                    key={index}
                    onClick={() => handleTalla(talla)}
                  >
                    {talla}
                  </div>
                );
              })}
            </div>
            <p
              className={
                alert && tallaAlert !== "done" ? "tallaAlert" : "tallaNoAlert"
              }
            >
              ¡Por favor selecciona tu talla!
            </p>
            <div style={{ display: "flex" }}>
              <button className="btn-comenzar" onClick={handleCar}>
                <span style={{ marginRight: "10px" }}>AÑADIR AL CARRITO</span>
                <AiOutlineArrowRight color="white" size="22px" />
              </button>
              <button className="btn-fav-detail" onClick={handlerFav}>
                <AiOutlineHeart size="20px" color="black" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Cargando</div>
      )}
    </>
  );
}
