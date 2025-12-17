import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [progress, setprogress] = useState(0);
  useEffect(() => {
    if (progress < 100)
      setTimeout(() => {
        setprogress(progress + 10);
      }, 1000);
  }, [progress]);
  return (
    <div className="App">
      <div className="outer" style={{ height: "120px" }}>
        <div className="inner" style={{ width: `${progress}%` }}>
          {progress}
        </div>
      </div>
    </div>
  );
}
