import './App.css';
import Header from './components/header/Header';
import Number from './components/number/Number';
import Screen from './components/screen/Screen';


function App() {
  
  return (
    <>
      <Header />
      <main className="container">
        <form>
          <Screen />
          <section className="keypad">
            <Number num={1} />
            <Number num={2} />
            <Number num={3} />
            <Number num={4} />
            <Number num={5} />
            <Number num={6} />
            <Number num={7} />
            <Number num={8} />
            <Number num={9} />
            <Number num={0} />
            <Number num={'del'} />
            <Number num={'+'} />
            <Number num={'-'} />
            <Number num={'x'} />
            <Number num={'/'} />
            <Number num={'.'} />
            <Number num={'='} role={'submit'} />
            <Number num={'reset'} role={'reset'} />
          </section>
        </form>
      </main>
    </>
  );
}

export default App;
