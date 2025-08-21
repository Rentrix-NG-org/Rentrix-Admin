import { SxProps } from "@mui/material";

export interface Filters {
  name: string;
  options: string[];
}

export type ColumnType = "select" | "action" | "text" | "custom-text";
export interface BaseColumn {
  header: string;
  label: string;
  type: ColumnType;
  options?: string[];
  component?: { component: React.ReactNode; onClick: (v: string) => void }[];
}

interface CustomText extends BaseColumn {
  type: "custom-text";
  sx?: SxProps;
  colors?: Record<string, string>;
}

interface SelectColumn extends BaseColumn {
  type: "select";
  options: string[];
  sx?: SxProps;
}

interface ActionColumn extends BaseColumn {
  type: "action";
}
interface TextColumn extends BaseColumn {
  type: "text";
}

export type Column = SelectColumn | ActionColumn | TextColumn | CustomText;

export enum ActivityType {
  LOGIN = "login-event",
  USER_ROLE = "user-role",
  ACCOUNT_CREATE = "account-created",
  UPDATE = "update",
  PROFILE_UPDATE = "profile-update",
  PASSWORD_CHANGES = "password-changes",
  ACCOUNT_DELETION = "account-deletion",
  FAILED_LOGIN_ATTEMPTS = "failed-login-attempts",
  PROPERTY_CREATION = "property-creation",
  PROPERTY_UPDATE = "property-update",
  PROPERTY_DEACTIVATION = "property-deactivation",
  PROPERTY_VIEWING_REQUEST = "property-viewing-request",
  PAYMENT_INITIATION = "payment-initiation",
  PAYMENT_COMPLETION = "payment-completion",
  REFUND_REQUEST = "refund-request",
  WALLET_TRANSACTION = "wallet-transaction",
  CHAT_MESSAGE = "chat-message",
  SUPPORT_TICKET = "support-ticket",
  REVIEW_RATING = "review-rating",
  ACCESS_CONTROL = "access-control",
  DATA_EXPORT = "data-export",
  SYSTEM_ALERT = "system-alert",
  ALGORITHM_UPDATE = "algorithm-update",
  ESCROW_FUND = "escrow-fund",
  DISPUTE = "dispute",
  SCHEDULED_MAINTENANCE = "scheduled-maintenance",
  DOWNLOAD = "download",
  PAYMENT_MADE = "payment-made",
  DOCUMENT_VIEWED = "document-viewed",
  POLICY_UPDATE = "policy-update",
  UNKNOWN = "unknown",
}

export interface LogType {
  createdAt: string;
  description: string;
  date: string;
  time: string;
  details: string;
  activityType: ActivityType;
}
