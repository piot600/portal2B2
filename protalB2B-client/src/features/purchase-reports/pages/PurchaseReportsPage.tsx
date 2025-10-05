import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import PurchaseReportsService from "../services/PurchaseReportsService";
import PurchaseReportsTable from "../components/PurchaseReportsTable";
import type { PurchaseReportDto } from "../types/purchaseReports";
import styles from "./PurchaseReportsPage.module.css";

export default function PurchaseReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<PurchaseReportDto[]>([]);

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "distributor":
        PurchaseReportsService.getMyReports().then(setReports);
        break;
      case "manager":
        PurchaseReportsService.getManagerReports().then(setReports);
        break;
      case "admin":
      case "superadmin":
        PurchaseReportsService.getAllReports().then(setReports);
        break;
    }
  }, [user]);

  if (!user) return <p>No user!</p>;

  const canExport = ["manager", "admin", "superadmin"].includes(user.role);

  const handleExport = () => {
    PurchaseReportsService.exportAllReports();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Purchase Reports</h1>

        {canExport && (
          <button className={styles.exportButton} onClick={handleExport}>
            ⬇️ Export CSV
          </button>
        )}
      </div>

      <PurchaseReportsTable data={reports} showEmails={canExport} />
    </div>
  );
}
