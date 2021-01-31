import './App.css';
import Breakout from './Breakout';

function App() {
  return (
    <div className="app">
      <Breakout title={'Breakout'} width={800} height={640} background={'#000000'} />
    </div>
  );
}

export default App;
