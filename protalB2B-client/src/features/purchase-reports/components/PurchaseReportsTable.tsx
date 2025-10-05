import type { PurchaseReportDto } from "../types/purchaseReports";
import styles from "./PurchaseReportsTable.module.css";

interface Props {
  data: PurchaseReportDto[];
  showEmails?: boolean;
}

export default function PurchaseReportsTable({ data, showEmails }: Props) {
  if (!data.length)
    return <p className={styles.emptyMessage}>No reports found.</p>;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {showEmails && <th>Distributor Email</th>}
            <th>Year</th>
            <th>Quarter</th>
            <th>Last Year Sales</th>
            <th>Purchases</th>
            <th>Budget</th>
            <th>Actual Sales</th>
            <th>Δ vs Last Year</th>
            <th>Δ vs Budget</th>
            <th>Total POS</th>
            <th>New Openings</th>
            <th>Target</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r) => (
            <tr key={r.id}>
              {showEmails && <td>{r.distributor_email}</td>}
              <td>{r.year}</td>
              <td>{r.quarter}</td>
              <td>{r.last_year_sales}</td>
              <td>{r.purchases}</td>
              <td>{r.budget}</td>
              <td>{r.actual_sales}</td>
              <td
                className={
                  Number(r.total_vs_last_year) < 0
                    ? styles.negative
                    : styles.positive
                }
              >
                {r.total_vs_last_year}%
              </td>
              <td
                className={
                  Number(r.total_vs_budget) < 0
                    ? styles.negative
                    : styles.positive
                }
              >
                {r.total_vs_budget}%
              </td>
              <td>{r.total_pos}</td>
              <td>{r.new_openings}</td>
              <td>{r.new_openings_target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
