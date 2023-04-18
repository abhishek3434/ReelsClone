import "./App.css";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Feed from "./Components/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signup" Component={Signup} />
            <Route path="/login" Component={Signin} />
            <Route path="/" element={<PrivateRoute/>}>
              <Route path="/" Component={Feed} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
