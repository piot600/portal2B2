export interface SalesChannelInput {
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  year: number;
  currency_rate: number;
  professional_sales: number;
  pharmacy_sales: number;
  ecommerce_b2c_sales: number;
  ecommerce_b2b_sales: number;
  third_party: number;
  other: number;
  new_clients: number;
}
