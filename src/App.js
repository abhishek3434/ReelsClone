import './App.css';
import Signup from './Components/Signup'
import Signin from './Components/Signin';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <div>
      <BrowserRouter>
      {/* <Signup/> */}
      <Signin/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
