import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import { LogService } from "@src/modules/logs/services/log.service";
import { Log, PasswordResetStatus } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import moment from "moment";
import { useEffect, useState } from "react";

const PasswordRequests = () => {
  const theme = useTheme();
  const [logs, setLogs] = useState<string[][]>([]);
  const [statusFilter, setStatusFilter] = useState<PasswordResetStatus | "all">("all");
  const { getPasswordRequestsLogs } = LogService();

  useEffect(() => {
    async function fetchLogs() {
      const response = await getPasswordRequestsLogs({
        status: statusFilter === "all" ? undefined : statusFilter
      });
      if (response.success) {
        const formatted = (response.data as Log[]).map((user) => {
          return Object.values({
            userId: user.userId,
            username: user.username,
            timestamp: moment(user.createdAt).format('MMM D, YYYY, h:mm A'),
            deviceType: user.deviceType,
            status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
            email: user.email,
            processedBy: user?.processedBy?.name
          });
        });

        setLogs(formatted);
      }
    }
    fetchLogs();
  }, [statusFilter]);

  const columns: Column[] = [
    {
      header: "ADMIN ID",
      label: "userId",
      type: "text",
    },
    {
      header: "USERNAME",
      label: "username",
      type: "text",
    },
    {
      header: "TIMESTAMP",
      label: "timestamp",
      type: "text",
    },
    {
      header: "DEVICE TYPE",
      label: "deviceType",
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
      header: "EMAIL",
      label: "email",
      type: "text",
    },
    {
      header: "PROCESSED BY",
      label: "processedBy",
      type: "text",
    },
    {
      header: "ACTIONS",
      label: "actions",
      type: "action",
      component: [
        {
          component: <Box component="img" src={icons.eye} sx={{ width: 18 }} />,
          onClick: () => { },
        },
        {
          component: (
            <Box component="img" src={icons.edit} sx={{ width: 18 }} />
          ),
          onClick: () => { },
        },
        {
          component: <Box component="img" src={icons.bin} sx={{ width: 18 }} />,
          onClick: () => { },
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
        showBack
        routes={[
          "Logs",
          "Administrative Actions Logs",
          "Policy/Terms Updates",
          "View",
        ]}
      />

      {/* Status Filter Dropdown */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '-20px',
        marginRight: '10px'
      }}>
        <FormControl sx={{ minWidth: 180, backgroundColor: theme.palette.background.paper }} size="small">
          <InputLabel sx={{
            color: theme.palette.text.secondary,
            '&.Mui-focused': {
              color: theme.palette.text.secondary
            }
          }}>
            Filter by Status
          </InputLabel>
          <Select
            value={statusFilter}
            label="Filter by Status"
            onChange={(e) => setStatusFilter(e.target.value as PasswordResetStatus | "all")}
            sx={{
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value={PasswordResetStatus.REQUESTED}>Requested</MenuItem>
            <MenuItem value={PasswordResetStatus.COMPLETED}>Completed</MenuItem>
            <MenuItem value={PasswordResetStatus.FAILED}>Failed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Table
        onSelect={() => { }}
        onRowClick={() => { }}
        columns={columns}
        data={logs}
      />
    </Box>
  );
};
export default PasswordRequests;
