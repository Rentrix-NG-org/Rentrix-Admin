import { Box, useTheme } from "@mui/material";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import { PermissionEnum } from "@src/modules/user/types/user.enums";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const GrantAccess = () => {
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();
  const { grantAccess, getAllPermissions } = UserService();
  const [selected, setSelected] = useState({
    user: "",
    property: "",
    logs: "",
  });
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPermissions() {
      const response = await getAllPermissions(params?.userId || "");
      if (response.success) {
        const converter = {
          [PermissionEnum.PROPERTY_ID]: "property-id",
          [PermissionEnum.RENTRIX_REP]: "supervisor-&-rentrix-rep",
          [PermissionEnum.AI_ML_LOGS]: "ai-and-machine-learning-logs",
          [PermissionEnum.ADMIN_ACTION_LOGS]: "administrative-action-logs",
          [PermissionEnum.USER_ACCOUNT_LOGS]: "user-account-management-logs",
          [PermissionEnum.COMMUNICATION_LOGS]:
            "communication-and-interaction-logs",
          [PermissionEnum.ESCROW_DISPUTE_LOGS]:
            "escrow-and-dispute-resolution-logs",
          [PermissionEnum.SYS_MAINTENANCE_LOGS]: "system-maintenance-logs",
          [PermissionEnum.PAYMENT_TRANSACTION_LOGS]:
            "payment-and-transaction-logs",
        };
        setPermissions(
          response.data
            .map((r) => {
              if (r.name === "landlord") {
                return ["landlord-&-tenant"];
              }
              if (r.name === "supervisor") {
                return "supervisors-&-rentrix-rep";
              }
              return converter[r.name] || r.name;
            })
            .flat(),
        );
      }
    }
    fetchPermissions();
  }, []);

  function handleSelect(v: string) {
    const result = v.toLowerCase().split(" ").join("-");
    if (!permissions.includes(result)) {
      setPermissions((curr) => [...curr, result]);
    } else {
      setPermissions((curr) => curr.filter((c) => c !== result));
    }
  }

  async function handleSubmit() {
    const converter = {
      "property-id": PermissionEnum.PROPERTY_ID,
      "supervisors-&-rentrix-rep": PermissionEnum.RENTRIX_REP,
      "ai-and-machine-learning-logs": PermissionEnum.AI_ML_LOGS,
      "administrative-action-logs": PermissionEnum.ADMIN_ACTION_LOGS,
      "user-account-management-logs": PermissionEnum.USER_ACCOUNT_LOGS,
      "communication-and-interaction-logs": PermissionEnum.COMMUNICATION_LOGS,
      "escrow-and-dispute-resolution-logs": PermissionEnum.ESCROW_DISPUTE_LOGS,
      "system-maintenance-logs": PermissionEnum.SYS_MAINTENANCE_LOGS,
      "payment-and-transaction-logs": PermissionEnum.PAYMENT_TRANSACTION_LOGS,
    };
    const formatted = permissions
      .map((p) => {
        if (p === "landlord-&-tenant") {
          return ["landlord", "tenant"];
        } else if (p === "supervisors-&-rentrix-rep") {
          return ["supervisor", "representative"];
        } else {
          return converter[p];
        }
      })
      .filter((p) => p)
      .flat();

    const response = await grantAccess(params?.userId, formatted);
    if (response.success) {
      navigate(-1);
    }
  }
  return (
    <Box
      sx={{
        px: "20px",
        py: "42.82px",
        display: "flex",
        flexDirection: "column",
        gap: "32.5px",
        width: 800,
      }}
    >
      <UserNav routes={["User Management", "User Details", "Grant Access"]} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <Input
          value={selected.user}
          selected={permissions.map((p) => p?.split(" ").join("-"))}
          optionsStyles={{
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            gap: 2,
          }}
          onSelect={(v) => {
            setSelected((c) => ({ ...c, user: v }));

            handleSelect(v);
          }}
          label="User Management"
          select
          multichoice
          options={["Landlord & Tenant", "Supervisors & Rentrix Rep"]}
        />
        <Input
          value={selected.property}
          selected={permissions.map((p) => p?.split(" ").join("-"))}
          optionsStyles={{
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            gap: 2,
          }}
          onSelect={(v) => {
            setSelected((c) => ({ ...c, property: v }));
            handleSelect(v);
          }}
          label="Property Management"
          select
          multichoice
          options={["Property ID"]}
        />

        <Input
          value={selected.logs}
          multiple
          selected={permissions.map((p) => p?.split(" ").join("-"))}
          optionsStyles={{
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            gap: 2,
          }}
          onSelect={(v) => {
            setSelected((c) => ({ ...c, logs: v }));

            handleSelect(v);
          }}
          label="Logs"
          select
          multichoice
          options={[
            "Communication and Interaction Logs",
            "Escrow and Dispute Resolution Logs",
            "AI and Machine Learning Logs",
            "Administrative Action Logs",
            "System Maintenance Logs",
            "User Account Management Logs",
            "Payment and Transaction Logs",
          ]}
        />
      </Box>

      <Box
        component="button"
        onClick={handleSubmit}
        sx={{
          width: "100%",
          height: 60,
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "100px",
          border: "none",
          color: "#FFFFFF",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Grant Access
      </Box>
    </Box>
  );
};

export default GrantAccess;
