import ApplicationListGrid from "./ApplicationListGrid";
import { useEffect, useState } from "react";
import { ApplicationList } from "@/types/api/applicationList";

export default function ApplicationList() {
  const [data, setData] = useState<ApplicationList[]>();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const getApplicationList = (filter?: (string | null)[]) => {
    setIsLoading(true);
    let sortOrderParam = ""
    if (filter && filter[0]) {
      console.log("filter" + filter)
      sortOrderParam = filter[1] === 'desc' ? `?${filter[0]}=desc` : `?${filter[0]}=asc`
    }
    const apiUrl = `https://localhost:7188/api/ApplicationList${sortOrderParam}`;
    
    console.log(apiUrl);
    fetch(apiUrl)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Network response was not ok: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <main className="flex flex-col w-screen items-center">
      <ApplicationListGrid data={data} refetch={getApplicationList} loading={loading} />
      <button onClick={()=>getApplicationList()}> TOUCH </button>
    </main>
  );
}
