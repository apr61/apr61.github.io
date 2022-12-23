import {useState} from 'react';
import './App.css';
import Header from './components/header/Header';
import Number from './components/number/Number';
import Screen from './components/screen/Screen';

const numOp = [0,1,2,3,4,5,6,7,8,9,'+','-','x','/','.','=','reset','del'];

function App() {

  const [input, setInput] = useState('')
  const match = {
    '+' : (x,y) => {return x+y},
    '-' : (x,y) => {return x-y},
    'x' : (x,y) => {return x*y},
    '/' : (x,y) => {return x/y}
  }

  function handleNumber(val){
    if(val !== "del" && val !== 'reset' && val !== '=')
      if(isNaN(+input.charAt(input.length-1)) && isNaN(+val) && val !== '.')
        setInput(oldValue => oldValue.substring(0, oldValue.length-1)+val)
      else if(val === '.' && isNaN(+input.charAt(input.length-1)))
        setInput(oldValue => oldValue+'0'+val);
      else
        setInput(oldValue => oldValue+val)
  }

  function handleReset(){
    setInput('');
  }

  function handleDel(){
    setInput(oldValue => oldValue.slice(0, oldValue.length-1))
  }

  function handleSubmit(e){
    e.preventDefault();
    let numbers = [];
    let operators = [];
    let inpArr = input.split('');
    let currNum = '';
    inpArr.forEach(inp => {
      if(!isNaN(+inp) || inp === '.'){
        currNum+=inp;
      }else{
        operators.push(inp);
        numbers.push(currNum)
        currNum = '';
      }
    })
    if(currNum!== ''){
      numbers.push(currNum)
      currNum = ''
    }
    let res = getComputedResult(numbers, operators);
    setInput(oldValue => oldValue.substring(0,-1)+res);
  }

  function getComputedResult(numbers, operators){
    let res = +numbers[0];
    for(let i = 1;i<numbers.length;i++){
      let op = operators.shift();
      console.log(op)
      res = match[op](res, +numbers[i]);
    }
    return res+'';
  }

  return (
    <>
      <Header />
      <main className="container">
        <form onSubmit={handleSubmit}>
          <Screen input={input} handleSetInput = {setInput}/>
          <section className="keypad">
            {numOp.map(num => <Number key={num} num={num} 
            handleNumber={handleNumber} 
            handleReset = {handleReset} 
            handleRemove = {handleDel}/>)}
          </section>
        </form>
      </main>
    </>
  );
}

export default App;
