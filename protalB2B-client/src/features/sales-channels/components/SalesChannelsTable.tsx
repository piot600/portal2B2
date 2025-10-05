import { useAuth } from "../../auth/context/useAuth";
import type { SalesChannelDto } from "../types/salesChannels";

interface Props {
  data: SalesChannelDto[];
}

export default function SalesChannelsTable({ data }: Props) {
  const { user } = useAuth();
  const role = user?.role;

  if (!data.length) return <p>Brak raportów do wyświetlenia.</p>;

  const showDistributorInfo =
    role === "manager" || role === "admin" || role === "superadmin";

  return (
    <table border={1} cellPadding={6} style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {showDistributorInfo && (
            <>
              <th>Distributor ID</th>
              <th>Distributor Email / Name</th>
            </>
          )}
          <th>Year</th>
          <th>Quarter</th>
          <th>Professional</th>
          <th>Pharmacy</th>
          <th>B2C</th>
          <th>B2B</th>
          <th>Third Party</th>
          <th>Other</th>
          <th>Total</th>
          <th>New Clients</th>
        </tr>
      </thead>

      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            {showDistributorInfo && (
              <>
                <td>{r.distributor_id}</td>
                <td>{r.distributor_name}</td>
              </>
            )}
            <td>{r.year}</td>
            <td>{r.quarter}</td>
            <td>{r.professional_sales}</td>
            <td>{r.pharmacy_sales}</td>
            <td>{r.ecommerce_b2c_sales}</td>
            <td>{r.ecommerce_b2b_sales}</td>
            <td>{r.third_party}</td>
            <td>{r.other}</td>
            <td>{r.total_sales}</td>
            <td>{r.new_clients}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
