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
import SalesReportsPage from "./features/sales-channels/pages/SalesReportsPage";
import AddSalesChannelPage from "./features/sales-channels/pages/AddSalesChannelPage";
import PurchaseReportsPage from "./features/purchase-reports/pages/PurchaseReportsPage";
import AddPurchaseReportPage from "./features/purchase-reports/pages/AddPurchaseReportsPage";
import MyDistributorsPage from "./features/user/pages/UsersPages/MyDistributorsPage";
import MyEmployeesPage from "./features/user/pages/UsersPages/MyEmployeesPage";
import AllUsersPage from "./features/user/pages/UsersPages/AllUsersPage";

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

            <Route path="/sales-reports" element={<SalesReportsPage />} />
            <Route
              path="/sales-channels/add"
              element={<AddSalesChannelPage />}
            />
            {/* Manager */}

            {/* 💰 Purchase Reports */}
            <Route path="/purchase-reports" element={<PurchaseReportsPage />} />
            <Route
              path="/purchase-reports/add"
              element={<AddPurchaseReportPage />}
            />

            {/* Manager */}
            <Route path="/my-distributors" element={<MyDistributorsPage />} />

            {/* Distributor */}
            <Route path="/my-employees" element={<MyEmployeesPage />} />

            {/* Admin / Superadmin */}
            <Route path="/all-users" element={<AllUsersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
