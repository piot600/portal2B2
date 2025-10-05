import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import SalesChannelsService from "../services/SalesChannelsService";
import SalesChannelsTable from "../components/SalesChannelsTable";
import type { SalesChannelDto } from "../types/salesChannels";
import styles from "./SalesReportsPage.module.css";

export default function SalesReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<SalesChannelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = user?.role;

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);

        if (role === "distributor") {
          const data = await SalesChannelsService.getMyReports();
          setReports(data);
        } else if (role === "manager") {
          const data = await SalesChannelsService.getManagerReports();
          setReports(data);
        } else if (role === "admin" || role === "superadmin") {
          const data = await SalesChannelsService.getAllReports();
          setReports(data);
        } else {
          setError("No reports!");
        }
      } catch {
        setError("❌ Error during fetching reports");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [role]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const title =
    role === "distributor"
      ? "My Sales Reports"
      : role === "manager"
      ? "Distributor Reports"
      : "All Distributor Reports";

  const canExport =
    role === "manager" || role === "admin" || role === "superadmin";

  const handleExport = () => {
    SalesChannelsService.exportAllReports();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>

        {canExport && (
          <button className={styles.exportButton} onClick={handleExport}>
            ⬇️ Export CSV
          </button>
        )}
      </div>

      <SalesChannelsTable data={reports} />
    </div>
  );
}
