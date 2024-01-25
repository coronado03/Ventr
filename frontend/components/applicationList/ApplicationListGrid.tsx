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
    // This for loop turns all the other sortbys off
    for (let i=0; i < updatedFilteringList.length; i++) {
      if (index != i)
        updatedFilteringList[i][1] = null;
    }
    if (filteringStates[index][1]  === "desc") {
      updatedFilteringList[index][1] = "asc";
      refetch(updatedFilteringList[index]);
    } else {
      updatedFilteringList[index][1] = "desc";
      refetch(updatedFilteringList[index]);
    }
    setFilteringStates(updatedFilteringList);
    console.log(filteringStates)

  };

  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  return (
    <table className="table-fixed border border-collapse border-blue-200 w-full md:w-10/12 md:mx-auto">
      <thead>
        <tr className="border border-blue-200">
          {Object.keys(columnHeaders).map((columnName, index) => (
            <th className="text-center items-center bg-sky-100 border border-blue-200	 text-slate-700" key={columnName}>
              <div className="flex flex-row w-full">
                <p className="text-lg font-semibold pl-3">{columnHeaders[columnName]}</p>
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
