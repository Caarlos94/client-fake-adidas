import React from "react";
import "./perfil.css";
import BtnComenzar from "../utils/btn-comenzar";
import CardFav from "../card-fav/card-fav";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [productProfile, setProductsProfile] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetch("http://apirest-fakeadidas.onrender.com/products/profile", {
      headers: {
        Authorization: token,
      },
    })
      .then((data) => data.json())
      .then((response) => setProductsProfile(response))
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);

  return (
    <div className="profile-container">
      <h2 style={{ marginBottom: "30px" }}>BIENVENIDO A TU PERFIL</h2>
      <BtnComenzar text="COMENZAR" />
      <div style={{ display: "flex", gap: "10px", marginTop: "50px" }}>
        {productProfile.map((favProduct, index) => {
          return <CardFav key={index} fav={favProduct} />;
        })}
      </div>
    </div>
  );
}
