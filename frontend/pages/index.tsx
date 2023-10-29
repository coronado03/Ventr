import { useEffect, useState } from "react";
import { ApplicationList } from "@/types/api/applicationList";

export default function Home() {

  const [data, setData] = useState<ApplicationList[]>();


  useEffect(()=>{
    console.log(data)
  }, [data])

  const getApplicationList = () => {
    fetch('https://localhost:7188/api/ApplicationList')
      .then(resp => {
        if (!resp.ok) {
          throw new Error(`Network response was not ok: ${resp.status}`);
        }
        return resp.json();
      })
      .then(data => setData(data))
      .catch(error => console.error(error));
    }

  return (
    <main>
      {data && data.map((item) => (
        <div key={item.applicationId}>{item.companyName}</div>
      ))}
      <button onClick={getApplicationList}> TOUCH </button>
    </main>
  )
}