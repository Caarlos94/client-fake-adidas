import React from "react";
import "./pagination.css";

export default function Pagination({ numProds, setCurrentPage, currentPage }) {
  const numBtns = Math.ceil(numProds / 10);
  const btnArr: number[] = [];
  for (let i = 1; i <= numBtns; i++) {
    btnArr.push(i);
  }

  return (
    <div className="container-pagination">
      {btnArr.map((num) => {
        return (
          <button
            className={`btn-pagination ${currentPage === num ? "activo" : ""}`}
            key={num}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}
