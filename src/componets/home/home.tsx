import React from "react";
import Cards from "../cards/cards";
import "./home.css";
import { useMyContext } from "../../index";
import Pagination from "../pagination/pagination";

export default function Home({ setNotification, btnValue, setBtnValue }) {
  const propsContext = useMyContext();
  const [products, setProducts] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState([]);
  const [curretPage, setCurrentPage] = React.useState(1);
  let url = "";

  React.useEffect(() => {
    if (btnValue === "all")
      url = "http://apirest-fakeadidas.onrender.com/products/";
    else if (btnValue === "seller")
      url = "http://apirest-fakeadidas.onrender.com/products/seller";
    fetch(url)
      .then((data) => data.json())
      .then((products) => {
        setTotalProducts(products);
        let initialValue = (curretPage - 1) * 10;
        let finalValue = initialValue + 10;
        let product = products.slice(initialValue, finalValue);
        setProducts(product);
      });
  }, [btnValue, curretPage]);

  React.useEffect(() => {
    if (propsContext?.button) {
      propsContext.setButton(false);
      fetch(
        `http://apirest-fakeadidas.onrender.com/products/category/${propsContext.search}`
      )
        .then((data) => data.json())
        .then((products) => setProducts(products));
      propsContext.setSearch("");
    }
  }, [propsContext?.button]);

  return (
    <main>
      <div className="cover-page"></div>
      <div className="button-main-container">
        <button
          className="btn-masvendido"
          onClick={() => setBtnValue("seller")}
        >
          Lo más vendido
        </button>
        <button className="btn-todos" onClick={() => setBtnValue("all")}>
          Todos
        </button>
      </div>
      <Pagination
        currentPage={curretPage}
        numProds={totalProducts.length}
        setCurrentPage={setCurrentPage}
      />
      <Cards products={products} setNotification={setNotification} />
    </main>
  );
}
