export interface SalesChannelDto {
  id?: number;
  distributor_id?: number;
  distributor_name?: string;
  quarter: string;
  year: number;
  currency?: string;
  currency_rate?: number;
  professional_sales: number;
  pharmacy_sales: number;
  ecommerce_b2c_sales: number;
  ecommerce_b2b_sales: number;
  third_party: number;
  other: number;
  total_sales?: number;
  new_clients: number;
  total_sales_eur?: number;
}
