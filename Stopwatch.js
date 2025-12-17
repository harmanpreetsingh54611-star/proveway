import { useState, useEffect } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    // Set interval when timer is running
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: clear interval when component unmounts or timer stops
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  const handelReset = () => {
    setSeconds(0);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Simple Timer</h1>
      <div style={{ fontSize: "48px", fontWeight: "bold", margin: "20px" }}>
        {seconds}s
      </div>

      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>

      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handelReset} disabled={!isRunning}>
        reset
      </button>
    </div>
  );
}

export default Stopwatch;
