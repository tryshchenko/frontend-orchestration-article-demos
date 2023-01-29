import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { hostname } from "../constants";

function Orchestrated() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${hostname}/users`)
      .then((res) => res.json())
      .then((users) => {
        const usersMap = users.reduce((acc, user) => {
          acc[user.userId] = user;
          return acc;
        }, {});
        const promises = users.flatMap(({ userId }) => [
          fetch(`${hostname}/jobs/${userId}`).then((res) => res.json()),
          fetch(`${hostname}/personal-details/${userId}`).then((res) =>
            res.json()
          ),
        ]);
        Promise.all(promises).then((results) => {
          const data = results.reduce((users, next) => {
            // we will enter this twice, as we'll get two promises, one for jobs and another for personal details
            users[next.userId] = { ...users[next.userId], ...next };
            return users;
          }, usersMap);
          setData(Object.values(data));
        });
      });
  }, []);
  if (!data.length) return <div>Loading...</div>;
  return <DataTable data={data} />;
}

export default Orchestrated;
