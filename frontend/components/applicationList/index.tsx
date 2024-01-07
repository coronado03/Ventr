import ApplicationListGrid from "./ApplicationListGrid";
import { useEffect, useState } from "react";
import { ApplicationList } from "@/types/api/applicationList";

export default function ApplicationList() {
  const [data, setData] = useState<ApplicationList[]>();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(()=>{
    console.log(data)
  }, [data])

  const getApplicationList = () => {
    setIsLoading(true);
    fetch('https://localhost:7188/api/ApplicationList')
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`Network response was not ok: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
    }

  return (
    <main className="flex flex-col w-screen items-center">
      <ApplicationListGrid data={data} loading={loading}/>
      <button onClick={getApplicationList}> TOUCH </button>
    </main>
  )
}