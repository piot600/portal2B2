import { useEffect, useState } from "react";
import PurchaseReportsService from "../services/PurchaseReportsService";
import { api } from "../../../services/apiService";
import type { PurchaseReportDto } from "../types/purchaseReports";
import styles from "./PurchaseReportForm.module.css";

interface DistributorOption {
  id: number;
  email: string;
  role: string;
}

export default function PurchaseReportForm() {
  const [form, setForm] = useState<Partial<PurchaseReportDto>>({
    quarter: "Q1",
    year: new Date().getFullYear(),
  });
  const [distributors, setDistributors] = useState<DistributorOption[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/user/my-distributors")
      .then((res) => setDistributors(res.data.data))
      .catch(() => setDistributors([]));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) || value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await PurchaseReportsService.addReport(form);
      setMessage("✅ Purchase report added successfully!");
      setForm({
        quarter: "Q1",
        year: new Date().getFullYear(),
      });
    } catch {
      setMessage("❌ Failed to add report.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Add Purchase Report</h3>

      <div className={styles.row}>
        <label className={styles.label}>
          Distributor:
          <select
            name="distributor_id"
            value={form.distributor_id || ""}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">-- Select Distributor --</option>
            {distributors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.email}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Quarter:
          <select
            name="quarter"
            value={form.quarter}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
        </label>

        <label className={styles.label}>
          Year:
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.fieldsGrid}>
        {[
          "last_year_sales",
          "purchases",
          "budget",
          "actual_sales",
          "total_pos",
          "new_openings",
          "new_openings_target",
        ].map((field) => (
          <label key={field} className={styles.label}>
            {field.replaceAll("_", " ")}:
            <input
              type="number"
              name={field}
              value={form[field as keyof PurchaseReportDto] || ""}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
        ))}
      </div>

      <button type="submit" className={styles.button}>
        Add Report
      </button>

      {message && (
        <p
          className={`${styles.message} ${
            message.includes("✅") ? styles.success : styles.error
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
