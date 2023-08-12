import { useState } from "react";
import Layout from "./components/layout/Layout";
import ReportsTable from "./components/reports/ReportsTable";
import Login from "./components/login/Login";
import { useAuth } from "./context/AuthContext";
import User from "./components/user/User";
import Dashboard from "./components/dashboard/Dashboard";
import UsersTable from "./components/users/UsersTable";

// in real application I'll use react router for manage the pages in the app

const DASHBOARD = "dashboard";
const TABLE_VIEW = "table-view";
const USER_MODULE = "user-module";
const USERS_TABLE = "users-table";

function App() {
  const { auth } = useAuth();
  const [selectedKey, setSelectedKey] = useState(["dashboard"]);
  const [itemMenu] = selectedKey;
  
  return (
    <>
      {auth.isAuthenticated ? (
        <Layout
          auth={auth}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        >
          {itemMenu === DASHBOARD && <Dashboard />}
          {itemMenu === TABLE_VIEW && <ReportsTable />}
          {itemMenu === USER_MODULE && <User />}
          {itemMenu === USERS_TABLE && <UsersTable />}
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
