
import { useEffect } from 'react';
import './App.css';
import useTelegram from './hooks/useTelegram';
import Header from './components/Header/Header';


function App() {
  const { tg, onClose } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      hello world
      <Header />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
