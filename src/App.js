
import './App.css';
import { WalletContextProvider } from './context/WalletContext';
import Escrow from './components/Escrow';

function App() {
  return (
    <WalletContextProvider>
      <Escrow />
    </WalletContextProvider>
  );
}

export default App;
