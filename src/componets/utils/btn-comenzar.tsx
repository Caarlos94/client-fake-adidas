import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./btn-comenzar.css";

export default function BtnComenzar({
  text,
  tamaño = "",
  handlePay = (e) => {},
}) {
  return (
    <NavLink style={{ textDecoration: "none" }} to="/">
      <button
        onClick={(e) => handlePay(e)}
        className={`btn-comenzar ${tamaño}`}
      >
        <span style={{ marginRight: "10px" }}>{text}</span>
        <AiOutlineArrowRight color="white" size="22px" />
      </button>
    </NavLink>
  );
}
