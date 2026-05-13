import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DayPage from "./pages/DayPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day/:dayName" element={<DayPage />} />
    </Routes>
  );
}

export default App;