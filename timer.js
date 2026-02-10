
import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [value, changeValue] = useState(0);
  const [start, setStart] = useState(false);
  useEffect(() => {
    let id;
    if (start) {
      id = setInterval(() => {
        changeValue(value + 1);
      }, 1000);
    }

    return () => clearInterval(id);
  }, [value, start]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen! {value}</h2>
      <button
        onClick={() => {
          setStart(!start);
        }}
      >
        start count
      </button>
    </div>
  );
}
