import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import SalesChannelsService from "../services/SalesChannelsService";
import SalesChannelsTable from "../components/SalesChannelsTable";
import type { SalesChannelDto } from "../types/salesChannels";

export default function SalesReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<SalesChannelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = user?.role;

  // 🟦 Ładowanie danych w zależności od roli
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
          setError("Brak uprawnień do wyświetlenia raportów.");
        }
      } catch {
        setError("❌ Błąd podczas pobierania danych.");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [role]);

  if (loading) return <p>⏳ Wczytywanie danych...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 🟨 Ustal tytuł strony i dostępne akcje
  const title =
    role === "distributor"
      ? "📊 My Sales Reports"
      : role === "manager"
      ? "📈 Distributor Reports"
      : "🗂️ All Distributor Reports";

  const canExport =
    role === "manager" || role === "admin" || role === "superadmin";

  return (
    <div>
      <h1>{title}</h1>

      {canExport && (
        <button onClick={() => SalesChannelsService.exportAllReports()}>
          ⬇️ Export CSV
        </button>
      )}

      <SalesChannelsTable data={reports} />
    </div>
  );
}
