import { FC } from "react";
import Pagination from "./pagination";
import { FooterProps } from "../type";

const Footer: FC<FooterProps> = ({
  limit,
  handleLimitChange,
  totalPages,
  page,
  handleChangeParams,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <div className="mx-2">
          <label className="mr-2">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-500 rounded"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          {totalPages && (
            <>
              <Pagination
                totalPages={totalPages}
                page={page}
                handlePageChange={handleChangeParams}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Footer;
