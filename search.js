import { data } from "../util/data";
import { useState } from "react";
export default function Search() {
  const [list, setList] = useState(data);
  const [search, setSearch] = useState();
  const filter = () => {
    const filterData = list.filter((obj) => {
      if (obj.age > search) return true;
    });
    setList(filterData);
  };
  console.log(list);
  return (
    <>
      <h1>Search based on age</h1>
      <input
        type="text"
        placeholder="enter your age"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={filter}>search</button>
      {list.map((obj) => {
        return (
          <div style={{ border: "1px solid black", margin: "10px" }}>
            <h1>{obj.first_name}</h1>
            <h1>{obj.last_name}</h1>
            <h1>{obj.salary}</h1>
            <h1>{obj.age}</h1>
          </div>
        );
      })}
    </>
  );
}
