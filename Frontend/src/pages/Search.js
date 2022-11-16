import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Table from "../components/Table";
import { useEffect } from "react";

const Search = () => {
  const [tasks, setTasks] = useState({ businesses: [], region: [], total: -1 });
  const [state, setState] = useState(false);

  useEffect(() => {}, []);

  const axiosTask = async (task) => {
    const res = await axios({
      method: "get",
      // url: "http://localhost:8081/search",
      url: "https://hw8-project-368000.uw.r.appspot.com/search",
      params: {
        term: task.Keyword,
        latitude: task.lat,
        longitude: task.lng,
        radius: task.Distance * 1600,
        categories: task.Category,
        limit: 10,
      },
      headers: {
        Authorization:
          "Bearer pvwAzDkoQqbsC8dzksa9R3ScsLuerrVw8b3RC0YuAVPJnasUdK3CLCgWyFEIH1wFS2iqW1Ykx3z1wFGaYGgHyxhiJ4dVvTrgg5Kqr-yl3ju7fpm3OrkdjefoGj9jY3Yx",
      },
    });
    setTasks(res.data);
  };

  const onClear = () => {
    setTasks({ businesses: [], region: [], total: -1 });
  };

  return (
    <div className="px-3">
      <Form onAdd={axiosTask} onClear={onClear} />
      <Table tasks={tasks} />
    </div>
  );
};

export default Search;
