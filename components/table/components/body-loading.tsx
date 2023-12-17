import React, { FC } from "react";
import { BodyLoadingPros } from "../type";

const BodyLoading: FC<BodyLoadingPros> = ({ columns, limit }) => {
  const generateRows = () => {
    const rows = [];

    for (let i = 0; i < limit; i++) {
      rows.push(
        <tr key={i}>
          {columns.map((column) => (
            <td key={column.name}>
              <div className="skeleton h-5 w-20"></div>
            </td>
          ))}
        </tr>
      );
    }

    return rows;
  };

  return <tbody>{generateRows()}</tbody>;
};

export default BodyLoading;
