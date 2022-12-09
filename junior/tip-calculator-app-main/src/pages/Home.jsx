import { useEffect, useState } from "react";

import Card from "../components/card/Card";
import Header from "../components/header/Header";
import Button from "../utils/button/Button";
import dollar_icon from "../assets/images/icon-dollar.svg";
import person_icon from "../assets/images/icon-person.svg";

import "./home.css";

function Home() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("");
  const [persons, setPersons] = useState("");
  const [total, setTotal] = useState({
    tipPerPerson: "0.00",
    totalPerPerson: "0.00",
    active: false
  });
  const [currentTip, setCurrentTip] = useState(0);
  const [error, setError] = useState({
    billError: false,
    tipError: false,
    peopleError: false
  })

  // tip calculator logic
  useEffect(() => {
    if (!persons.length <= 0 && (+persons === 0 || isNaN(persons))) {
      // person error
      setError(oldError => ({ ...oldError, peopleError: true }))
    } else if (!bill.length <= 0 && (+bill === 0 || isNaN(bill))) {
      // bill error
      setError(oldError => ({ ...oldError, billError: true }))
    } else if (!tip.length <= 0 && (+tip === 0 || isNaN(tip))) {
      // tip error
      setError(oldError => ({ ...oldError, tipError: true }))
    } else if (+bill > 0 && +tip > 0 && +persons > 0) {
      let totalBill = (+bill * +tip) / 100;
      let tipPerson = totalBill / +persons;
      let totalPerson = +bill / +persons + tipPerson;

      setTotal({
        tipPerPerson: tipPerson.toFixed(2),
        totalPerPerson: totalPerson.toFixed(2),
        active: true
      });
    } else {
      setError({
        billError: false,
        tipError: false,
        peopleError: false
      })
    }
  }, [bill, tip, persons, total]);

  // reseting all input values
  function reset() {
    setBill("");
    setPersons("");
    setTip("");
    setTotal({
      tipPerPerson: "0.00",
      totalPerPerson: "0.00",
      active: false
    });
    setCurrentTip("0");
  }

  function settingTipWithButton(filterValue) {
    setCurrentTip(filterValue);
    setTip(filterValue);
  }

  return (
    <>
      <Header />
      <main className="container">
        <section className="all-inputs">
          <div className="input-group">
            <div className="label-error">
              <label htmlFor="bill">Bill</label>
              {error.billError ? <p className="error">Can't be zero</p> : ""}
            </div>
            <div className="img-div">
              <img src={dollar_icon} alt="dollar icon" />
              <input
                className={error.billError? 'input bill': 'input'}
                type="text"
                id="bill"
                placeholder="0"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </div>
          </div>
          <div className="selected-tip">
            <h3>Select Tip %</h3>
            <div className="button-group">
              <Button
                tipValue="5"
                active={currentTip === 5}
                handleFunction={() => settingTipWithButton(5)}
              />
              <Button
                tipValue="10"
                active={currentTip === 10}
                handleFunction={() => settingTipWithButton(10)}
              />
              <Button
                tipValue="15"
                active={currentTip === 15}
                handleFunction={() => settingTipWithButton(15)}
              />
              <Button
                tipValue="25"
                active={currentTip === 25}
                handleFunction={() => settingTipWithButton(25)}
              />
              <Button
                tipValue="50"
                active={currentTip === 50}
                handleFunction={() => settingTipWithButton(50)}
              />
              <input
                type="text"
                placeholder="Custom"
                className={error.tipError? 'input tip': 'input'}
                onFocus={() => setCurrentTip(0)}
                value={tip}
                onChange={(e) => setTip(e.target.value)}
              />
            </div>
              {error.tipError ? <p className="error">Can't be zero or letter</p> : ""}
          </div>
          <div className="input-group">
            <div className="label-error">
              <label htmlFor="people">Number of people</label>
              {error.peopleError ? <p className="error">Can't be zero</p> : ''}
            </div>
            <div className="img-div">
              <img src={person_icon} alt="person icon" />
              <input
                className={error.peopleError? 'input people': 'input'}
                type="text"
                id="people"
                placeholder="0"
                value={persons}
                onChange={(e) => setPersons(e.target.value)}
              />
            </div>
          </div>
        </section>
        <section className="result">
          <Card total={total} reset={reset} />
        </section>
      </main>
    </>
  );
}

export default Home;
