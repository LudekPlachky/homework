import React from "react";

function NumImp({ min, max, dataIn, label, handleData, id }) {
  const handleChange = (e) => {
    handleData(e.target.value, id);
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
    </>
  );
}

export default NumImp;
