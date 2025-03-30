export type review = {
  id: number;
  type: string;
  product: {
    name: string;
    category: string;
    imgSrc: string;
  };
  rating: number;
  reviewMessage: string;
  submittedOn: string;
  customer: string;
};

export type Admin = {
  id?: string;
  email: string;
  full_name: string;
  country_code: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  is_manager: boolean;
  is_active: boolean;
  is_deleted: boolean;
};

export type Product = {
  id: number;
  status: string;
  name: string;
  category: string;
  imgSrc: string;
  price: string;
  date: string;
  quantity: string;
};

export type Invoice = {
  order_id: string;
  customer_email: string;
  amount: string;
  status: string;
  created_at: string;
  items?: [
    {
      id: 0;
      product_name: string;
      quantity: number;
      price: string;
    },
  ];
};

export type Category = {
  category_id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

type DailySale = {
  date: string;
  total_sales: number;
};

type SaleByCategory = {
  category_name: string;
  total_sales: number;
};

type TopProduct = {
  product_name: string;
  total_sales: number;
};

export type Dashboard = {
  total_orders: number;
  total_revenue: number;
  sales_by_category: SaleByCategory[];
  top_products: TopProduct[];
  daily_sales: DailySale[];
  total_products: number;
  total_shops: number;
  visitor_count: number;
};
