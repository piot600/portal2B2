import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUserPage from "./features/user/pages/AddUserPage";
import Login from "./features/auth/pages/Login";
import Navbar from "./components/common/Navbar/Navbar";
import HomePage from "./features/home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<AddUserPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
