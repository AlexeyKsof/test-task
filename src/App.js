import { useState } from "react";

//Components
import Dropdown from "./components/Dropdown";

//Constants
import { CASES } from "./constants";

const App = () => {
  const [value, setValue] = useState("");
  const [activeCase, setActiveCase] = useState(CASES[0]);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSendData = () => {
      fetch("http://localhost:5000", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: value, case: activeCase }),
      })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.word);
        setError("");
      })
      .catch((err) => {
        setResult("");
        setError("Введите существительное в именительном падеже и единственном числе!")
      })
  };

  return (
    <div>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Dropdown items={CASES} callback={(res) => setActiveCase(res)} />
        <button onClick={handleSendData}>Отправить</button>
      </div>
      {error !== "" && <span>{error}</span>}
      {result !== "" && <p>Значение: {result}</p>}
    </div>
  );
};

export default App;
