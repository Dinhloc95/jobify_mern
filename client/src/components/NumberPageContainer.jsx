import React from "react";
import { useAllJobContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { handle } from "express/lib/router";

const NumberPageContainer = () => {
  const {
    data: { numOfPage, currentPage },
  } = useAllJobContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: numOfPage }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        type="button"
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButton = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    if (numOfPage > 3 && currentPage > 2) {
      pageButtons.push(<span className=" page-btn dots">...</span>);
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }
    if (currentPage !== 1 && currentPage !== numOfPage) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }
    if (currentPage !== numOfPage && currentPage !== numOfPage - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }
    if (currentPage < numOfPage - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ....
        </span>
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPage,
        activeClass: currentPage === numOfPage,
      })
    );
    return pageButtons;
  };
  return (
    <Wrapper>
      <button
        type="button"
        className="btn block-btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPage;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>

      <div className="btn-container">
        {/* {pages.map((pageNumber) => (
          <button
            type="button"
            className={`btn page-btn ${currentPage === pageNumber && "active"}`}
            key={pageNumber}
            onClick={() => {
              handlePageChange(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        ))} */}
        {renderPageButton()}
      </div>

      <button
        type="button"
        className="btn block-btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPage) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default NumberPageContainer;
