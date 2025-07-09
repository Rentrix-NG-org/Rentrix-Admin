import { User } from "@src/modules/user/types/user.types";
import { ActivityType } from "@src/shared/types/shared.types";

export interface Account {
  id: string;
  user: User;
  createdAt: string;
}

export interface Transaction {
  id: string;
}

export interface Location {
  id: string;
  state: string;
  streetName: string;
  propertyNumber: string;
}
export interface Fee {
  fee: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  owner: User;
  location: Location;
  fee: Fee;
}

export interface Log {
  id: string;
  description: string;
  user: User;
  account: Account;
  amount: number;
  targetDate: number;
  listing: Listing;
  transaction: Transaction;
  affectedUser: User;
  createdAt: string;
  valueBefore: string;
  valueAfter: string;
  action: string;
  devices: string[];
  referral: string;
  status: string;
  route?: string;
  location: string;
  username?: string
  reason?: string;
}

export interface Admin {
  id: string;
  user: User;
  accessModules: string[];
  createdAt: string;
}

export type paginationType = {
  page: number;
  totalPage: number
}

export const types: Record<ActivityType, string> = {
  [ActivityType.LOGIN]: "Login Event",
  [ActivityType.USER_ROLE]: "User Role",
  [ActivityType.ACCOUNT_CREATE]: "Account Created",
  [ActivityType.UPDATE]: "Update",
  [ActivityType.PROFILE_UPDATE]: "Profile Update",
  [ActivityType.PASSWORD_CHANGES]: "Password Changes",
  [ActivityType.ACCOUNT_DELETION]: "Account Deletion",
  [ActivityType.FAILED_LOGIN_ATTEMPTS]: "Failed Login Attempts",
  [ActivityType.PROPERTY_CREATION]: "Property Creation",
  [ActivityType.PROPERTY_UPDATE]: "Property Update",
  [ActivityType.PROPERTY_DEACTIVATION]: "Property Deactivation",
  [ActivityType.PROPERTY_VIEWING_REQUEST]: "Property Viewing Request",
  [ActivityType.PAYMENT_INITIATION]: "Payment Initiation",
  [ActivityType.PAYMENT_COMPLETION]: "Payment Completion",
  [ActivityType.REFUND_REQUEST]: "Refund Request",
  [ActivityType.WALLET_TRANSACTION]: "Wallet Transaction",
  [ActivityType.CHAT_MESSAGE]: "Chat Message",
  [ActivityType.SUPPORT_TICKET]: "Support Ticket",
  [ActivityType.REVIEW_RATING]: "Review Rating",
  [ActivityType.ACCESS_CONTROL]: "Access Control",
  [ActivityType.DATA_EXPORT]: "Data Export",
  [ActivityType.SYSTEM_ALERT]: "System Alert",
  [ActivityType.ALGORITHM_UPDATE]: "Algorithm Update",
  [ActivityType.ESCROW_FUND]: "Escrow Fund",
  [ActivityType.DISPUTE]: "Dispute",
  [ActivityType.SCHEDULED_MAINTENANCE]: "Scheduled Maintenance",
  [ActivityType.DOWNLOAD]: "Download",
  [ActivityType.PAYMENT_MADE]: "Payment Made",
  [ActivityType.DOCUMENT_VIEWED]: "Document Viewed",
  [ActivityType.POLICY_UPDATE]: "Policy Update",
  [ActivityType.UNKNOWN]: "Unknown",
};
