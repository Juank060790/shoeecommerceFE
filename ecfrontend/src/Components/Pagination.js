import React from "react";

const PaginationItem = ({ pageNumber, setPageNumber, pages, loading }) => {
  var btns = document.querySelectorAll(".btn");
  var paginationWrapper = document.querySelector(".pagination-wrapper");
  // var bigDotContainer = document.querySelector(".big-dot-container");
  // var littleDot = document.querySelector(".little-dot");

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", btnClick);
  }

  function btnClick() {
    if (this.classList.contains("btn--prev")) {
      paginationWrapper.classList.add("transition-prev");
    } else {
      paginationWrapper.classList.add("transition-next");
    }

    // var timeout = setTimeout(cleanClasses, 500);
  }

  // function cleanClasses() {
  //   if (paginationWrapper.classList.contains("transition-next")) {
  //     paginationWrapper.classList.remove("transition-next");
  //   } else if (paginationWrapper.classList.contains("transition-prev")) {
  //     paginationWrapper.classList.remove("transition-prev");
  //   }
  // }

  // PAGINATION FUNCTIONS

  const handleClickOnPrev = (e) => {
    e.preventDefault();

    if (pageNumber > 1 && !loading) {
      setPageNumber((num) => num - 1);
      // console.log("PREV");
    }
  };
  const handleClickOnNext = (e) => {
    e.preventDefault();

    if (pageNumber < pages && !loading) {
      setPageNumber((num) => num + 1);
      // console.log("NEXT", pageNumer);
    }
  };

  return (
    <div className="pagination-wrapper">
      <svg
        onClick={handleClickOnPrev}
        className="btn  btn--prev"
        height="96"
        viewBox="0 0 24 24"
        width="96"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
        <path d="M0-.5h24v24H0z" fill="none" />
      </svg>

      <div className="pagination-container">
        <div className="little-dot  little-dot--first"></div>
        <div className="little-dot">
          <div className="big-dot-container">
            <div className="big-dot"></div>
          </div>
        </div>
        <div className="little-dot  little-dot--last"></div>
      </div>

      <svg
        onClick={handleClickOnNext}
        className="btn  btn--next"
        height="96"
        viewBox="0 0 24 24"
        width="96"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
        <path d="M0-.25h24v24H0z" fill="none" />
      </svg>
    </div>
  );
};

export default PaginationItem;
