import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [isNumAllowed, setIsNumAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const passwordRef = useRef(null);

  //USING USECALLBACK FOR PASSWORD GENERATOR
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQUSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumAllowed) {
      str = str + "0123456789";
    }
    if (isCharAllowed) {
      str = str + "(*&^%$#@!-+=";
    }
    for (let index = 1; index <= length; index++) {
      //GENERATING RANDOM NUMER

      let randomIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [isCharAllowed, isNumAllowed, length, setPassword]);

  //HANDLING THE BUTTON TO COPY THE PASSWORD
  const handleCopyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };
  //HANDLING WHEN TO RENDER THE passwordGenerator
  useEffect(() => {
    passwordGenerator();
  }, [length, isCharAllowed, isNumAllowed, passwordGenerator]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="password"
        style={{
          boxShadow: ".2px .2px 10px #ffffff",
          height: "300px",
          width: "500px",
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
          Password Generator
        </h1>
        <div
          className="password-content"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            style={{
              height: "30px",
              width: "350px",
              fontSize: "20px",
              marginTop: "3rem",
              outline: "none",
              paddingLeft: "5px",
            }}
          />
          <button
            onClick={handleCopyPassword}
            className="copy-button"
            style={{
              height: "34px",
              marginTop: "3rem",
              fontSize: "20px",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Copy
          </button>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "2rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="password-use-control"
            style={{ marginRight: ".5rem", display: "flex" }}
          >
            <input
              type="range"
              min="10"
              max="30"
              defaultValue="8"
              onChange={(e) => {
                return setLength(e.target.value);
              }}
            />
            <label
              htmlFor="length"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              Length :
              <h4
                style={{
                  width: "10px",
                  marginRight: "10px",
                  marginLeft: "3px",
                }}
              >
                {length}
              </h4>
            </label>
          </div>
          <div className="checkboxes" style={{ marginRight: ".5rem" }}>
            <input
              type="checkBox"
              defaultChecked={isNumAllowed}
              style={{ marginRight: "5px" }}
              onChange={() => {
                setIsNumAllowed((prev) => {
                  return !prev;
                });
              }}
            />
            <label htmlFor="numbers" style={{ marginRight: "10px" }}>
              Number
            </label>
          </div>
          <div
            className="checkboxes"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="checkBox"
              defaultChecked={isCharAllowed}
              style={{ marginRight: "5px" }}
              onChange={() => {
                setIsCharAllowed((prev) => {
                  return !prev;
                });
              }}
            />
            <label htmlFor="specialCharacters">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
