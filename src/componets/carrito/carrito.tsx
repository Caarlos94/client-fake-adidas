import React from "react";
import { Prod } from "../../interfaces/interfaces";
import "./carrito.css";
import BtnComenzar from "../utils/btn-comenzar";
import CardCar from "../card-car/card-car";
import { metodosPago } from "../utils/metodosPago";
import { Pay } from "../../interfaces/interfaces";

export default function Carrito({ setNotificationCar }) {
  const [carrito, setCarrito] = React.useState<Prod[]>([]);
  const [talla, setTalla] = React.useState("");
  const [total, setTotal] = React.useState<string | number>(0);
  const [aux, setAux] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("car")) {
          const search = value.slice(0, value.indexOf("|"));
          localStorage.setItem(`cantidad_${search}`, "1");
          setTalla(value.slice(value.indexOf("|") + 1, value.length));
          fetch(`http://apirest-fakeadidas.onrender.com/products/${search}`)
            .then((data) => data.json())
            .then((product) => {
              setCarrito((prevState) => {
                return [...prevState, product];
              });
            });
        }
      }
    }
  }, []);

  React.useEffect(() => {
    if (carrito.length > 0) {
      const result = carrito.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.price.replace(",", "")),
        0
      );
      let totalValue = result.toLocaleString("en-US");
      setTotal(totalValue);
    }
  }, [carrito]);

  function EmptyCar() {
    return (
      <div className="emptyCar-container">
        <p style={{ fontSize: "28px" }}>EL CARRITO ESTÁ VACÍO</p>
        <p style={{ fontSize: "20px" }}>
          Una vez que añadas algo a tu carrito, aparecerá aquí. ¿Listo para
          empezar?
        </p>
        <BtnComenzar text={"COMENZAR"} />
        <img
          style={{ marginTop: "40px", width: "700px" }}
          src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esMX/Images/MEXICO_2020_tcm217-546571.png"
          alt=""
        />
      </div>
    );
  }

  function handleClose(id: string) {
    setAux((prevStatus) => !prevStatus);
    if (localStorage[`car_${id}`]) {
      localStorage.removeItem(`car_${id}`);
      localStorage.removeItem(`cantidad_${id}`);
      let initialValueFav = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("car")) initialValueFav++;
      }
      setNotificationCar(initialValueFav);
    }
    const filterProducts = carrito.filter((product) => product._id !== id);
    setCarrito(filterProducts);
  }

  function handlePay(e) {
    let cant: Pay[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const allValues = { ...localStorage };
      const [key, value] = Object.entries(allValues)[i];
      if (key.includes("cantidad")) {
        const id = key.slice(key.indexOf("_") + 1, key.length);
        const cantidad = value;
        cant.push({ id, cantidad });
      }
      console.log(cant);
    }
    e.preventDefault();
    fetch("http://apirest-fakeadidas.onrender.com/payment/", {
      method: "POST",
      body: JSON.stringify(cant),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.url))
      .catch((error) => console.log(error));
  }

  function FullCar() {
    return (
      <div className="carrito-full-container">
        <div className="carrito-info-container">
          <h2>TU CARRITO</h2>
          <p>
            Los artículos en tu carrito no están reservados. Termina el proceso
            de compra ahora para adquirirlos.
          </p>
          {carrito.map((product) => {
            return (
              <CardCar
                key={product._id}
                product={product}
                talla={talla}
                handleClose={handleClose}
              />
            );
          })}
        </div>
        <div className="carrito-resumen-pedido">
          <BtnComenzar
            handlePay={handlePay}
            text={"IR A PAGAR"}
            tamaño={"grande"}
          />
          <div>
            <h3 style={{ margin: "40px 0" }}>RESUMEN DEL PEDIDO</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ margin: "0" }}>
                {carrito.length}{" "}
                {carrito.length == 1 ? "producto" : "productos"}
              </p>
              <p style={{ margin: "0" }}>${total}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Entrega</p>
              <p>Gratis</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bolder",
                fontSize: "17px",
              }}
            >
              <p style={{ margin: "0" }}>Total</p>
              <p style={{ margin: "0" }}>${total}</p>
            </div>
            <p style={{ marginTop: "5px" }}>[IVA incluido]</p>
          </div>
          <div className="metodos-pago-car">
            {metodosPago.map((metodo, index) => (
              <img key={index} src={metodo} alt="Métodos de pago" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-containt-component">
      {carrito.length ? <FullCar /> : <EmptyCar />}
    </div>
  );
}
