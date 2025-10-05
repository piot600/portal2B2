import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Navbar from "./components/common/Navbar/Navbar";
import HomePage from "./features/home/HomePage";
import ChangePassword from "./features/user/pages/ChangePassword";
import { ChangePasswordProtection } from "./routes/ChangePasswordProtection";
import { SuperadminRoutes } from "./routes/SuperadminRoutes";
import AddUserPage from "./features/user/pages/AddUserPage";
import { UnauthenticatedRoute } from "./routes/UnauthenticatedRoute";
import { AuthenticatedRoute } from "./routes/AuthenticatedRoute";
import SalesChannelsPage from "./features/sales-channels/pages/SalesChannelsPage";
import SalesChannelsManagerPage from "./features/sales-channels/pages/SalesChannelsManagerPage";
import SalesReportsPage from "./features/sales-channels/pages/SalesReportsPage";
import AddSalesChannelPage from "./features/sales-channels/pages/AddSalesChannelPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Guest-only */}
        <Route element={<UnauthenticatedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Auth-only */}
        <Route element={<AuthenticatedRoute />}>
          <Route path="/user/change-password" element={<ChangePassword />} />

          {/* Froce passwd change */}
          <Route element={<ChangePasswordProtection />}>
            <Route path="/" element={<HomePage />} />

            {/* Role-based */}
            <Route element={<SuperadminRoutes />}>
              <Route path="/superadmin/add-user" element={<AddUserPage />} />
            </Route>
            {/* Dystrybutor */}
            <Route path="/reports" element={<SalesChannelsPage />} />
            <Route path="/sales-reports" element={<SalesReportsPage />} />
            <Route
              path="/sales-channels/add"
              element={<AddSalesChannelPage />}
            />
            {/* Manager */}
            <Route
              path="/manager/reports"
              element={<SalesChannelsManagerPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
