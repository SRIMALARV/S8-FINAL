export interface Appointment {
  paymentAmount: number;
  id?: string;
  state: string;
  city: string;
  outlet: string;
  gender: string;

services: {
  stylists: [];  
  name: string;
  cost: number;
}[];
  stylists: [];
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  totalCost: number;
  paymentStatus?: string;
  dateTime?: Date
}
