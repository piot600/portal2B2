import { useEffect, useState } from "react";
import type { UserDto } from "../../../auth/types/userTypes";
import UsersService from "../../services/UsersService";
import UsersTable from "../../components/UsersTable/UsersTable";
import styles from "./UsersData.module.css";

export default function MyEmployeesPage() {
  const [data, setData] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UsersService.getMyEmployees()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Employees</h1>
        <p className={styles.subtitle}>Manage your team members</p>
      </div>

      {loading ? (
        <div className={styles.loader}>Loading employees...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <UsersTable data={data} />
        </div>
      )}
    </div>
  );
}
