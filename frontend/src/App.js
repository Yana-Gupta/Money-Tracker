import "./App.css";
import Home from "./components/Home/Index";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

import Signin from "./components/SignIn/Index";
import Register from "./components/Register/Index";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
