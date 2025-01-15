interface TableDataType {
  columnLabel: string;
  value: string[];
  type: "text" | "button" | "select";
  option?: string[];
  actionTitle?: string;
  onAction?: () => void;
}

export const supervisorTableData: TableDataType[] = [
  {
    columnLabel: "userId",
    value: ["000AB0", "000CD0", "000EF0"],
    type: "text",
  },
  {
    columnLabel: "name",
    value: ["Jane Smith", "John Doe", "Bob Wilson"],
    type: "text",
  },
  {
    columnLabel: "role",
    value: ["Supervisor", "Rentrix Rep", "Supervisor"],
    option: ["Supervisor", "Rentrix Rep"],
    type: "select",
  },

  {
    columnLabel: "lastActive",
    value: [
      "Nov 25, 2024, 3:30pm",
      "Nov 25, 2024, 2:15pm",
      "Nov 24, 2024, 11:45am",
    ],
    type: "text",
  },
  {
    columnLabel: "registrationDate",
    value: ["08 Nov 2024", "10 Nov 2024", "12 Nov 2024"],
    type: "text",
  },
  {
    columnLabel: "actions",
    value: ["Action", "Action", "Action"],
    type: "select",
  },
];

export const landlordData: TableDataType[] = [
  {
    columnLabel: "userId",
    value: ["111AB1", "111CD1", "111EF1"],
    type: "text",
  },
  {
    columnLabel: "name",
    value: ["Mary Johnson", "Steve Williams", "Sarah Brown"],
    type: "text",
  },
  {
    columnLabel: "role",
    value: ["Landlord", "Landlord", "Landlord"],
    option: ["Landlord", "Tenant"],
    type: "select",
  },
  {
    columnLabel: "status",
    value: ["Active", "Suspended", "Active"],
    option: ["Active", "Suspended"],
    type: "select",
  },

  {
    columnLabel: "registrationDate",
    value: ["15 Nov 2024", "16 Nov 2024", "17 Nov 2024"],
    type: "text",
  },
  {
    columnLabel: "actions",
    value: ["Action", "Action", "Action"],
    type: "select",
  },
];
