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
