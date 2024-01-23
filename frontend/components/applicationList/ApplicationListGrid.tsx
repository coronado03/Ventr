import React, { useState } from "react";
import { ApplicationList } from "@/types/api/applicationList";
import { ApplicationListGridProps } from "./types";
import Image from "next/image";
import ApplicationListItem from "./ApplicationListItem";
import { columnHeaders } from "./columnHeaders";

export default function ApplicationListGrid({
  data,
  loading,
  refetch,
}: ApplicationListGridProps) {

  const initialFilteringStates: (string | null)[][] = Object.keys(columnHeaders).map(key => [key, null]);

  const [filteringStates, setFilteringStates] = useState(initialFilteringStates);

  const onFilterClick = (index: number) => {
    const updatedFilteringList = [...filteringStates];
   
    console.log(updatedFilteringList)

    if (filteringStates[index][1]  === "desc") {
      updatedFilteringList[index][1] = "asc";
      refetch(updatedFilteringList[index]);
    } else {
      updatedFilteringList[index][1] = "desc";
      refetch(updatedFilteringList[index]);
    }
    setFilteringStates(updatedFilteringList);
  };

  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  return (
    <table className="table-fixed border border-collapse border-slate-600 w-full md:px-10">
      <thead>
        <tr className="border border-slate-600">
          {Object.keys(columnHeaders).map((columnName, index) => (
            <th className="text-start border border-slate-600" key={columnName}>
              <div className="flex flex-row w-full">
                {columnHeaders[columnName]}
                <button
                  className={`justify-self-end ${
                    filteringStates[index][1] === "desc" ? "rotate-180" : ""
                  }`}
                  onClick={() => onFilterClick(index)}
                >
                  <Image
                    className=""
                    alt="sort"
                    src="/sort-arrow.png"
                    width={10}
                    height={10}
                  />
                </button>
              </div>
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
