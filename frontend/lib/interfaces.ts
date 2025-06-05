export interface User {
  id: number;
  name?: string;
  email: string;
  password?: string;
  role: "CUSTOMER" | "ADMIN";
  Transaksi: Transaksi[];
  createdAt: Date;
  updatedAt: Date;
  cartId?: number;
  Cart?: Cart;
}

export interface ServiceType {
  id: number;
  name: string;
  services: Services[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Services {
  id: number;
  cartId: number | null;
  servicesTypeId: number;
  name: string;
  description: string;
  attachment: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  ServicesType: ServiceType;
}

export interface Cart {
  id: number;
  userId: number;
  totalAmount: number;
  user: User;
  service: Services[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone?: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
  Transaksi: Transaksi[];
}

export interface DetailTransaksi {
  id: number;
  servicesId: number;
  serviceName: string;
  servicePrice: number;
  transaksiId: number;
  createdAt: Date;
  updatedAt: Date;
  Transaksi: Transaksi; // Circular reference, pastikan di-handle sesuai kebutuhan
}

export interface Transaksi {
  id: number;
  userId: number;
  employeeId: number;
  employee: Employee;
  transactionStatus: Status;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  transactionDate: Date;
  invoiceNumber: string;
  notes?: string;
  user: User;
  DetailTransaksi: DetailTransaksi[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  CREDIT_CARD = "CREDIT_CARD",
  CASH = "CASH",
}
