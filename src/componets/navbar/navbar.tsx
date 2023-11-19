import React from "react";
import "./navbar.css";
import { NavLink, useParams } from "react-router-dom";
import { BsFillPersonFill, BsFillBagCheckFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RiLoginBoxFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import AutoSuggestFn from "../autosugest/autosuges";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";

export default function Navbar({ notification, setBtnValue, notificationCar }) {
  let { id } = useParams();
  const [scrolling, setScrolling] = React.useState(false);
  let stylePosition = "";
  if (id) stylePosition = "position-active";

  const linksNavbar = [
    "CALZADO",
    "HOMBRE",
    "MUJER",
    "NIÑOS",
    "DEPORTE",
    "MUNDO ADIDAS",
  ];

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    setScrolling(scrollY > 610);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`${
          scrolling ? "navbar-container-relative" : "navbar-container"
        } ${stylePosition}`}
      >
        <IconContext.Provider
          value={{
            size: "22px",
            color: "black",
            className: "global-class-name",
          }}
        >
          <NavLink to="/" className="logo-container">
            <img
              style={{ width: "100px" }}
              src="https://ams3.digitaloceanspaces.com/graffica/2022/12/Adidas-Logo-1971.jpeg"
              alt="logo"
            />
          </NavLink>
          <div className="navbar-links-container ">
            {linksNavbar.map((link) => {
              return (
                <NavLink key={link} to="/" className="navbar-link">
                  {link}
                </NavLink>
              );
            })}
          </div>
          <div className="searchbar-main-container">
            <AutoSuggestFn setBtnValue={setBtnValue} />
            <NavLink to="/auth">
              <BsFillPersonFill />
            </NavLink>
            <NavLink to="/profile">
              <RiLoginBoxFill />
            </NavLink>
            <div style={{ position: "relative" }}>
              <div className="icon-fav-alert">
                <p>{notification}</p>
              </div>
              <NavLink to="/fav">
                <AiOutlineHeart />
              </NavLink>
            </div>
            <div style={{ position: "relative" }}>
              <div className="icon-car-alert">
                <p>{notificationCar}</p>
              </div>
              <NavLink to="/carrito">
                <BsFillBagCheckFill />
              </NavLink>
            </div>
          </div>
        </IconContext.Provider>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
