import React, { useState, useEffect } from "react";
import "./App.css";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import NumImp from "./components/NumImp";
import Select from "./components/Select";
import Range from "./components/Range";
import Clock from "./components/Clock";
import ProgressBar from "./components/ProgressBar";
import TextBox from "./components/TextBox";
import validateFloat from "./functions/validateFloat";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import File from "./components/File";
import saveText from "./functions/saveText";

function App() {
  const [flavor, setFlavor] = useState("vanilková");
  const [checkboxes, setCheckboxes] = useState([]);
  const [amount, setAmount] = useState(1);
  const variety = ["smetanová", "jogurtová", "nizkotučná"];
  const [vari, setVari] = useState("smetanová");
  const [space, setSpace] = useState(77);
  const [countDown, setCountDown] = useState(10);
  const [mem1, setMem1] = useState(0);
  const [mem2, setMem2] = useState(0);
  const [resultMessage, setResultMessage] = useState(
    "Zadejte validní sčítance a zmáčkněte tlačítko výpočtu."
  );
  const [text, setText] = useState("");

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countDown]);

  const progress = countDown >= 0 ? ((10 - countDown) / 10) * 100 : 10;

  useEffect(() => {
    let temp = prompt("Zadej číslo (může být desetinné", 1.0);
    while (!validateFloat(temp)) {
      temp = prompt("Zadej číslo (může být desetinné", 1.0);
    }
    setMem1(temp);
  }, []);

  const handleData = (data, source) => {
    switch (source) {
      case "rbg-flavor": {
        setFlavor(data);
        break;
      }
      case "chb-checkboxes": {
        setCheckboxes(data);
        break;
      }
      case "amount": {
        setAmount(data);
        break;
      }
      case "sel-variety": {
        setVari(data);
        break;
      }
      case "rng-space": {
        setSpace(data);
        break;
      }
      case "num-mem1": {
        setMem1(data);
        break;
      }
      case "num-mem2": {
        setMem2(data);
        break;
      }
      case "txa-text": {
        setText(data);
        break;
      }
      case "file-load": {
        setText(data);
        break;
      }

      default:
        break;
    }
  };
  const handleEvent = (source) => {
    switch (source) {
      case "btn-download": {
        saveText(text);
        break;
      }
      default:
        break;
      case "btn-sum": {
        handleSum();
        break;
      }
    }
  };
  const handleSum = () => {
    if (validateFloat(mem1) && validateFloat(mem2)) {
      const sum = parseFloat(mem1) + parseFloat(mem2);
      setResultMessage(`Výsledek: ${sum}`);
    } else {
      alert(
        "Zadané hodnoty nejsou platná čísla. Prosím, zadejte validní sčítance."
      );
      setResultMessage(
        "Zadejte validní sčítance a zmáčkněte tlačítko výpočtu."
      );
    }
  };
  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row p-3">
          <div className="col-6">
            {/*prvni  sloupec*/}
            <p>
              {flavor} {checkboxes} {amount} kopeček(y) {vari}
            </p>
            <div className="my-4">
              <RbGroup
                label="Příchuť zmrzliny"
                id="rbg-flavor"
                selectedValue={flavor}
                handleData={handleData}
                dataIn={[
                  { label: "vanilková", value: "vanilková" },
                  { label: "čokoládová", value: "čokoládová" },
                  { label: "míchaná", value: "míchaná" },
                ]}
              />
            </div>
            <div className="my-4">
              <ChbGroup
                label="Něco navrch?"
                id="chb-checkboxes"
                dataIn={[
                  { label: "kousky oříšků", value: "s kousky oříšků" },
                  { label: "čoko hoblinky", value: "s čoko hoblinkami" },
                  {
                    label: "karamelové křupinky",
                    value: "s karamelovými křupinkami",
                  },
                ]}
                selectedValue={checkboxes}
                handleData={handleData}
              />
            </div>
            <div className="my-4">
              <NumImp
                id="amount"
                label="Počet kopečků (max.4)"
                min={1}
                max={4}
                dataIn={amount}
                handleData={handleData}
              />
            </div>
            <div className="my-4">
              <Select
                dataIn={variety}
                selectedValue={vari}
                label="Vyberte druh zmrzliny"
                id="sel-variety"
                handleData={handleData}
              />
              <div className="my-4">
                <Range
                  id="rng-space"
                  label="Místo na disku"
                  min="0"
                  max="100"
                  dataIn={space}
                  handleData={handleData}
                />
              </div>
              <div className="d-flex justify-content-start">
                <Clock />
                <p>, zbývá {space}% místa na disku</p>
              </div>
            </div>
          </div>
          {/* ./prvni  sloupec*/}

          <div className="col-6">
            {/*druhy  sloupec*/}
            <ProgressBar id="pgb-progress" dataIn={progress} />
            <div className="my-4">
              <p>Instalace probihá, čekejte {countDown} sekund</p>
            </div>
            <div className="row my-4">
              <div className="col-6">
                <TextBox
                  label="sčítanec 1"
                  dataIn={mem1}
                  id="num-mem1"
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                <TextBox
                  label="sčítanec 2"
                  dataIn={mem2}
                  id="num-mem2"
                  handleData={handleData}
                />
              </div>
              <div className="row my-4">
                <div className="col-6 my-4">
                  <Button
                    id="btn-sum"
                    label="Vypočítej součet"
                    handleEvent={handleEvent}
                  />
                </div>
                <div className="col-6 my-4">
                  <p>{resultMessage}</p>
                </div>
                <TextArea
                  id="txa-text"
                  label="Operace s textem"
                  dataIn={text}
                  handleData={handleData}
                  height={150}
                />
              </div>
              <div className="row my-4">
                <div className="col-6">
                  <File
                    id="file-load"
                    label="Nacti soubor TXT"
                    handleData={handleData}
                  />
                </div>
                <div className="col-6">
                  <Button
                    id="btn-download"
                    label="Stahni soubor s textem"
                    handleEvent={handleEvent}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ./druhy  sloupec*/}
        </div>
      </div>
    </div>
  );
}

export default App;
