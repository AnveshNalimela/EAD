import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const currentTimer = useRef(null);

  function startTimer() {
    if (!isRunning) {
      setIsRunning(true);
      currentTimer.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  }
  function pauseTimer() {
    if (isRunning) {
      clearInterval(currentTimer.current);
      setIsRunning(false);
    }
  }
  function resetTimer() {
    clearInterval(currentTimer.current);
    setIsRunning(false);
    setCount(0);
  }

  return (
    <>
      <h1>Timer</h1>
      <p>
        <code>Time count:</code> {count}
      </p>
      <div className="card">
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
}

export default App;
