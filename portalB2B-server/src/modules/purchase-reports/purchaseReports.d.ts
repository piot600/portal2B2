export interface PurchaseReportInput {
  distributor_id: number;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  year: number;
  last_year_sales: number;
  purchases: number;
  budget: number;
  actual_sales: number;
  total_pos: number;
  new_openings: number;
  new_openings_target: number;
}
