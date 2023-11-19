import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componets/home/home";
import Register from "./componets/register/register";
import Detail from "./componets/detail/detail";
import Perfil from "./componets/perfil/perfil";
import "./index.css";
import Navbar from "./componets/navbar/navbar";
import Fav from "./componets/fav/fav";
import Carrito from "./componets/carrito/carrito";
import { Options } from "./interfaces/interfaces";
import reportWebVitals from "./reportWebVitals.js";

const MyContext = React.createContext<
  | {
      search: string;
      button: boolean;
      setSearch: React.Dispatch<React.SetStateAction<string>>;
      setButton: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

let initialValueFav = 0;
let initialValueCar = 0;

function App() {
  function localStorageCount() {
    if (localStorage.length > 0)
      for (let i = 0; i < localStorage.length; i++) {
        const allValues = { ...localStorage };
        const [key, value] = Object.entries(allValues)[i];
        if (key.includes("fav")) initialValueFav++;
        else if (key.includes("car")) initialValueCar++;
      }
  }
  localStorageCount();

  const [search, setSearch] = React.useState("");
  const [button, setButton] = React.useState(false);
  const [notification, setNotification] = React.useState(initialValueFav);
  const [notificationCar, setNotificationCar] = React.useState(initialValueCar);
  const [btnValue, setBtnValue] = React.useState<Options>("all");

  const propsContext = {
    search,
    button,
    setSearch,
    setButton,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={propsContext}>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
                notification={notification}
                notificationCar={notificationCar}
                setBtnValue={setBtnValue}
              />
            }
          >
            <Route
              path="/"
              element={
                <Home
                  setNotification={setNotification}
                  btnValue={btnValue}
                  setBtnValue={setBtnValue}
                />
              }
            />
            <Route
              path="/detail/:id"
              element={
                <Detail
                  setNotification={setNotification}
                  setNotificationCar={setNotificationCar}
                />
              }
            />
            <Route path="/profile" element={<Perfil />} />
            <Route path="/fav" element={<Fav />} />
            <Route
              path="/carrito"
              element={<Carrito setNotificationCar={setNotificationCar} />}
            />
          </Route>
          <Route path="/auth" element={<Register />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

// Hook personalizado para usar el contexto
const useMyContext = () => {
  return React.useContext(MyContext);
};

export { useMyContext };

render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
