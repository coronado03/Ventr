import React from "react";
import { ApplicationList } from "@/types/api/applicationList";
import { ApplicationListGridProps } from "./types";
import Image from "next/image";
import ApplicationListItem from "./ApplicationListItem";
import { columnHeaders } from "./columnHeaders";

export default function ApplicationListGrid({
  data,
  loading,
}: ApplicationListGridProps) {
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  return (
    <table className="table-auto order-collapse border border-slate-600 w-full md:px-10">
      <thead>
        <tr className="border border-slate-600">
          {Object.keys(columnHeaders).map((columnName) => (
            <th className="text-start" key={columnName}>
              {columnHeaders[columnName]}
            </th>
          ))}
        </tr>
      </thead>

      {loading ? (
        <tbody>
          <tr>
            <td colSpan={Object.keys(columnHeaders).length}>
              <div className="flex justify-center items-center">
                <Image
                  alt="spinner"
                  src="/270-ring-with-bg.svg"
                  width={100}
                  height={100}
                />
              </div>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {data.map((item) => (
            <ApplicationListItem key={item.applicationId} data={item} />
          ))}
        </tbody>
      )}
    </table>
  );
}
