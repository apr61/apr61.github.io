import "./button.css";

function Button({ tipValue, active, handleFunction }) {
  return (
    <button onClick={handleFunction} className={active ? "active" : ""}>
      {tipValue}%
    </button>
  );
}

export default Button;
