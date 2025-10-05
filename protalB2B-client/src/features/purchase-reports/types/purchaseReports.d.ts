export interface PurchaseReportDto {
  id?: number;
  manager_id?: number;
  distributor_id: number;
  distributor_email?: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  year: number;
  last_year_sales: number;
  purchases: number;
  budget: number;
  actual_sales: number;
  total_vs_last_year?: number;
  total_vs_budget?: number;
  total_pos: number;
  new_openings: number;
  new_openings_target: number;
}
