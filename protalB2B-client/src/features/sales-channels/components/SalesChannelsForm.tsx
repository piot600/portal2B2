// src/features/salesChannels/components/SalesChannelsForm.tsx
import { useState } from "react";
import SalesChannelsService from "../services/SalesChannelsService";
import type { SalesChannelDto } from "../types/salesChannels";

export default function SalesChannelsForm() {
  const [form, setForm] = useState<Partial<SalesChannelDto>>({
    quarter: "Q1",
    year: new Date().getFullYear(),
  });
  const [message, setMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) || value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await SalesChannelsService.addReport(form);
      setMessage("✅ Raport został dodany pomyślnie!");
    } catch {
      setMessage("❌ Błąd podczas zapisu raportu.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Dodaj kwartalny raport sprzedaży</h3>

      <label>
        Kwartał:
        <select name="quarter" value={form.quarter} onChange={handleChange}>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
      </label>

      <label>
        Rok:
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
        />
      </label>

      {[
        "professional_sales",
        "pharmacy_sales",
        "ecommerce_b2c_sales",
        "ecommerce_b2b_sales",
        "third_party",
        "other",
        "new_clients",
      ].map((field) => (
        <label key={field}>
          {field.replaceAll("_", " ")}:
          <input
            type="number"
            name={field}
            value={form[field as keyof SalesChannelDto] || ""}
            onChange={handleChange}
          />
        </label>
      ))}

      <button type="submit">💾 Zapisz raport</button>
      {message && <p>{message}</p>}
    </form>
  );
}
