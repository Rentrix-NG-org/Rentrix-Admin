interface Account {
  email: string;
  status: "active" | "suspended";
}

interface MediaType {
  id: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  title: string;
  description: string | null;
  format: string;
  type: string;
}

export interface TransactionType {
  id: string;
  createdAt: string;
  updatedAt: string;
  amount: string;
  type: string;
  description: string;
  paystackReference: string | null;
  status: string;
  recipientName: string | null;
  recipientAccountNumber: string | null;
  recipientBankName: string | null;
}

export interface OtherFeeType {
  fee: number;
  name: string;
}

export interface FeeType {
  id: string;
  createdAt: string;
  updatedAt: string;
  fee: string;
  platformFee: string;
  legalFee: string;
  serviceFee: string;
  cautionFee: string;
  estateFee: string;
  privateViewFee: string;
  otherFees: OtherFeeType[];
  rentalPeriod: "yearly" | "monthly";
  priceCurrency: "NGN";
  status: "COMPLETED" | "PENDING";
}

export interface ListingType {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  label: string;
  currentlyLivedIn: boolean;
  availabilityStatus:
    | "AVAILABLE"
    | "PENDING-AVAILABLE"
    | "RENTED"
    | "SOLD"
    | "under-offer";
  category: "residential" | "commercial";
  type: "retail-space" | "office-space" | "warehouse";
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parkingSpace: number;
  interiorFeatures: string[];
  exteriorFeatures: string[];
  kitchenFittings: string[];
  interiorFlooring: string;
  exteriorFlooring: string;
  furnishedType: "furnished" | "unfurnished";
  servicing: "serviced" | "not-serviced";
  propertyAge: string;
  lotSize: number;
  floorArea: number;
  fee: FeeType;
  builtYear: number;
  builtMonth: string;
  floorLevel: number;
  isDraft: boolean;
  media: MediaType[];
  transactions: TransactionType[];
}

type ActivityType =
  | "login-event"
  | "update"
  | "download"
  | "payment-made"
  | "document-viewed";

interface LogType {
  createdAt: string;
  description: string;
  date: string;
  time: string;
  details: string;
  activityType: ActivityType;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  identity: { identityUrl: string; status: string };
  phoneNumber: string;
  dateOfBirth: string;
  account: Account;
  photoUrl: string;
  roles: string[];
  listings: ListingType[];
  transactions: TransactionType[];
  logs: LogType[];
  roleRegistrationDates: object;
}
