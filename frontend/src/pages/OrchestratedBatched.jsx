import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { hostname } from "../constants";

const getMapByKey = (arr, key) => {
  return arr.reduce((acc, el) => {
    acc[el[key]] = el;
    return acc;
  }, {});
};

function OrchestratedBatched() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/users`)
      .then((res) => res.json())
      .then((users) => {
        const usersMap = getMapByKey(users, "userId");
        const userIds = Object.keys(usersMap);
        const postRequestBody = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        };
        Promise.all([
          fetch(`${hostname}/jobs/batched`, postRequestBody).then((res) =>
            res.json()
          ),
          fetch(`${hostname}/personal-details/batched`, postRequestBody).then(
            (res) => res.json()
          ),
        ]).then((results) => {
          const jobsMap = getMapByKey(results[0], "userId");
          const personalDetailsMap = getMapByKey(results[1], "userId");
          const mergedData = users.map((user) => ({
            ...user,
            ...jobsMap[user.userId],
            ...personalDetailsMap[user.userId],
          }));
          setData(mergedData);
        });
      });
  }, []);
  if (!data.length) return <div>Loading...</div>;
  return <DataTable data={data} />;
}

export default OrchestratedBatched;
