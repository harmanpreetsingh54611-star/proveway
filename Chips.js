import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandboddmx</h1>
      <h2>Start editing to see some magic happen!</h2>
      <First />
    </div>
  );
}
function First() {
  const [changeText, setchange] = useState("");
  const [allChips, setAllChips] = useState([
    "harman",
    "manu",
    "anxbc",
    "ajsjd",
  ]);
  function deletec(indexrece) {
    setAllChips(
      allChips.filter((chips, index) => {
        if (indexrece != index) return chips;
      })
    );
  }
  function handleadd(e) {
    if (e.key === "Enter" && changeText.trim()) {
      setAllChips([...allChips, changeText]);
      setchange(""); // Clear input after adding
    }
    console.log(e.target.value);
  }
  return (
    <>
      <input
        value={changeText}
        type="text"
        name=""
        id=""
        placeholder="enter your text"
        onChange={(e) => setchange(e.target.value)}
        onKeyDown={(e) => handleadd(e)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {allChips.map((chips, index) => {
          return (
            <div key={index}>
              <span style={{ backgroundColor: "lightblue", margin: "10px" }}>
                {chips}
              </span>
              <button onClick={() => deletec(index)}>X</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
