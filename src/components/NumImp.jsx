import React, { useState } from "react";

function validatePositiveInt(input) {
  const num = parseInt(input);
  return !isNaN(num) && input == num && num > 0 && num <= 4;
}

function NumImp({ min, max, dataIn, label, handleData, id }) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // Validace pomocí funkce validatePositiveInt
    if (!validatePositiveInt(value)) {
      setError("Zadejte prosím kladné celé číslo v rozsahu 1-4.");
      return;
    }

    setError("");
    handleData(value, id);
  };

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        type="number"
        className="form-control"
        min={min}
        max={max}
        value={dataIn}
        id={id}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default NumImp;
