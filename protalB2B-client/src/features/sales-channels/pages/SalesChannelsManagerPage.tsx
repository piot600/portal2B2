// src/features/salesChannels/pages/SalesChannelsManagerPage.tsx
import { useEffect, useState } from "react";
import SalesChannelsService from "../services/SalesChannelsService";
import SalesChannelsTable from "../components/SalesChannelsTable";
import type { SalesChannelDto } from "../types/salesChannels";

export default function SalesChannelsManagerPage() {
  const [reports, setReports] = useState<SalesChannelDto[]>([]);

  useEffect(() => {
    SalesChannelsService.getManagerReports().then(setReports);
  }, []);

  return (
    <div>
      <h1>📈 Sales Reports (My Distributors)</h1>
      <button onClick={() => SalesChannelsService.exportAllReports()}>
        ⬇️ Eksport CSV
      </button>
      <SalesChannelsTable data={reports} />
    </div>
  );
}
