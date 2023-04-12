import './App.css';
import Login from './Components/Signup'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <div>
      <BrowserRouter>
      <Login/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
