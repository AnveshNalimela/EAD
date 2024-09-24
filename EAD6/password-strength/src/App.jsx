import { useState } from "react";
import "./App.css";

function App() {
  const [strength, setStrength] = useState("");
  const [pwd, setPwd] = useState("");

  const checkStrength = (pwd) => {
    let score = 0;
    const expressions = [
      { regex: /[\d{8,}]/ },
      { regex: /[A-Z]/ },
      { regex: /[a-z]/ },
      { regex: /[0-9]/ },
      { regex: /[^A-Za-z0-9]/ },
    ];
    expressions.map((e) => {
      if (e.regex.test(pwd)) {
        score++;
      }
    });
    const values = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];

    setStrength(values[score - 1]);
  };

  const UpdatedPassword = (e) => {
    const newPwd = e.target.value;
    setPwd(newPwd);
    checkStrength(pwd);
  };

  return (
    <>
      <h1 id="heading">Password Strenth Checker</h1>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          value={pwd}
          onChange={UpdatedPassword}
        />
      </div>
      <p id="result">
        Strength:<strong>{strength}</strong>
      </p>
    </>
  );
}

export default App;
