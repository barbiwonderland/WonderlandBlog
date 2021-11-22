import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route exact path="/" element={<PrivateRoute />}> */}
              <Route exact path="/" element={<Dashboard/>} />
            {/* </Route> */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
