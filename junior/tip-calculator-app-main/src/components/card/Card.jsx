import "./card.css";

function Card({ total, reset }) {
  return (
    <div className="card">
      <div className="amount">
        <div className="tip">
          <h4>Tip Amount</h4>
          <p>/ person</p>
        </div>
        <div className="result">${total.tipPerPerson}</div>
      </div>
      <div className="amount">
        <div className="total">
          <h4>Total</h4>
          <p>/ person</p>
        </div>
        <div className="result">${total.totalPerPerson}</div>
      </div>
      <button className="reset" disabled={!total.active} onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Card;
