export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Booking {
    id: number;
    status: string;
    createdAt: string;
  }
  
  export interface Client {
    id: number;
    dateOfBirth?: string;
    medicalHistory?: string;
    user: User;
    bookings: Booking[];
  }
  