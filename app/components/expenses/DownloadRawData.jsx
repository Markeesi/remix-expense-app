
import { FaDownload } from "react-icons/fa";
import {
    useFetcher,
  } from "@remix-run/react";
import { useEffect } from "react";


function RawExpenseLoader() {
    const fetcher = useFetcher();
  
    useEffect(() => {
      if (fetcher.type === "init") {
        fetcher.load("/expenses/raw");
      }
    }, [fetcher]);
  
    const file = fetcher.data; // the data from the loader
  //   window.open(URL.createObjectURL(new Blob([JSON.stringify(data)]), { type: "application/json"})) 
    
  return (
    <>
        <FaDownload />
        <span onClick={file}>Download Expenses</span>
    </>
    )
}

export default RawExpenseLoader;