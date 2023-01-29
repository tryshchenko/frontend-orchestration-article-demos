import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { hostname } from "../constants";

function Combined() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/combined`)
      .then((res) => res.json())
      .then(setData);
  }, []);
  if (!data.length) return <div>Loading...</div>;
  return <DataTable data={data} />;
}

export default Combined;
