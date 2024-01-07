// JSX
import React, { useState, useEffect } from "react";
import "../App.scss";

function LifeTime() {
  const [birthdate, setBirthdate] = useState("");
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  const calculateYearsLived = () => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const yearsLived = (currentDate - birthDate) / millisecondsPerYear;

    setTimer(yearsLived);

    setShowTimer(true);
  };
  // RESET FUNCTION FOR THE RESET BUTTON
  const resetPage = () => {
    setBirthdate("");
    setTimer(0);
    setShowTimer(false);
  };

  useEffect(() => {
    if (showTimer) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.000001);
      }, 1);

      return () => clearInterval(intervalId);
    }
  }, [showTimer]);

  return (
    <div className="lifetime-container">
      {!showTimer ? (
        <div className="center-container">
          <h1 className="ageLabel">When were you born? 👶</h1>
          <form
            className="dateOfBirth"
            onSubmit={(e) => {
              e.preventDefault();
              calculateYearsLived();
            }}
          >
            <div>
              <input
                type="date"
                id="birthdate"
                required
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
              <button type="submit" className="ageButton">
                Calculate
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="center-container">
          <div className="timer">
            <div className="ageLabelTwo">YOUR AGE ⏰</div>
            <div className="yearsLived">
              {Math.floor(timer)}
              <sup>{(timer % 1).toFixed(6).substring(1)}</sup>
            </div>
          </div>
        </div>
      )}
      <button className="resetButton" onClick={resetPage}>
        Reset
      </button>
    </div>
  );
}

export default LifeTime;
