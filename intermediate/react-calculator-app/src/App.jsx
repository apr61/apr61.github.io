import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Number from './components/number/Number';
import Screen from './components/screen/Screen';

const numOp = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '.', '=', 'reset', 'del'];
const ButtonTypes = ['=', 'reset', 'del']
const operators = ['+', '-', 'x', '/'];

function App() {

  const [input, setInput] = useState('')

  function isOperator(val) {
    return operators.indexOf(val) !== -1;
  }

  function checkNaN() {
    return isNaN(+input.charAt(input.length - 1));
  }

  function periodExsits() {
    let currOperand = '';
    for (let i = input.length; i >= 0; i--) {
      if (!isOperator(input.charAt(i))) {
        currOperand += input.charAt(i);
      } else {
        break;
      }
    }
    return currOperand.includes('.');
  }

  function handleNumber(val) {
    // checking for not having button types
    if (ButtonTypes.indexOf(val) === -1)
      // checking for last operator and changing the operator
      if (checkNaN() && isOperator(val))
        setInput(oldValue => oldValue.substring(0, oldValue.length - 1) + val)
      //checking for period '.' existence
      else if (val === '.' && periodExsits())
        return
      else
        setInput(oldValue => oldValue + val)
  }


  function handleReset() {
    setInput('');
  }

  function handleDel() {
    setInput(oldValue => oldValue.slice(0, oldValue.length - 1))
  }

  function handleSubmit(e) {
    e.preventDefault();
    let numbers = [];
    let inpArr = input.split('');
    let currNum = '';
    inpArr.forEach(inp => {
      if(!isNaN(+inp) || inp === '.'){
        currNum+=inp;
      }else{
        numbers.push(+currNum)
        numbers.push(inp);
        currNum = '';
      }
    })
    if(currNum!== ''){
      numbers.push(+currNum)
      currNum = ''
    }
    setInput(eval(numbers.join(''))+'');
  }

  return (
    <>
      <Header />
      <main className="container">
        <form onSubmit={handleSubmit}>
          <Screen input={input} />
          <section className="keypad">
            {numOp.map(num => <Number key={num} num={num}
              handleNumber={handleNumber}
              handleReset={handleReset}
              handleRemove={handleDel} />)}
          </section>
        </form>
      </main>
    </>
  );
}

export default App;
