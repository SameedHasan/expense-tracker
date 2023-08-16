import { FrappeProvider } from "frappe-react-sdk";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { ExpensesPage } from "./pages/ExpensesPage.tsx";

function App() {
  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ""}>
      <Router basename={import.meta.env.VITE_BASE_PATH}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
        </Routes>
      </Router>
    </FrappeProvider>
  );
}

export default App;
