import { FrappeProvider } from "frappe-react-sdk";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { ExpensesPage } from "./pages/ExpensesPage.tsx";
import Navbar from "./components/Navbar.tsx";
import ExpensePage from "./pages/ExpensePage.tsx";
import { ProtectedRoute } from "./utils/ProtectedRoute.tsx";
import { UserProvider } from "./utils/UserProvider.tsx";
import { AccountsPage } from "./pages/AccountsPage.tsx";

function App() {
  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ""}>
      <UserProvider>
        <Router basename={import.meta.env.VITE_BASE_PATH}>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="expenses/:id" element={<ExpensePage />} />
            </Route>
            {/* <PrivateRoute
            path="/expenses"
            token={null}
            component={ExpensesPage}
          /> */}
            {/* <Route path="/expenses" element={<ExpensesPage />} /> */}
            {/* <Route path="/expenses/:id" element={<ExpensePage />} /> */}
          </Routes>
        </Router>
      </UserProvider>
    </FrappeProvider>
  );
}

export default App;
