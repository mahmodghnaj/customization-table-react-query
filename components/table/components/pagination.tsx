import { FC } from "react";
import { PaginationProps } from "../type";

const Pagination: FC<PaginationProps> = ({
  totalPages,
  page,
  handlePageChange,
}) => {
  const buttons = [];
  const maxButtons = 5;
  const startPage = Math.max(1, page - Math.floor(maxButtons / 2));

  const pageChang = (newPage: number) => {
    handlePageChange({
      page: newPage,
    });
  };

  const addEllipsis = (key: string, onClick: any) => {
    buttons.push(
      <span key={key} className="join-item btn btn-square" onClick={onClick}>
        ...
      </span>
    );
  };

  if (startPage > 1) {
    buttons.push(
      <button
        key="first"
        onClick={() => pageChang(1)}
        className={`join-item btn btn-square ${
          1 === Number(page) ? "btn-active" : ""
        }`}
      >
        1
      </button>
    );
    if (startPage > 2) {
      addEllipsis("firstEllipsis", () => pageChang(startPage - maxButtons));
    }
  }

  for (
    let i = 0;
    i < maxButtons &&
    startPage + i <= Math.min(totalPages, startPage + maxButtons - 1);
    i++
  ) {
    const pageNumber = startPage + i;
    buttons.push(
      <button
        key={pageNumber}
        onClick={() => pageChang(pageNumber)}
        className={`join-item btn btn-square ${
          pageNumber === Number(page) ? "btn-active" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  }

  if (startPage + maxButtons - 1 < totalPages) {
    if (startPage + maxButtons < totalPages) {
      addEllipsis("lastEllipsis", () => pageChang(startPage + maxButtons));
    }
    buttons.push(
      <button
        key="last"
        onClick={() => pageChang(totalPages)}
        className={`join-item btn btn-square ${
          totalPages === Number(page) ? "btn-active" : ""
        }`}
      >
        {totalPages}
      </button>
    );
  }

  return <div className="join">{buttons}</div>;
};

export default Pagination;
