import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./component/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Dashboad/Home";
import Issuse from "./pages/Issuse/Issue";
import Admin from "./pages/Admin/Admin";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Project from "./pages/Project/Project";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Issues" element={<Issuse />} />
          <Route exact path="/Project" element={<Project />} />
          <Route exact path="/Admin" element={<Admin />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
