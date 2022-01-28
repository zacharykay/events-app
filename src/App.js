import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/new" element={<AddEvent />} />
        <Route path="/edit/:id" element={<EditEvent />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
