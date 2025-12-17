import { useState } from "react";
import "./styles.css";

export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="App">
      {visible ? <h1>Hekko</h1> : <></>}
      {/* {visible ? <First/> : <Second/>} */}
      <button onClick={() => setVisible(!visible)}>toggel</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
function First(){
  return <>
    
  </>
}
function Second(){
   return <>
    <h1>Hi</h1>
  </>
}
