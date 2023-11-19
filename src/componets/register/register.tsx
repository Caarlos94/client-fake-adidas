import React from "react";
import "./register.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";

export default function Register() {
  const [auth, setAuth] = React.useState("REGISTER");
  const [data, setData] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prevStatus) => {
      return { ...prevStatus, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(
      auth === "REGISTER"
        ? "https://apirest-fakeadidas.onrender.com/auth/register/"
        : "https://apirest-fakeadidas.onrender.com/auth/login/",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data);
        navigate("/profile");
      });
    setData({ email: "", password: "" });
  }

  return (
    <div className="register-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-info-container">
          <div className="form-title-container">
            <h4
              id="hover"
              className={auth === "REGISTER" ? "register-active" : ""}
              onClick={() => setAuth("REGISTER")}
            >
              REGISTRAR
            </h4>
            <h4
              id="hover"
              className={auth === "LOGIN" ? "register-active" : ""}
              onClick={() => setAuth("LOGIN")}
            >
              INICIAR SESIÓN
            </h4>
          </div>
          <label className="info-form" htmlFor="email">
            Correo
          </label>
          <input
            name="email"
            className="input-form"
            autoComplete="off"
            id="email"
            type="text"
            onChange={handleChange}
            value={data.email}
          />
          <label className="info-form" htmlFor="password">
            Contraseña
          </label>
          <input
            name="password"
            className="input-form"
            id="password"
            type="password"
            onChange={handleChange}
            value={data.password}
          />
          <button className="btn-form" type="submit">
            REGISTRARSE
          </button>
        </div>
        <IconContext.Provider
          value={{
            size: "32px",
            color: "black",
            className: "global-class-name",
          }}
        >
          <NavLink to="/">
            <AiOutlineArrowLeft />
          </NavLink>
        </IconContext.Provider>
      </form>
    </div>
  );
}
