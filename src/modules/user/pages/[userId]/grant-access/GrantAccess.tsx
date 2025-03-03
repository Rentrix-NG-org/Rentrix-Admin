import { Box, useTheme } from "@mui/material";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
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
  const [permissions, setPermissions] = useState<
    { name: string; checked: boolean }[]
  >([]);

  useEffect(() => {
    async function fetchPermissions() {
      const response = await getAllPermissions(params?.userId || "");
      if (response.success) {
        setPermissions(
          response.data.map((r) => {
            return { name: r.name, checked: true };
          }),
        );
      }
    }
    fetchPermissions();
  }, []);

  console.log(permissions, "is perm");

  function handleSelect(v: string) {
    const result = v.toLowerCase().split(" ").join("-");
    const permissionExists = permissions.some((p) => p.name === result);

    if (!permissionExists) {
      setPermissions((curr) => [...curr, { name: result, checked: true }]);
    } else {
      setPermissions((curr) =>
        curr.map((c) =>
          c.name === result ? { ...c, checked: !c.checked } : c,
        ),
      );
    }
  }

  async function handleSubmit() {
    const response = await grantAccess(params?.userId, permissions);
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
          selected={permissions.map(
            (p) =>
              p.checked &&
              (p.name === "representative"
                ? "rentrix-rep"
                : p.name?.split(" ").join("-")),
          )}
          optionsStyles={{
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            gap: 2,
          }}
          onSelect={(v) => {
            setSelected((c) => ({ ...c, user: v }));
            handleSelect(v === "Rentrix Rep" ? "representative" : v);
          }}
          label="User Management"
          select
          multichoice
          options={[
            "Landlord",
            "Tenant",
            "Supervisor",
            "Rentrix Rep",
            "User Creation",
          ]}
        />
        <Input
          value={selected.property}
          selected={permissions.map((p) => p.name?.split(" ").join("-"))}
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
          options={["Property"]}
        />

        <Input
          value={selected.logs}
          multiple
          selected={permissions.map((p) => p?.name?.split(" ").join("-"))}
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
