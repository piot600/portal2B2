import { useAuth } from "../auth/context/useAuth";

function Dashboard() {
  const { user } = useAuth();

  return <h1>{user?.email}</h1>;
}

export default Dashboard;
