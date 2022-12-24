import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import History from './components/history/History';
import Number from './components/number/Number';
import Screen from './components/screen/Screen';
import ThemeProvider from './context/ThemeContext';

const numOp = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', 'x', '/', '.', '=', 'reset', 'del'];
const ButtonTypes = ['=', 'reset', 'del']
const operators = ['+', '-', 'x', '/'];

function App() {
  const prevData = JSON.parse(localStorage.getItem('history'))
  const [input, setInput] = useState('')
  const [openHistory, setOpenHistory] = useState(false)
  const [historyData, setHistoryData] = useState(prevData || [])

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
    if (input !== ' ' && !isOperator(input.charAt(0))) {
      let numbers = [];
      let inpArr = input.split('');
      let currNum = '';
      inpArr.forEach(inp => {
        if (!isNaN(+inp) || inp === '.') {
          currNum += inp;
        } else {
          numbers.push(+currNum)
          numbers.push(inp);
          currNum = '';
        }
      })
      if (currNum !== '') {
        numbers.push(+currNum)
        currNum = ''
      }
      let res = eval(numbers.join('').replace('x', '*'));
      setInput(res + '')
      let hisData = { id: Date.now(), cal: numbers.join('').toString(), res: res}
      setHistoryData(oldValue => [...oldValue, hisData])
    } else {
      setInput('');
    }
  }

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(historyData));
  }, [historyData])

  return (
    <ThemeProvider>
      <Header />
      <main className="container">
        <form onSubmit={handleSubmit}>
          <Screen input={input} hisOpen={openHistory} handleHistory={setOpenHistory} />
          <section className="keypad">
            {numOp.map(num => <Number key={num} num={num}
              handleNumber={handleNumber}
              handleReset={handleReset}
              handleRemove={handleDel} />)}
          </section>
        </form>
      </main>
      <History hisOpen={openHistory} handleHistory={setOpenHistory} historyData={historyData} setInputHis={setInput}/>
    </ThemeProvider>
  );
}

export default App;
