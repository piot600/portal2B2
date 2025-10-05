// src/features/salesChannels/pages/SalesChannelsPage.tsx
import { useEffect, useState } from "react";
import SalesChannelsForm from "../components/SalesChannelsForm";
import SalesChannelsTable from "../components/SalesChannelsTable";
import SalesChannelsService from "../services/SalesChannelsService";
import type { SalesChannelDto } from "../types/salesChannels";

export default function SalesChannelsPage() {
  const [reports, setReports] = useState<SalesChannelDto[]>([]);

  useEffect(() => {
    SalesChannelsService.getMyReports().then(setReports);
  }, []);

  return (
    <div>
      <h1>📊 Sales Channels</h1>
      <SalesChannelsForm />
      <hr />
      <SalesChannelsTable data={reports} />
    </div>
  );
}
