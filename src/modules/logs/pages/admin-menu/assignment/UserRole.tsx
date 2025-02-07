import { Box, useTheme } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import Action from "@src/modules/user/components/Action";
import UserNav from "@src/modules/user/components/UserNav";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";

const UserRole = () => {
  const theme = useTheme();
  const column: Column[] = [
    {
      header: "ADMIN ID",
      label: "adminId",
      type: "text",
    },
    {
      header: "USER ID AFFECTED",
      label: "userIdAffected",
      type: "text",
    },
    {
      header: "ROLE ASSIGNED/CHANGED",
      label: "roleAssigned",
      type: "text",
    },
    {
      header: "TIMESTAMP",
      label: "timestamp",
      type: "text",
    },
    {
      header: "DEVICE & IP ADDRESS",
      label: "device",
      type: "text",
    },
    {
      header: "STATUS",
      label: "status",
      type: "custom-text",
      colors: {
        successful: theme.palette.success.main,
        pending: theme.palette.warning.main,
        failed: theme.palette.error.main,
      },
      sx: {
        fontWeight: 600,
        fontSize: 12,
        padding: "6px 16px",
        borderRadius: "10px",
        letterSpacing: "0.5px",
      },
    },
    {
      header: "ACTIONS",
      label: "actions",
      type: "action",
      component: [
        {
          component: <Box component="img" src={icons.eye} sx={{ width: 18 }} />,
          onClick: () => {},
        },
        {
          component: (
            <Box component="img" src={icons.edit} sx={{ width: 18 }} />
          ),
          onClick: () => {},
        },
        {
          component: <Box component="img" src={icons.bin} sx={{ width: 18 }} />,
          onClick: () => {},
        },
      ],
    },
  ];
  return (
    <Box
      sx={{
        margin: "19px",
        display: "flex",
        flexDirection: "column",
        gap: "31px",
      }}
    >
      <LogHeader />
      <UserNav
        showBack={false}
        routes={[
          "Logs",
          "Administrative Actions Logs",
          "User Role Assignment/Changes",
          "View",
        ]}
      />

      <Table
        onSelect={(v) => {}}
        onRowClick={(v) => {}}
        columns={column}
        data={[
          Object.values({
            adminId: "A1234567",
            userIdAffected: "U456890",
            roleAssigned: "Editor",
            timestamp: "2023-10-01 12:34:56",
            device: "192.168.1.1",
            status: "SUCCESSFUL",
          }),
        ]}
      />
    </Box>
  );
};
export default UserRole;
