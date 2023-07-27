// import button from "@material-tailwind/react/src/components/button";
import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  boundaryRange?: number;
  siblingRange?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  boundaryRange = 0,
  siblingRange = 1,
}) => {
  const [active, setActive] = useState<number>(1);
  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "red" : "blue-gray",
      onClick: () => {
        setActive(index);
        onPageChange(index);
      },
    } as any);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    onPageChange(currentPage - 1);
  };
  const getPageNumbers = (): React.ReactNode[] => {
    const pageNumbers: React.ReactNode[] = [];
    const boundaryCount = boundaryRange * 2;
    const siblingCount = siblingRange * 2;

    let startPage = Math.max(
      1,
      currentPage -
        siblingCount -
        Math.max(0, currentPage + siblingCount - totalPages - 1)
    );
    let endPage = Math.min(
      totalPages,
      currentPage + siblingCount + Math.max(0, siblingCount - currentPage + 1)
    );

    if (startPage > 1 + boundaryCount) {
      pageNumbers.push(
        <li key={1} className="page-item list-none">
          <button {...getItemProps(1)}>1</button>
        </li>
      );
      if (startPage !== 2 + boundaryCount) {
        pageNumbers.push(
          <li key="ellipsis-start" className="page-item disabled list-none">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item${currentPage === i ? " active" : ""} list-none`}
        >
          <button {...getItemProps(i)}>{i}</button>
        </li>
      );
    }

    if (endPage < totalPages - boundaryCount) {
      if (endPage !== totalPages - boundaryCount - 1) {
        pageNumbers.push(
          <li key="ellipsis-end" className="page-item disabled list-none">
            <span className="page-link">...</span>
          </li>
        );
      }
      pageNumbers.push(
        <li key={totalPages} className="page-item list-none">
          <button {...getItemProps(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-4">
      <button color="blue-gray" onClick={prev} disabled={active === 1}>
        {"<"}
      </button>
      <div className="flex items-center gap-2">{getPageNumbers()}</div>
      <button color="blue-gray" onClick={next} disabled={active === totalPages}>
        {">"}
      </button>
    </div>
    // <nav>
    //   <ul className="pagination">
    //     <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
    //       <button
    //         className="page-link"
    //         onClick={() => onPageChange(currentPage - 1)}
    //       >
    //         Previous
    //       </button>
    //     </li>
    //     {getPageNumbers()}
    //     <li
    //       className={`page-item${
    //         currentPage === totalPages ? " disabled" : ""
    //       }`}
    //     >
    //       <button
    //         className="page-link"
    //         onClick={() => onPageChange(currentPage + 1)}
    //       >
    //         Next
    //       </button>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Pagination;
